<template lang='pug'>
	.product-curation
		notification(v-if="showMessage" v-bind:notification="errorMessage" @close="closeNotification")
		h1.ui.dividing.header {{product.name}}
		.ui.container
			.ui.form
				.field
					label Style
					input(type="text" name="style" disabled :value="product.style")
				.field
					label Brand
					input(type="text" name="brand" v-model="product.brand")
				.field
					label Name
					input(type="text" name="name" v-model="product.name")
				.field
					label Franchise
					input(type="text" name="franchise" v-model="product.franchise")
				.field
					label Model
					input(type="text" name="model" v-model="product.model")
				.field
					label Colorway
					input(type="text" name="colorway" v-model="product.colorway")
				.field
					label Year
					input(type="text" name="year" v-model="product.year")

				button.ui.blue.button(type="button" @click="save()") Save
				button.ui.blue.button(type="button" @click="publish()") Save & Publish
</template>

<script>
	import ProductService from '../services/productService'
	import Notification from './notification.vue'
	export default {
	  	data() {
	  		return {
	  			product: {},
	  			showMessage: false,
	  			errorMessage: {}
	  		}
	  	},
		created() {
			var vm = this;
			ProductService.getProductForCuration(this.$route.params.id).then(
				function(response) {
					vm.product = response;
				}
			);
		},
	  	methods: {
	  		save() {
	  			var vm = this;
	  			ProductService.updateProduct(this.product).then(
					function(response) {
						vm.product = response;
						vm.errorMessage = {
							severity: 'success',
							header: 'Successfuly saved',
							message: 'The product has been updated'
						}
						vm.showMessage = true;
					},
					function(response) {
						console.log('fail', response)
						vm.errorMessage = {
							severity: 'error',
							header: 'Error!',
							message: response.body.error
						}
						vm.showMessage = true;
					}
				);
	  		},
	  		publish() {
	  			var vm = this;
	  			console.log('1231323')
	  			ProductService.publishProduct(this.product).then(
					function(response) {
						vm.$router.push('/');
					},
					function(response) {
						console.log('fail:', response);
						vm.errorMessage = {
							severity: 'error',
							header: 'Error!',
							message: response.body.error
						}
						vm.showMessage = true;
					}
				);
	  		},
	  		closeNotification() {
	  			this.showMessage = false;
	  		}
	  	},
		components: {Notification}
	}
</script>

<style scoped>

</style>
