document.addEventListener('DOMContentLoaded', function () {
    // Récupérez les statistiques depuis la session storage.
    const infoArticleCommande = sessionStorage.getItem('infoArticleCommande');
    const infoArticleCommandeJSON = JSON.parse(infoArticleCommande);
  
    // Affichez les statistiques.
    const statistiquesContainer = document.getElementById('resume-container');

    if (infoArticleCommandeJSON.length === 0) {
      const p = afficherMessage();
      statistiquesContainer.appendChild(p)
    }else{
      infoArticleCommandeJSON.forEach(articleCommande => {
        const statistiquesCarte = genererStatistiquesCarte(articleCommande);
        statistiquesContainer.appendChild(statistiquesCarte);
      });
    }
  });

  function afficherMessage(){
    const paragraphe = document.createElement('p');

    const content = `
        <img src="./asset/imoji.png" alt="Imoji qui pleure">
        <span>vous n'avez aucune commande</span>
    `
    paragraphe.innerHTML = content
    return paragraphe;
  }
  
  function genererStatistiquesCarte(articleCommande) {
    const carte = document.createElement('div');
    carte.classList.add('carte-statistiques');

    const content = `
      <small>Article : ${articleCommande.article}</small><br>
      <small>Prix unitaire : ${articleCommande.prixUnitaire} €</small><br>
      <small>Quantité achetée : ${articleCommande.quantiteTotaleCommandee}</small><br>
      <small>Montant total des ventes : ${articleCommande.montantTotalVente} €</small><br>
    `;

    carte.innerHTML = content;
    return carte;
  }
  