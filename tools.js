const formatPrice = price => `€${price / 100}.00`

const formatLensDelete = item => `<p class="lenses card-text">${item.lens}
    <button type="button" class="btn btn-danger" onclick="deleteProduct('${item.id}', '${item.lens}')">
      <i class="fas fa-trash-alt"></i>
    </button>
  </p>`

const formatLens = item => `<p class="lenses card-text">${item.lens}</p>`