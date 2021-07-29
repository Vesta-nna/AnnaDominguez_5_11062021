const formatOrder = async () => {
  if (localStorage.getItem('orderId')) {
    console.log(localStorage.getItem('orderId'))
    const orderId = JSON.parse(localStorage.getItem('orderId'))
    console.log(orderId)
    document.getElementById('orderId').innerHTML = orderId
  }
};

formatOrder();

localStorage.clear();