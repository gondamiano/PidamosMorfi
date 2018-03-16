<template>
  <div class="ui ten column centered grid">
    <form class="" action="index.html" method="post" v-show="this.showFormForNewUser">
      <div class="ui small form">
        <div class="three fields">
          <select class="ui dropdown" v-model="addUser.user_id">
            <option selected="selected"> Elija un usuario </option>
            <option :value="user._id"  v-for="user in users"> {{ user.name }}</option>
          </select>
          <br>
          <div class="field">
            <label>Cantidad</label>
            <input placeholder="cantidad" max="10" min="1" v-model="addUser.food[0].quantity" type="number">
          </div>
      </div>
        <select class="ui dropdown" v-model="addUser.food[0].food_id">
          <option :value="foods.food_id" v-for="foods in this.order.store_id.typeOf">{{ foods.foodName }}</option>
        </select>
        <br>
      <div class="ui submit button" v-on:click="submitUserFood()">Agregar</div>
    </div>
    </form>
    <table class="ui inverted blue table">
      <thead>
        <th>Pedido para {{ order.store_id.name }} </th>
        <th></th>
        <th></th>
        <th><i class="pencil alternate icon" v-on:click='addUserOrder()'></i></th>
      </thead>
      <th> Integrantes </th>
      <th> Cantidad </th>
      <th> Precio c/u </th>
      <th> Total </th>
      <tbody>
        <tr v-for="users in order.users">
          <td>
            <div class="ui transparent input">
              <input type="text" v-model="users.user_id.name">
            </div>
          </td>
          <td>
            <div class="ui transparent input">
              <input type="text" v-model="users.food[0].quantity" >
            </div>
          </td>
          <td>
            <div class="ui transparent input">
              <input type="text" v-model="users.food[0].price" >
            </div>
          </td>
          <td>
            <div class="ui transparent input">
              <input type="text" v-model="users.food[0].total" disabled>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderService from '../services/orderService.js'
import UserService from '../services/userService.js'

export default {
  name: 'order',
  data () {
    return {
      order : {store_id: {name: 'Local'}},
      showFormForNewUser: false,
      addUser: {
        _id: 0,
        user_id: 0,
        food : [{
          description: '',
          quantity: 0,
        }]
      },
      users : {},
    }
  },
  beforeCreate() {
    var vm = this
    OrderService.getCompleteOrder(this.$route.params.id).then(function (response) {
      vm.order = response
      console.log("order: ", vm.order)
      vm.order.users.forEach( function (value, index, arr) {
        value.food.forEach( function (value, index, foodTotalPrice) {
          foodTotalPrice[index].total = foodTotalPrice[index].quantity * foodTotalPrice[index].price
        })
      });
    },
    function (response) {
      console.log(response)
    })
  },

  methods: {
    addUserOrder () {
      this.showFormForNewUser = !this.showFormForNewUser
      var vm = this;
      UserService.getUsers().then(
        function (response) {
          vm.users = response;
        },
        function (response) {
          console.log("FALLO : " , response)
        }
      )
    },

    submitUserFood() {
      var vm = this
      vm.addUser._id = vm.order._id;
      vm.order.store_id.typeOf.forEach( function (food) {
        if(food.food_id == vm.addUser.food[0].food_id)
          vm.addUser.food[0].description = food.foodName;
          vm.addUser.food[0].price = food.price;
      })
      vm.addUser.food[0].total = vm.addUser.food[0].quantity * vm.addUser.food[0].price;
      OrderService.insertUserInOrder(vm.addUser).then(
        function (response) {
          vm.order.users.push(vm.addUser)
        },
        function(response){
          console.log("FALLO:!!!", response)
        }
      )
      console.log(vm.order)
      console.log("asd", vm.addUser)
    }
  }
}
</script>

<style type="text/css" scoped>

thead>th {
  text-align : center;
}

i {
  cursor:pointer;
  font-size: 20px;
}
</style>
