const userService = {
  getUsers (){
    return new Promise(function (resolve, reject) {
      Vue.http.get('http://localhost:3000/api/users').then(
        function (response) {
          resolve(response.body);
        },
        function (response) {
          reject(response);
        }
      );
    })
  }

}

export default userService;
