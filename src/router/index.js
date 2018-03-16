import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Order from '@/components/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      auth: true
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      auth: true
    },
    {
      path: '/order/:id',
      name: 'order',
      component: Order,
      auth: true
    }
  ]
})
