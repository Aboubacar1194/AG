let donneesClients;

async function chargerDonnees() {
  const serviceUrl = "./asset/donneesCommandes.json"
  fetch(serviceUrl)
    .then(response => response.json())
    .then(data => {
      donneesCommandes = data.orders;

      // Enregistrez les données dans la session storage pour les récupérer dans la nouvelle page.
      sessionStorage.setItem('donneesCommandes', JSON.stringify(donneesCommandes));

      // Redirigez vers la nouvelle page.
      window.location.href = 'list-clients.html';
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données depuis le fichier JSON:', error);
      alert('Erreur lors de la récupération des données. Veuillez réessayer.');
    });
}

const infoArticleCommande = {}

function effectuerStatistiques() {
  const donneesCommandes = sessionStorage.getItem("donneesCommandes");
  const donneesCommandesJSON = JSON.parse(donneesCommandes);

  if (!donneesCommandesJSON) {
    chargerDonnees();
    return;
  }

  // Exemple de statistiques simples.
  const nombreDeCommandes = donneesCommandesJSON.length;

  var infoArticleCommande = calculInfoArticleCommande(donneesCommandesJSON)
  
  sessionStorage.setItem('infoArticleCommande', JSON.stringify(infoArticleCommande));

  // Redirigez vers la page de statistiques.
  window.location.href = 'resume-commandes.html';
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
