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
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('./views/Question.vue')
    },
    {
      path: '/edit-question/:id',
      name: 'editQuestion',
      component: () => import('./views/EditQuestion.vue')
    },
    {
      path: '/question-detail/:id',
      name: 'questionDetail',
      component: () => import('./views/QuestionDetails.vue')
    },
    {
      path: '/my-questions',
      name: 'myQuestions',
      component: () => import('./views/UserQuestion.vue')
    },
    {
      path: '/questions/tag/:tag',
      name: 'tagged',
      component: () => import('./views/Tagged.vue')
    }
  ]
})
