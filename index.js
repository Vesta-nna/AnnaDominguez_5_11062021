// Ajout de chaque produit dans la page HTML
const insertProducts = async () => {
	// Recherche de tous les produits dans la base de données
	const products = await getProducts()
	// Boucle sur chaque produit trouvé
	for (let product of products) {
		// Recherche de l'id "app" puis ajout du produit avec formatProduct
		document.getElementById("app").innerHTML +=  formatIndexProduct(product)
	}
}

insertProducts()