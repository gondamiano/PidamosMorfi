const storeService = {
  InsertStore (storeInfo) {
    return new Promise(function (resolve, reject) {
    Vue.http.put('http://localhost:3000/api/stores/insertStore', storeInfo).then(
        function(response) {
          resolve(response.body)
        },
        function (reject) {
          reject(response)
       }
   );
    })
  },

  getStores () {
      return new Promise( function (resolve, reject) {
          Vue.http.get('http://localhost:3000/api/stores').then(
              function (response) {
                  resolve(response.body)
              },
              function (reject) {
                  reject(response)
              }
          );
      })
  },

  deleteStore(id) {
    return new Promise(function (resolve, reject) {
      Vue.http.delete('http://localhost:3000/api/deleteStore/' + id).then(
        function (response) {
          resolve(response.body)
        },
        function (response) {
          reject(response)
        })
    })
  },

  getStoreById(id) {
    return new Promise(function (resolve, reject) {
      Vue.http.get('http://localhost:3000/api/stores/' + id).then(
        function (response) {
          resolve(response.body)
        },
        function (response) {
          reject(response)
        })
    })
  },

  updateStore (store) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('http://localhost:3000/api/stores/updateStore', store).then(
        function (response) {
          resolve(response.body);
        },
        function (response) {
          reject(response)
        })
    })
  },

  deleteFoodFromStore (store) {
    return new Promise(function (resolve, reject) {
      Vue.http.put('http://localhost:3000/api/stores/deleteFoodFromStore', store).then(
        function (response) {
          resolve(response.body)
        },
        function (response) {
          reject(response)
        }
      )
    })
  }
}

export default storeService