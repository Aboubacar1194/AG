let donneesClients;

async function chargerDonnees() {
  const spinner = document.getElementById('spinner');
  spinner.innerHTML = `
        <span></span>
        Chargement ...`
  // pour empecher que le spinner ne s'affiche dans tous les cas, là il ne s'affichera 
  // qu'au bout de 50s si absence de données ou lattence
  setTimeout(() => {
    spinner.style.visibility = 'visible'; // Par défaut on affiche le spinner
  }, 500);

  const serviceUrl = "https://afristore-api.vercel.app/api/orders/admin";
  try {
    // le code suivant est là juste pour pouvoir tester le spinner et le timeout
    // const response = await Promise.race([
    //   new Promise(resolve => setTimeout(() => fetch(serviceUrl).then(resolve), 3000)),
    //   new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 4000)) // 6000 ms = 6 secondes
    // ]);
    
    // Promise.race va renvoyer une promise qui sera celle exécutée en première parmis celles contenues dans son tableau
    // Donc là soit le fetch qui va arriver à bien récuperer les données, soit la seconde qui lèvera une exception de timeout pour lattence ou autre.
    const response = await Promise.race([
        fetch(serviceUrl),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 30000)) // 30000 ms = 30 secondes
      ]);

    const data = await response.json();
    donneesCommandes = data.orders;

    // Masquer le spinner dès que les données sont reçues
    spinner.style.visibility = 'hidden';

    // Enregistrez les données dans la session storage pour les récupérer dans la page suivante.
    sessionStorage.setItem('donneesCommandes', JSON.stringify(donneesCommandes));
    // Redirigez vers la nouvelle suivante.
    window.location.href = 'list-clients.html';
  } catch (error) {
    if (error.message === 'Timeout') {
      console.error('Le service n\'a pas répondu dans le délai imparti (6 secondes).');
      document.getElementById("spinner").innerHTML = ` 
      <img src="./asset/erreurReseau.png" alt="Problème reseau">
      Problème de reseaux
      ` ;
    } else {
      setTimeout(() => {
        document.getElementById("spinner").innerHTML = ` 
      <img src="./asset/erreurServer.png" alt="Problème reseau">
      Erreur lors de la récupération des données
      ` ;
      }, 5000);
      console.error('Erreur lors de la récupération des données :', error);
    }
  } 
}


const infoArticleCommande = {}

function effectuerStatistiques() {
  const donneesCommandes = sessionStorage.getItem("donneesCommandes");
  if (donneesCommandes === "undefined") {
    sessionStorage.setItem('infoArticleCommande', JSON.stringify(donneesCommandes))
    window.location.href = 'resume-commandes.html';
  }else{
    const donneesCommandesJSON = JSON.parse(donneesCommandes);

    if (!donneesCommandesJSON) {
      chargerDonnees();
      return;
    }
    var infoArticleCommande = calculInfoArticleCommande(donneesCommandesJSON)
  
    sessionStorage.setItem('infoArticleCommande', JSON.stringify(infoArticleCommande));

    // Redirigez vers la page de statistiques.
    window.location.href = 'resume-commandes.html';
  }
}

function calculInfoArticleCommande(donneesCommandesJSON) {
  // Initialisez une liste d'objets pour stocker les informations des articles.
  let infoArticle = [];

  donneesCommandesJSON.forEach(commande => {
    commande.products.forEach(produit => {
      // Recherchez l'article dans la liste existante.
      const produitExist = infoArticle.find(produitCommande => produitCommande.article === produit.name);

      if (produitExist) {
        // Si l'article existe déjà, mettez à jour les informations.
        produitExist.quantiteTotaleCommandee += produit.quantity;
        produitExist.montantTotalVente += produit.price * produit.quantity;
      } else {
        // Sinon, ajoutez un nouvel objet d'informations d'article à la liste.
        infoArticle.push({
          article: produit.name,
          prixUnitaire: produit.price,
          quantiteTotaleCommandee: produit.quantity,
          montantTotalVente: produit.price * produit.quantity
        });
      }
    });
  });

  return infoArticle;
}
