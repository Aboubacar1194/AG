
document.addEventListener('DOMContentLoaded', function () {
  const cartesContainer = document.getElementById('cartes-container');

    // Récupérez les données depuis la session storage.
    const donneesJSON = sessionStorage.getItem('donneesCommandes');
    if (donneesJSON === "undefined") {
      const p = afficherMessageErreur();
      cartesContainer.appendChild(p)
    }else{
      const donneesCommandes = JSON.parse(donneesJSON);
    
      if (donneesCommandes.length === 0) {
        const p = afficherMessageErreur();
        cartesContainer.appendChild(p)
      }else{
        // Générez les cartes des clients.
        donneesCommandes.forEach((commande, index) => {
          const carte = genererCarteClient(commande, index);
          cartesContainer.appendChild(carte);

          // Ajoutez un gestionnaire d'événements au clic sur chaque carte.
          carte.addEventListener('click', function () {
              afficherDetailCommande(commande.products);
          });
        });
      } 
    }
    
  });

function afficherMessageErreur(){
  const paragraphe = document.createElement('p');

  const content = `
      <img src="./asset/imoji.png" alt="Imoji qui pleure">
      <span>vous n'avez aucune commande</span>
  `
  paragraphe.innerHTML = content
  return paragraphe;
}

function genererCarteClient(commande, index) {
  const carte = document.createElement('div');
  carte.classList.add('carte-client');

  const content = `
    <span> ${index + 1} </span>
    <div class="client-infos">
      <h3>${commande.user.firstName + " " + commande.user.lastName}</h3>
      <small>Montant de la commande : ${commande.totalAmount} €</small></br>
      <address>
      <small>Téléphone :${commande.user.phone}</small></br>
      <small>Adresse : ${commande.deliveryAddress.number} ${commande.deliveryAddress.street} ${commande.deliveryAddress.zipCode} </small>
      </address>
    </div>
  ` 
  carte.innerHTML = content;
  return carte;
}

function afficherDetailCommande(products) {
  // Enregistrez les données des produits de la commande dans le session storage.
  sessionStorage.setItem('commande-products', JSON.stringify(products));

  // Redirigez vers la page de détail de la commande.
  window.location.href = 'commande-detail.html';
}

  
  