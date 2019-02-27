import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register')
    },
    {
      path: '/questions/create',
      name: 'createQuestion',
      component: () => import('@/views/QuestionForm')
    },
    {
      path: '/questions/:questionId',
      name: 'questionDetail',
      component: () => import('@/views/QuestionDetail')
    },
    {
      path: '/posts/:data/:id',
      name: 'editPost',
      component: () => import('@/views/QuestionForm')
    },
  ]
})
