document.addEventListener('DOMContentLoaded', function () {
  const resumeCommandesArticles = document.getElementById('resume-container');

  // Récupérez les statistiques depuis la session storage.
  const infoArticleCommande = sessionStorage.getItem('infoArticleCommande');
  const infoArticleCommandeJSON = JSON.parse(infoArticleCommande);

  if (infoArticleCommandeJSON === "undefined") {
    const p = afficherMessage();
    resumeCommandesArticles.appendChild(p)
  }else{
    
    if (infoArticleCommandeJSON.length === 0) {
      const p = afficherMessage();
      resumeCommandesArticles.appendChild(p)
    }else{
      infoArticleCommandeJSON.forEach(articleCommande => {
        const resumeCarte = genererResumeCarte(articleCommande);
        resumeCommandesArticles.appendChild(resumeCarte);
      });
    }
  }
  
});

function afficherMessage(){
  const commandesVides = document.createElement('p');

  const content = `
      <img src="./asset/imoji.png" alt="Imoji qui pleure">
      <span>vous n'avez aucune commande</span>
  `
  commandesVides.innerHTML = content
  return commandesVides;
}

function genererResumeCarte(articleCommande) {
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
  