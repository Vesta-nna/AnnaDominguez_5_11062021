// Vérification de formulaire et envoie au serveur
const order = async e => {
  e.preventDefault()
  // Variable de stockage de vérification si le formulaire n'a pas d'erreur
  let submitOk = true
  // Objet à envoyer au serveur
  const contact = {
    firstName: document.getElementById('validationFirstname').value,
    lastName: document.getElementById('validationLastname').value,
    email: document.getElementById('validationEmail').value,
    city: document.getElementById('validationCity').value,
    address: document.getElementById('validationAddress').value,
  }
  // Récupération des ids des produits stockés dans le localStorage
  const products = JSON.parse(localStorage.getItem('products')).map(product => product.id)
  const form = document.getElementById("form")
  // Changement du boolean en false s'il y a une erreur dans le formulaire
  if (!form.checkValidity()) {
    submitOk = false
  }
  form.classList.add('was-validated')

  // S'il n'y a pas d'erreur dans le formulaire
  if (submitOk) {
    // Envoie des données vers le back
    const content = await postOrder({ contact, products })
    // Récupération de l'orderId dans le localStorage
    localStorage.setItem('orderId', JSON.stringify(content.orderId))
    // Envoi vers la page html de validation de commande
    document.location.href = "commande.html"
  }
}

// Mise en page s'il y a des produits dans le panier
if (localStorage.getItem('products')) {
  // Mise en page du panier et du formulaire
  document.getElementById("app").innerHTML = formatBasket()
  // Remplissage du panier
  getBasket(true)
  // Création de l'envoie du formulaire et des produits
  const form = document.getElementById("form")x
  form.addEventListener("submit", order)
// Mise en page s'il n'y a pas de produit dans le panier
} else {
  document.getElementById("app").innerHTML = `<h2 class="emptyBasket">Votre panier Orinoco est vide.</h2>`
}