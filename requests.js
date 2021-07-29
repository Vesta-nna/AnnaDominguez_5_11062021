const getProduct = async (productId) => await (await fetch(`${APIURL}/${productId}`).catch(error => console.error(error))).json()

const getProducts = async () => await (await fetch(`${APIURL}`).catch(error => console.error(error))).json()

const postOrder = async data => await (await fetch(`${APIURL}/order`, {
  method: "POST",
  mode: 'cors',
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  body: JSON.stringify(data)
}).catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    console.error(error.config);
  })).json()