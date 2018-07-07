<template>
  <div class="ui secondary  menu">
  <router-link :to="{ name: 'home' }" class="item active">
    Home
  </router-link>
  <router-link :to="{ name: 'HelloWorld'}" class="item">
    Pedidos
  </router-link>
  <router-link :to="{ name: 'stores'}" class="item">
    Locales
  </router-link>
  <div class="right menu">
    <div class="item">
      <div class="ui icon input">
        <input type="text" placeholder="Search...">
        <i class="search link icon"></i>
      </div>
    </div>
    <a class="ui item">
      Logout
    </a>
  </div>
</div>
</template>

<script>

export default {
  name: 'navBar',
  data () {
    return {
      options: ['usuarios', 'pedidos', 'salir']
    }
  },
  created () {
    var vm = this
  },
  methods: {
  }
}

</script>
