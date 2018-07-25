<template>
<div class="ui grid">
    <div class="four wide column">
       <img>
    </div>
    <div class="nine wide column">
        <div class="ui form">
            <div class="two fields">
            <div class="field" v-bind:class="{'error': nameHasError}">
                <label>Nombre del negocio</label>
                <input type="text" placeholder="Nombre" maxlength="35" v-on:keydown="checkString(store.name)" v-model="store.name">
            </div>
            </div>
            <div class="two fields">
                <div class="field">
                    <label>Direccion</label>
                    <input type="text" placeholder="direccion" maxlength="80" v-model="store.location">
                </div>
            </div>
            <div class="two fields">
                <div class="field">
            <label>Numero de telefono</label>
            <input type="number" placeholder="Numero de telefono" maxlength="8" minlength="3" v-model="store.phoneNumber">
            </div>
            </div>
            <div class="ui animated fade button" tabindex="0" v-for="food in store.typeOf" v-if="$route.params.updateId">
                <div class="visible content" > {{ food.foodName }}   ${{ food.price }}</div>
                    <div class="hidden content" v-on:click="modify(food)">
                        Modify
                </div>
            </div>
                <br>
               
                <br>
            </div>
            <br>
                <label><i class="plus icon" v-bind:class="{ 'minus icuon': addFood}" v-on:click="add()"></i></label>
            <div class="ui form" v-if="addFood">
                <div class="two fields johnny">
                        <div class="ui form">
                            <div class="inline field">
                            <input type="text" placeholder="Nombre" maxlength="50" minlength="3" v-model="typeFood.foodName">
                        </div>
                    </div>
                </div>
                <div class="three fields">
                        <div class="ui form">
                            <div class="inline field">
                            <input type="number" placeholder="precio" v-model="typeFood.price">
                        </div>
                    </div>
                </div>
                <br>
                <div class="inline field"><button class="ui primary button" v-on:click="submitStore()">
                    Save
                    </button>
                </div>
            </div>
             <div class="ui form" v-if="modifyFood">
                <div class="two fields johnny">
                        <div class="ui form">
                            <div class="inline field">
                            <input type="text" placeholder="Nombre" maxlength="50" minlength="3" v-model="typeOf.foodName">
                        </div>
                    </div>
                </div>
                <div class="three fields">
                        <div class="ui form">
                            <div class="inline field">
                            <input type="number" placeholder="precio" v-model="typeOf.price">
                        </div>
                    </div>
                </div>
                <br>
                <div class="inline field"><button class="ui primary button" v-on:click="deleteFood(typeOf)">Delete </button></div>
                <div class="inline field"><button class="ui primary button" v-on:click="submitStore()">
                    Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import StoreService from '../services/storeService.js';

export default {
    name: 'store',
    data () {
        return { 
            Id: 0,
            store: {
                name: "",
                location: "",
                phoneNumber: undefined,
                typeOf: [{
                    foodName: "",
                    price: undefined
                }]
            },
             typeFood: {
                    foodName: "",
                    price: undefined
            },
            typeOf: {
                    foodName: "",
                    price: undefined
            },
            modifyFood : false,
            addFood: false,
            nameHasError: false,
            newStore: undefined

        }
    },
    methods: {
        add() {
            if(!this.addFood && this.modifyFood) {
                this.addFood = !this.addFood;
                this.modifyFood = !this.modifyFood;
                this.typeFood = {foodName: "", price: undefined };
            }
            else if(!this.modifyFood) {
                this.addFood = !this.addFood;
                this.typeFood = {foodName: "", price: undefined };
            }
        },

        modify(food) {
            if(!this.modifyFood && this.addFood) {
                this.modifyFood = !this.modifyFood;
                this.addFood = !this.addFood;
                this.typeOf = food;
            }
            else { 
                this.typeOf.foodName = food.foodName;
                this.typeOf.price = food.price;
            }
        },

        deleteFood(food) {
            var vm = this;
            var deleted = { _id: this.store, foodName: ""};
            deleted._id = this.store.typeOf.filter( function(elem) {return elem.foodName != food.foodName && elem.price != food.price });
        },

        submitStore() {
            var vm = this;
           
            if(vm.store.name != '' && vm.store.location != '' && vm.store.phoneNumber != undefined) {
                 if(this.$route.params.updateId) {
                    vm.store.typeOf.push(vm.typeFood);
                    StoreService.updateStore(vm.store).then(
                        function (response) {
                            console.log("salio bien", response);
                        }
                    )
                    .catch(function (err) {
                        console.log("salio bien", err);
                    })
                    return;
                }
                vm.store.typeOf = vm.typeFood;
                StoreService.InsertStore(vm.store);
                vm.$router.push('/stores');
            }
            else{console.log("EERRRORR")};
        },



        checkString(elem) {
            var vm = this;
            if(isNaN(vm.typeOf.foodName.charAt(0)))
            return vm.typeOf.foodName.charAt(0).toUpperCase() + vm.typeOf.foodName.slice(1);
            }
    
    },

    mounted () {
        var vm = this;
        if(this.$route.params.updateId) {
            StoreService.getStoreById(this.$route.params.updateId).then(function (response) {
                vm.store = response;
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + vm.storeToUpdate);
            },
            function(reject) {
                console.log("error aca" + reject);
            });
        }
        console.log("asdasdasd" , this.newStore);
    }
}
</script>

<style scoped>

.johnny{
    display: inline;
}

</style>
