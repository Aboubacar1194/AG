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

    const imoji = document.createElement('img');
    imoji.src   = "./asset/imoji.png";
    imoji.alt   = "Imoji qui pleure";

    const span = document.createElement("span");
    span.innerText = "vous n'avez aucune commande"

    paragraphe.appendChild(imoji);
    paragraphe.appendChild(span)
    
    return paragraphe;
  }
  
  function genererStatistiquesCarte(articleCommande) {
    const carte = document.createElement('div');
    carte.classList.add('carte-statistiques');
  
    const nom = document.createElement('small');
    nom.textContent = `Article : ${articleCommande.article}`;
    nom.innerHTML += '</br>'

    const prix = document.createElement('small');
    prix.textContent = `Prix unitaire : ${articleCommande.prixUnitaire}` + " €";
    prix.innerHTML += '</br>'

    const quantite = document.createElement('small');
    quantite.textContent = `Quantité achetée : ${articleCommande.quantiteTotaleCommandee}`;
    quantite.innerHTML += '</br>'

    const montantVente = document.createElement('small');
    montantVente.textContent = `Montant total des ventes : ${articleCommande.montantTotalVente}` + " €";
    montantVente.innerHTML += '</br>'

    carte.appendChild(nom);
    carte.appendChild(prix);
    carte.appendChild(quantite);
    carte.appendChild(montantVente);
  
    return carte;
  }
  