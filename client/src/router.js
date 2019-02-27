import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      children : [
        {
          path : '',
          name : 'mainpage',
          component: () => import(/* webpackChunkName: "about" */ './components/mainpage.vue')
        },
        {
          path : 'signup',
          name : 'signup',
          component: () => import(/* webpackChunkName: "about" */ './components/signup.vue')
        },
        {
          path : 'login',
          name : 'login',
          component : () => import(/* webpackChunkName: "about" */ './components/login')
        },
        {
          path : 'create',
          name : 'create',
          component : () => import(/* webpackChunkName: "about" */ './components/createPosting')
        },
        {
          path : 'archieve',
          name : 'archieve',
          component : () => import(/* webpackChunkName: "archieve" */ './components/archievePage')
        },
        {
          path : 'posting/:id/:index',
          name : 'posting',
          component : () => import(/* webpackChunkName: "about" */ './components/posting' )
         }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
