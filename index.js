const productType = 'cameras'
const APIURL = `http://localhost:3000/api/${productType}`

// Création du HTML pour une carte de produit
const formatProduct = item => `<a href="produit.html?id=${item._id}" class="card">
  <img src="${item.imageUrl}" class="full" alt="${item.name}">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="price card-text">${formatPrice(item.price)}</p>
  </div>
</a>`

// Ajout de chaque produit dans la page HTML
const insertProducts = async () => {
	// Recherche de tous les produits dans la base de données
	const products = await getProducts()
	// Boucle sur chaque produit trouvé
	for (let product of products) {
		// Recherche de l'id "app" puis ajout du produit avec formatProduct
		document.getElementById("app").innerHTML +=  formatProduct(product)
	}
}

insertProducts()