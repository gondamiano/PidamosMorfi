<template>
    <div class="container">
        <div class="item" v-bind:click="openModal()">
        <i class="plus icon add" ></i>
        </div>
        <div>aca </div>
        <form class="ui form">
            <div class="field">
                <label></label>
                <div class="fields">
                <div class="twelve wide field">
                    <input type="text" name="shipping[address]" placeholder="Street Address">
                </div>
                <div class="four wide field">
                    <input type="text" name="shipping[address-2]" placeholder="Apt #">
                </div>
                </div>
            </div>
        
        </form>
        <div class="four column centered row">
            <div class="column" v-for="order in orders" v-bind:key="order">

            </div>
        </div>
    </div>
</template>

<script>

import OrderService from '../services/orderService.js';

export default {
    name : 'orders',
    data () {
        return {
            orders: {},
        }
    },

    methods: {
        openModal() {
            console.log("asd");
            $('.ui.modal')
            .modal({
            blurring: true
            })
            .modal('show')
        }
    },
    
    beforeCreate() {
        var vm = this;
        OrderService.getOrders().then(function (response) {
            vm.orders = response
            console.log(rersponse)
        },
        function (err) {
            console.log("Fallo el llamado a las ordenes " + err)
        })
    },


}


</script>

<style scoped>

.container {
    margin-top: 100px;
    border-style: solid;
    width: 80%;
    margin-left: 10%;
}

.item {
    display: unset;
    margin-left: 90%;
    font-size: 35px;
}

</style>
