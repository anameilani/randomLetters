import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GamePage from './views/Game.vue'
import WaitingPage from './views/Waiting.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/game',
      name: 'gamePage',
      component: GamePage
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: WaitingPage
    },
    {
      path: '/lobby',
      name: 'lobby',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Lobby.vue')
    }
  ]
})
