<template>
  <div class="ui segment pusheable">
    <div class="ui inverted ui push top sidebar menu">
      <div class="item">
        <i aria-hidden="true" class="home icon">Home</i>
      </div>
      <div class="item">
        <i aria-hidden="true" class="gamepad icon">a jugar</i>
      </div>
      <div class="item">
        <i aria-hidden="true" class="home icon">Home</i>
      </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'navbar',
  data () {
    return {
      options: ['usuarios', 'pedidos', 'salir']
    }
  }
}

</script>
