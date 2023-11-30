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

    const content = `
      <small>Article :  ${product.name}</small><br>
      <small>Quantité : ${product.quantity}</small><br>
      <small>Prix unitaire : ${product.price} €</small><br>
      <small>Montant total : ${product.price * product.quantity} €</small><br>
    `;

    carte.innerHTML = content
    return carte;
  }

  function confirmerLivraison(event){
    event.stopPropagation();

    // To do : faire appel d'un endpoint pour modifier l'etat du boolean delivered

    window.location.href = "./list-clients.html"
  }
  