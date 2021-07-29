const productType = 'cameras'
const APIURL = `http://localhost:3000/api/${productType}`
let total = 0

// Supprime un produit de localStorage
const deleteProduct = (itemId, itemLens) => {
  let products = [];
  if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'))
  }
  const index = products.findIndex(product => product.id == itemId && product.lens == itemLens)
  products.splice(index, 1)
  localStorage.setItem('products', JSON.stringify(products))
  alert('Le produit a été supprimé de votre panier')
  window.location.reload()
}

const formatProduct = (product, lenses, index, suppElem = false) => `<tr>
  <th scope="row">${index}</th>
  <td><img src="${product.imageUrl}" alt="${product.name}"></td>
  <td>${product.name}</td>
  <td>${lenses.map(item => formatLensDelete(item)).join('')}</td>
  <td>${formatPrice(product.price)}</td>
  <td>x${lenses.length}</td>
  </td>`

const formatBasket = async () => {
  let products = []
  if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'))
    console.log(products)
    const uniqueProducts = new Set([...products.map(item => item.id)])
    let index = 1
    for (let product of uniqueProducts) {
      const data = await getProduct(product)
      const lenses = products.filter(item => item.id == product)
      document.getElementById("table-body").innerHTML += formatProduct(data, lenses, index, true)
      document.getElementById("total-price").innerHTML = `${formatPrice(total += data.price * lenses.length)}`
      index += 1
    }
  }
}

const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

const order = async (e) => {
  e.preventDefault()
  const contact = {
    firstName: document.getElementById('validationFirstname').value,
    lastName: document.getElementById('validationLastname').value,
    email: document.getElementById('validationEmail').value,
    city: document.getElementById('validationCity').value,
    address: document.getElementById('validationAddress').value,
  }

  const products = JSON.parse(localStorage.getItem('products')).map(product => product.id)

  const content = await postOrder({ contact, products })

  localStorage.setItem('orderId', JSON.stringify(content.orderId))
  document.location.href = "commande.html"
}

formatBasket()

document.getElementById("form").addEventListener("submit", order);