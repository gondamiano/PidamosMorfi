<script>

const orderService = {
  getOrders() {
    return new Promise(function(resolve, reject) {
      Vue.http.get('localhost:3000/orders').then(
        function(response) {
          resolve(response.body);
        },
        function(response) {
          reject(response);
        }
      );
    })
  },

  getOrder(id) {
    return new Promise(function(resolve, reject) {
      Vue.http.get('localhost:3000/orders/:_' + id).then(
        function(response) {
          resolve(response.body);
        },
        function(response) {
          reject(response);
        }
      ),
    })
  },

  createOrder(order) {
    return new Promise(function(resolve, reject) {
      Vue.http.put('localhost:3000/orders', {product: product}).then(
        function(response) {
          resolve(response);
        },
        function(response) {
          reject(response);
        }
      ),
    })
  },
}

export default orderService;
</script>
