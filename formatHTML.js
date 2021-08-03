const formatPrice = price => `€${price / 100}.00`

// Création du HTML pour une carte de produit sur la page d'accueil
const formatIndexProduct = item => `<a href="produit.html?id=${item._id}" class="card">
  <img src="${item.imageUrl}" class="full" alt="${item.name}">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="price card-text">${formatPrice(item.price)}</p>
  </div>
</a>`

// Création du HTML pour une ligne de tableau de produit
const formatBasketProduct = (product, lenses, index) => `<tr>
  <th scope="row" class="align-middle">${index}</th>
  <td class="align-middle"><img src="${product.imageUrl}" alt="${product.name}"></td>
  <td class="align-middle">${product.name}</td>
  <td>${lenses.map(item => formatLens(item, true)).join('')}</td>
  <td class="align-middle">${formatPrice(product.price)}</td>
  <td class="align-middle">x${lenses.length}</td>
  </tr>`

// Mise en page HTML du produit sur la page du produit
const formatProduct = item => `<article class="card">
    <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.description}</p>
      <p class="card-text">Lentille:
      <select id="lens" class="form-select custom-select custom-select-sm">
      ${item.lenses.map(lens => `<option value="${lens}" text="${lens}">${lens}</option>`).join('')}
      </select>
      </p>
      <p class="card-text">Prix: ${formatPrice(item.price)}</p>
      <button onclick="addProduct('${item._id}')" class="btn btn-primary">Ajouter au panier</a>
    </div>
  <article>`

// Mise en page HTML du choix de lentille dans le panier et la commande
const formatLens = (item, supp = false) => `<p class="lenses card-text">${item.lens}
    ${supp ? `<button type="button" class="btn btn-danger" onclick="deleteProduct('${item.id}', '${item.lens}')">
      <i class="fas fa-trash-alt"></i>
    </button>` : ''}
  </p>`

// Mise en page du HTML pour la page de panier avec le formulaire
const formatBasket = () => `<section id="products">
        <div class="table-responsive">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Nom</th>
                <th scope="col">Lentilles</th>
                <th scope="col">Prix</th>
                <th scope="col">Quantité</th>
              </tr>
            </thead>
            <tbody id="table-body">
            </tbody>
            <tfoot>
              <th>Total</tr>
              <tr id="total-price"></tr>
            </tfoot>
          </table>
        </div>
        <button onclick="deleteProducts()" class="btn btn-dark" >Vider le panier</button>
      </section>
      <section>
      <div class="form bg-light font-weight-bold">
        <h5 class="px-4 py-3 text-white bg-dark"">Commander</h5>
        <form id="form" class=" px-4 py-3 row g-3 needs-validation" action="commande.html" novalidate>
          <div class="col-md-3">
            <label for="validationFirstname" class="form-label">Prénom</label>
            <input type="text" class="form-control" id="validationFirstname" placeholder="John" pattern="^[a-zA-ZéèîïÉÈÎÏ][A-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$" required>
            <div class="valid-feedback">Ok!</div>
            <div class="invalid-feedback">Prénom invalide</div>
          </div>
          <div class="col-md-3">
            <label for="validationLastname" class="form-label">Nom</label>
            <input type="text" class="form-control" id="validationLastname" placeholder="Smith" pattern="^[a-zA-ZéèîïÉÈÎÏ][A-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$" required>
            <div class="valid-feedback">Ok!</div>
            <div class="invalid-feedback">Nom invalide</div>
          </div>
          <div class="col-md-6">
            <label for="validationEmail" class="form-label">Email address</label>
            <input type="text" class="form-control" id="validationEmail" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" placeholder="name@example.com" required>
            <div class="valid-feedback">Ok!</div>
            <div class="invalid-feedback">Email invalide</div>
          </div>
          <div class="col-md-6">
            <label for="validationAddress" class="form-label">Adresse</label>
            <input type="text" class="form-control" id="validationAddress" placeholder="55 Rue du Faubourg Saint-Honoré" pattern="[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*" required>
            <div class="valid-feedback">Ok!</div>
            <div class="invalid-feedback">Adresse invalide</div>
          </div>
          <div class="col-md-3">
            <label for="validationCity" class="form-label">Ville</label>
            <input type="text" class="form-control" id="validationCity" placeholder="Paris" pattern="^[a-zA-ZéèîïÉÈÎÏ][A-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$" required>
            <div class="valid-feedback">Ok!</div>
            <div class="invalid-feedback">Ville invalide</div>
          </div>
          <div class="col-12">
            <button id="validate" class="btn btn-dark" type="submit">Valider la commande</button>
          </div>
        </form>
      </div>
    </section>`

// Récupération des éléments du panier pour la page de panier ou la page de commande
const getBasket = async (deleteProduct = false) => {
  if (localStorage.getItem('products')) {
    let products = []
    let total = 0
    products = JSON.parse(localStorage.getItem('products'))
    const uniqueProducts = new Set([...products.map(item => item.id)])
    let index = 1
    for (let product of uniqueProducts) {
      const data = await getProduct(product)
      const lenses = products.filter(item => item.id == product)
      document.getElementById("table-body").innerHTML += formatBasketProduct(data, lenses, index, deleteProduct)
      document.getElementById("total-price").innerHTML = `${formatPrice(total += data.price * lenses.length)}`
      index += 1
    }
  }
  else {
    document.getElementById("table-body").innerHTML += `<tr><th scope="row">Aucun produit</th></tr>`
  }
}