<template>
<div>
    <div class="create">
       <router-link :to="{ name: 'store', params: { newStore: true }}" class="item">
            <i class="plus icon add" ></i>
        </router-link>
    </div>
    <div class="ui four column doubling stackable grid container">
        <div class="column columnForm" v-for="store in stores" style="margin: 50px; border: 2px solid; margin-bottom: 150px;">
            <p>{{ store.name }}</p>
            <p>Direccion:  {{ store.location }}</p>
            <p>tel:  {{ store.phoneNumber }}</p>
            <div v-for="typeOf in store.typeOf">
                <p>{{ typeOf.foodName }} ${{ typeOf.price }} c/u</p>
            </div><br>
            <router-link :to="{ name: 'store', params: {updateId: store._id } }"><p style="color: black; cursor: pointer;">Modificar</p></router-link> |
            <p v-on:click="deleteStore(store._id)" style="color: red; cursor: pointer;">Eliminar</p>
        </div>
    </div>
</div>
</template>

<script>

import StoreService from '../services/storeService'

export default {
    name: 'stores',
    data () {
        return {
            stores: {}
        }
    },

    beforeCreate() {
        var vm = this;
        StoreService.getStores().then( function (response) {
            vm.stores = response
            console.log(response)
        },
        function (reject) {
            console.log(reject)
        })
    },

    //methods 
    methods: {
        deleteStore(id) {
            var vm = this;
            if(id != undefined) {
                StoreService.deleteStore(id).then( function(response) {
                    console.log(response);
                    vm.stores = _.filter(vm.stores, function (elem) { return elem._id != id});
                },
                function(reject) {
                    console.log(reject)
                })
            }
        },

        updateStore(store) {
            var vm = this;
        }
    }

}
</script>

<style scoped>

p {
    color: blue;
}

.columnForm {
    background-color: #009688;
    margin-bottom: 150px;
}

.add {
    font-size: 2em;
    margin: 10px 10px 25px;
}

.create {
    margin-left: 1000px;
}

</style>
