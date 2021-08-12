// Fonction pour préparer la mise en page de la validation de commande
const formatOrder = async () => {
  if (localStorage.getItem('orderId')) {
    const orderId = JSON.parse(localStorage.getItem('orderId'))
    document.getElementById('orderId').innerHTML = orderId.split('-')[0]
  }
}

formatOrder()
getBasket(false)

// Vide les données du localStorage
localStorage.clear()