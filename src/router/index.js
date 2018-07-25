import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Order from '@/components/order'
import Stores from '@/components/stores'
import Store from '@/components/store'
import Orders from '@/components/orders'

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
    },
    {
      path: '/store/:updateId',
      name: 'store',
      component: Store,
      auth: true
    },
    {
      path: '/stores',
      name: 'stores',
      component: Stores,
      auth: true
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      auth: true
    }
  ]
})
