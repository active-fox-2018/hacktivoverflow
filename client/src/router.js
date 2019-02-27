import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./views/topQuestions.vue')
    }, {
      path: '/questions',
      component: () => import('./views/Questions.vue')
    }, {
      path: '/detail/:questionId',
      component: () => import('./views/QuestionDetail.vue')
    }, {
      path: '/form',
      component: () => import('./components/Form.vue')
    }, {
      path: '/tag/:tagName',
      component: () => import('./views/TagDetail.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('tokenUser')
  if (to.matched.some(record => record.meta.requiresAuthUser)) {
    if (store.state.userToken) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
