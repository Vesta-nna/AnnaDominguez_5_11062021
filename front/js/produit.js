// Recherche la valeur de la lentille sélectionnée
const getLensValue = () => document.getElementById('lens').value

// Ajoute le produit séléctionné au localStorage
const addProduct = id => {
  let products = []
  // Vérification que "products" existe dans localStorage
  if (localStorage.getItem('products')) {
    // Si products existe, on ajoute les anciens produits à l'array products
    products = JSON.parse(localStorage.getItem('products'))
  }
  // Ajoute le produit sous forme d'objet {id, lens} à l'array products
  products.push({id, lens: getLensValue()})
  // Création d'item "products" dans localStorage avec les anciens et le nouveau produit mis sous format JSON
  localStorage.setItem('products', JSON.stringify(products))
  updateBadge()
  // Alerte l'utilisateur que le produit a été ajouté au panier
  alert('Produit ajouté au panier!')
}

// Ajout de la carte du produit dans la page HTML
const insertProduct = async () => {
  // Récupération du produit avec l'id dans la base de donnée
  const content = await getProduct(location.search.split('=')[1])
  // Recherche de l'id "product" puis insertion du HTML avec setProduct du produit trouvé
	document.getElementById("product").innerHTML = formatProduct(content)
}

insertProduct()