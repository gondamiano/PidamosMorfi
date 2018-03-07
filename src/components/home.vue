<template>
    <table class="ui inverted blue table">
  <thead>
    <tr>
      <th v-for="(key, value) in orders[0]" >{{value}}</th>
  </tr>
  </thead>
<tbody>
    <tr v-for="order in orders" v-on:click="goToOrder(order)">
      <td></td>
      <td></td>
      <td>{{order.store_id}}</td>
      <td>{{order.total}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import OrderService from '../services/orderService.js'

export default {
  name: 'home',
  beforeCreate () {
    var vm = this
    OrderService.getOrders().then(function (response) {
      vm.orders = response
      console.log(vm.orders)
    },
    function (response) {
      console.log(response)
    })
  },

  data () {
    return {
      orders: {}
    }
  },
  methods: {
    getOrder (orderId) {
      console.log(orderId)
    },
    goToOrder (order) {
      console.log(order._id)
      this.$router.push({name : 'order' , params: { id : order._id }})
    }
  }
}

</script>
<style>
tbody>tr:hover {
  cursor: pointer;
  background-color: #89c9f9;
}
</style>
