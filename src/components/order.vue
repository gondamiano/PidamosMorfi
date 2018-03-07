<template>
  <div id="">
    <table class="ui inverted blue table">
      <thead>
        <th>Pedido para {{ order.store_id.name }} </th>
      </thead>
      <th> Integrantes </th>
      <th> Cantidad </th>
      <th> Precio c/u </th>
      <th> Total </th>
      <tbody>
        <tr v-for="users in order.users">
          <td>{{users.user_id.firstname}}</td>
          <td>{{ users.food[0].quantity }}</td>
          <td>{{ users.food[0].price }}</td>
          <td> {{ users.food[0].quantity * users.food[0].price }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderService from '../services/orderService.js'

export default {
  name: 'order',
  data () {
    return {
    order : {}
    }
  },
  beforeCreate() {
    var vm = this
    OrderService.getCompleteOrder(this.$route.params.id).then(function (response) {
      vm.order = response
      console.log(vm.order)
    },
    function (response) {
      console.log(response)
    })
  }
}
</script>

<style scoped>

thead>th {
  text-align : center;
}
</style>
