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
      component: Home,
      children: [
        {
          path: '/',
          name: 'allQuestions',
          component: () => import('./views/listQuestions.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./views/register.vue')
        }
      ]
    },
    {
      path: '/ques/me',
      name: 'My Questions',
      component: () => import('./views/my_questions.vue')
    },
    {
      path: '/ask_question',
      name: 'questionsForm',
      component: () => import('./views/question_form.vue')
    },
    {
      path: '/question',
      name: 'question details',
      component: () => import('./views/question_fullDetails.vue')
    }

  ]
})
