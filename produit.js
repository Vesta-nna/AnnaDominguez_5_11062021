const productType = 'cameras'
const APIURL = `http://localhost:3000/api/${productType}`

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
  // Alerte l'utilisateur que le produit a été ajouté au panier
  alert('Produit ajouté au panier!')
};

// Mise en page HTML du produit
const setProduct = item => `<article class="card">
    <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.description}</p>
      <p class="card-text">Lentille:
      <select id="lens" class="custom-select custom-select-sm">
      ${item.lenses.map(lens => `<option value="${lens}" text="${lens}">${lens}</option>`).join('')}
      </select>
      </p>
      <p class="card-text">Prix: ${formatPrice(item.price)}</p>
      <button onclick="addProduct('${item._id}')" class="btn btn-primary">Ajouter au panier</a>
    </div>
  <article>`

// Ajout de la carte du produit dans la page HTML
const insertProduct = async () => {
  // Récupération du produit avec l'id dans la base de donnée
  const content = await getProduct(location.search.split('=')[1])
  // Recherche de l'id "product" puis insertion du HTML avec setProduct du produit trouvé
	document.getElementById("product").innerHTML = setProduct(content)
}

insertProduct()