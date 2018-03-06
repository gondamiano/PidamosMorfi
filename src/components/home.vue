<template>
    <table class="ui inverted blue table">
  <thead>
    <tr>
      <th v-for="(key, value) in orders[0]" >{{value}}</th>
  </tr>
  </thead>
<tbody>
    <tr v-for="order in orders" v-on:click="getOrder(order.id)">
      <td>{{order.id}}</td>
      <td>{{order.store}}</td>
      <td>{{order.date}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import OrderService from '../services/orderService.js'

export default {
  name: "home",
  beforeCreate() {
    
      OrderService.getOrders().then(function(response) {
        console.log(response);
      },
      function(response){
        console.log(response);
      })
  },

  data() {
    return {
      orders : [{
          id: 1,
          store : 'La Orquidea',
          date: '1/3/2018',
        },
        {
            id: 2,
            store : 'La Patagonia',
            date: '2/3/2018',
        },
        {
            id: 3,
            store : 'Los Churrazos',
            date: '5/3/2018',
        }
      ]
    }
  },
  methods: {
    getOrder(orderId) {
        console.log(orderId);
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
