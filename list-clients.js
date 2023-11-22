document.addEventListener('DOMContentLoaded', function () {
    // Récupérez les données depuis la session storage.
    const donneesJSON = sessionStorage.getItem('donneesCommandes');
    const donneesCommandes = JSON.parse(donneesJSON);
  
    // Générez les cartes des clients.
    const cartesContainer = document.getElementById('cartes-container');
    donneesCommandes.forEach((commande, index) => {
      const carte = genererCarteClient(commande, index);
      cartesContainer.appendChild(carte);

      // Ajoutez un gestionnaire d'événements au clic sur chaque carte.
    carte.addEventListener('click', function () {
        afficherDetailCommande(commande.products);
      });
    });
  });
  
  function genererCarteClient(commande, index) {
    const carte = document.createElement('div');
    carte.classList.add('carte-client');
    
    const rang = document.createElement('span');
    rang.textContent = index + 1;

    const clientInfos = document.createElement('div');
    clientInfos.classList.add("client-infos");

    const montantCommande = document.createElement('small');
    montantCommande.textContent = "Montant de la commande : " + commande.totalAmount + " €";
    montantCommande.innerHTML += '</br>'
  
    const nom = document.createElement('h3');
    nom.textContent = commande.user.firstName + " " + commande.user.lastName;

    const tel = document.createElement('small');
    tel.textContent = "Téléphone : " + commande.user.phone ;
    tel.innerHTML += '</br>'

    const adress = document.createElement('small');
    adress.textContent = "Adresse : " + commande.deliveryAddress;

    clientInfos.appendChild(nom);
    clientInfos.appendChild(montantCommande);
    clientInfos.appendChild(tel);
    clientInfos.appendChild(adress);
    
    carte.appendChild(rang);
    carte.appendChild(clientInfos);
  
    return carte;
  }

  function afficherDetailCommande(products) {
    // Enregistrez les données des produits de la commande dans le session storage.
    sessionStorage.setItem('commande-products', JSON.stringify(products));
  
    // Redirigez vers la page de détail de la commande.
    window.location.href = 'commande-detail.html';
  }

  
  