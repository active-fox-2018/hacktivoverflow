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
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/form.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/form.vue')
    },
    {
      path: '/ask',
      name: 'ask',
      component: () => import('./views/form.vue')
    }, {
      path: '/ques/:id',
      name: 'quesDetail',
      component: Home
    }, {
      path: '/editQues/:id',
      name: 'editQues',
      component: () => import('./views/form.vue')
    }, {
      path: '/editAns/:id',
      name: 'editAns',
      component: () => import('./views/form.vue')
    }
  ]
})
