import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home'
    },
    {
      path: '/to-do-project',
      name: 'to-do-project',
      component: () => import('./components/to-do-project.vue'),
      children: [
        {
          path: '/to-do-project',
          name: 'to-do-list',
          component: () => import('./components/to-do-components/to-do-list.vue')
        },
        {
          path: '/listHistory',
          name: 'to-do-history',
          component: () => import('./components/to-do-components/list-history.vue')
        },

      ],
      meta: {
        title: 'to-do-project'
      }
    },
    {
      path: '/volunteer-project',
      name: 'volunteer-project',
      component: () => import('./components/volunteer-schedule-project.vue'),
      meta: {
        title: 'volunteer-project'
      }
    }
  ]
});