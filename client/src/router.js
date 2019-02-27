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
      component: Home,
      children: [
        {
          path: '',
          name: 'AllQuestions',
          component: () => import('./components/AllQuestions.vue')
        }, {
          path: 'ask',
          name: "ask",
          component: () => import('./components/Ask.vue')
        }, {
          path: 'question/:id',
          name: 'question',
          component: () => import('./components/QuestionDetails.vue')
        }, {
          path: 'edit-question/:id',
          name: 'edit-question',
          component: () => import('./components/EditQuestion.vue')
        }, {
          path: 'search',
          name: 'search',
          component: () => import('./components/SearchResult.vue')
        }
      ]
    },{
      path: '/authpage',
      component: () => import('./views/Authpage.vue'),
      children: [
        {
          path: '',
          redirect: 'NotFound'
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./components/Register.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./components/Login.vue')
        }
      ]
    },{
      path: '*',
      name: "NotFound",
      component: () => import('./components/NotFound.vue')
    }
  ]
})
