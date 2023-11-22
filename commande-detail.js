document.addEventListener('DOMContentLoaded', function () {
    // Récupérez les données des produits associés à la commande sélectionné depuis la session storage.
    const products = sessionStorage.getItem('commande-products');
    const productsJSON = JSON.parse(products);

    // Affichez les détails de la commande.
    const detailContainer = document.getElementById('detail-container');

    productsJSON.forEach(product => {
      const detailCarte = genererDetailProduit(product);
      detailContainer.appendChild(detailCarte);
    });
  
  });
  
  function genererDetailProduit(product) {
    const carte = document.createElement('div');
    carte.classList.add('detail-commande');
  
    const nom = document.createElement('small');
    nom.textContent = "Article : " + product.name;
    nom.innerHTML += '</br>'

    const quantite = document.createElement('small');
    quantite.textContent = "Quantité : " + product.quantity;
    quantite.innerHTML += '</br>'

    const prix = document.createElement('small');
    prix.textContent = "Prix unitaire : " + product.price + " €";
    prix.innerHTML += '</br>'

    const montantTotal = document.createElement('small');
    montantTotal.textContent = "Montant total : " + product.price * product.quantity  + " €";
    
    carte.appendChild(nom);
    carte.appendChild(quantite);
    carte.appendChild(prix);
    carte.appendChild(montantTotal);
  
    return carte;
  }
  