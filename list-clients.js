document.addEventListener('DOMContentLoaded', function () {
  const cartesContainer = document.getElementById('cartes-container');

  // Récupérez les données depuis la session storage.
  const donneesJSON = sessionStorage.getItem('donneesCommandes');

  if (donneesJSON === "undefined") {
    const p = afficherMessageErreur();
    cartesContainer.appendChild(p);
  } else {
    const donneesCommandes = JSON.parse(donneesJSON);

    if (donneesCommandes.length === 0) {
      const p = afficherMessageErreur();
      cartesContainer.appendChild(p);
    } else {
      // Générez les cartes des clients.
      donneesCommandes.forEach((commande, index) => {
        const carte = genererCarteClient(commande, index);
        cartesContainer.appendChild(carte);

        carte.addEventListener('click', function () {
          afficherDetailCommande(commande.products);
          // Sauvegarde la position de défilement dans sessionStorage
          sessionStorage.setItem('positionScroll', cartesContainer.scrollTop);
        });
      });

      // Appeler la fonction pour chaque carte générée dynamiquement
      donneesCommandes.forEach((commande, index) => {
        const carte = cartesContainer.children[index];
        initDraggableCard(carte);
      });
    }
  }

  // Restaure la position de défilement après un rechargement de la page
  const positionScroll = sessionStorage.getItem('positionScroll');
  if (positionScroll !== null) {
    cartesContainer.scrollTop = parseInt(positionScroll, 10);
  }
});

// Fonction qui initialise le glisser-déposer pour une carte donnée
function initDraggableCard(carte) {
  let isDragging = false;
  let initialX = 0;
  let currentX = 0;

  const livraisonBtnContainer = carte.querySelector('.livraison-btn-container');
  const livraisonBtnWidth = carte.querySelector('.livraison-btn').offsetWidth;

  carte.addEventListener('touchstart', handleDragStart, false);
  carte.addEventListener('touchmove', handleDragMove, false);

  function handleDragStart(event) {
    isDragging = true;
    initialX = event.touches[0].clientX - currentX;
  }

  function handleDragMove(event) {
    if (!isDragging) return;
    currentX = event.touches[0].clientX - initialX;

    // Limite le déplacement à la largeur du bouton "Livré" à partir de la droite
    currentX = Math.min(0, Math.max(-livraisonBtnWidth, currentX));

    carte.style.transform = `translateX(${currentX}px)`;

    // Affiche progressivement le bouton "Livré" à mesure que la carte est balayée
    const progress = currentX / livraisonBtnWidth;
    livraisonBtnContainer.style.transform = `translateX(${progress}px)`;
  }
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
        <small>Téléphone :<a href="tel:${commande.user.phone}">${commande.user.phone}</a></small></br>
        <small>Adresse : 
          <a href="https://www.google.com/maps/search/?api=1&query=${commande.deliveryAddress.number}+Rue+de+${commande.deliveryAddress.street},${commande.deliveryAddress.zipCode},France">
            ${commande.deliveryAddress.number} ${commande.deliveryAddress.street} ${commande.deliveryAddress.zipCode}
          </a>
        </small>
      </address>
    </div>
    <div class="livraison-btn-container">
        <button class="livraison-btn" onclick="confirmerLivraison(event)">Livré</button>
    </div>
  ` 
  carte.innerHTML = content;
  return carte;
}

function afficherMessageErreur(){
  const paragraphe = document.createElement('p');

  const content = `
      <img src="./asset/imoji.png" alt="Imoji qui pleure">
      <span>vous n'avez aucune commande</span>
  `
  paragraphe.innerHTML = content
  return paragraphe;
}

function afficherDetailCommande(products) {
  // Enregistrez les données des produits de la commande dans le session storage.
  sessionStorage.setItem('commande-products', JSON.stringify(products));

  // Redirigez vers la page de détail de la commande.
  window.location.href = 'commande-detail.html';
}

function confirmerLivraison(event){
  event.stopPropagation();

  // récuperer 
  const carte = event.target.parentNode.previousElementSibling;
  const conteneur = event.target.parentNode.parentNode;

  carte.style.backgroundColor = "#936639";
  conteneur.style.transform = 'translateX(0)';
  conteneur.style.pointerEvents = 'none';
}

