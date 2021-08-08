// Mise a jour du nombre d'articles dans le badge du panier
const updateBadge = () => {
  if (localStorage.getItem('products')) {
    const products = JSON.parse(localStorage.getItem('products'))
    document.getElementById("badge").innerHTML = `${products.length}<span class="visually-hidden">Nouveaux produits</span>`
  }
}

// Supprime un produit de localStorage
const deleteProduct = (itemId, itemLens) => {
  let products = [];
  if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'))
    if (products.length == 1) {
        localStorage.clear()
    } else {
      const index = products.findIndex(product => product.id == itemId && product.lens == itemLens)
      products.splice(index, 1)
      localStorage.setItem('products', JSON.stringify(products))
    }
    alert('Le produit a été supprimé de votre panier')
    window.location.reload()
  }
}

// Supprime tous les produits du localStorage
const deleteProducts = () => {
  localStorage.clear()
  alert('Tous les produits ont été supprimés de votre panier')
  window.location.reload()
}

updateBadge()