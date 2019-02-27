import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/questions.vue')
    },
    {
      path: '/ask_question',
      name: 'addQuestion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/askQuestion.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          store.dispatch('userAuthetication')
          .then(() => {
            next()
          })
          .catch(err => {
            next({ name: 'login' })
          }) 
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ask_question/:id',
      name: 'editQuestion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/askQuestion.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          store.dispatch('userAuthetication')
          .then(() => {
            next()
          })
          .catch(err => {
            next({ name: 'login' })
          }) 
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/answer/:id',
      name: 'editAnswer',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/askQuestion.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          store.dispatch('userAuthetication')
          .then(() => {
            if (to.params.id) {
              next()
            } else {
              next({ name: 'home' })
            }
          })
          .catch(err => {
            next({ name: 'login' })
          }) 
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue')
    },
    {
      path: '/question/:questionId',
      name: 'question',
      component: () => import(/* webpackChunkName: "about" */ './views/questionDetail.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "about" */ './views/userquestion.vue')
    },
  ]
})
