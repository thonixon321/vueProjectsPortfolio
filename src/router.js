import Vue from 'vue';
import Router from 'vue-router';
import Home from './travel-router-practice/src/views/Home.vue';
import destinationStore from './travel-router-practice/src/store';

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "tom-exact-active",
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
      children: [
        {
          path: '/volunteer-project',
          name: 'volunteer-login',
          component: () => import('./components/volunteer-components/login-page.vue')
        },
        {
          path: '/volunteer-project/register-page',
          name: 'volunteer-register',
          component: () => import('./components/volunteer-components/register-page.vue')
        },
        {
          path: '/volunteer-project/user-profile/:userName',
          name: 'user-profile',
          props: true,
          meta: {requireAuth: true},
          component: () => import('./components/volunteer-components/user-profile.vue')
        }

      ],
      meta: {
        title: 'volunteer-project'
      }
    },
    {
      path: '/travel-app',
      name: 'travel-app',
      component: () => import('./travel-router-practice/src/travelApp.vue'),
      children: [
        {
          path: '/travel-app',
          name: 'Home',
          props: true,
          component: Home
        },
        {
          //the :id at the end allows users to get the same route
          //even if they have different id numbers for their url,
          //passes in params to that :id
          path: '/destination/details/:slug',
          name: 'destination-details',
          props: true,
          component: () => import(/* webpackChunkName: "Destination-Details" */ './travel-router-practice/src/views/DestinationDetails.vue'),
          children: [
            {
              path: ':experienceSlug',
              name: 'experienceDetails',
              props: true,
              component: () => import(/* webpackChunkName: "Experience-Details" */ './travel-router-practice/src/views/ExperienceDetails.vue')
            }
          ],
          meta: {checkUrl: true}
        }
      ],
    },
    {
      path: '/materialize-app',
      name: 'materialize-app',
      component: () => import('./components/materialize-project.vue')
    },
    {
      path: "/404",
      alias: "*",
      name: "notFound",
      component: () => import(/* webpackChunkName: "NotFound" */ './components/NotFound.vue')
    }
  ]
});

//before being able to let a user navigate to a route,
//check if the route is protected through a meta tag, and
//if so, do some action. In this case, I check for a particular
//path that has a meta tag, see if the url param exists in my store,
//and if it doesn't then send user to 404 page
router.beforeEach( (to, from, next) => {

  //find() is like a forEach that loops through until
  //what is being tested evaluates to true, if so, it will
  //return true, otherwise it will be undefined
  const exists = destinationStore.destinations.find(
    destination => destination.slug === to.params.slug
  );

  //check for the error first, and always have the else give the expected behaviour "next()" - otherwise an endless loop can occur -
  //the some() method will test the given array and if one of the items
  //in the array passes as true, then it returns the statement as true -
  //we use this here in case there are multiple paths that are matched -
  //ones with children paths for example, and if so, we want to find the path
  //with the meta tag within that matched array of paths
  if (to.matched.some(record => record.meta.checkUrl) && exists == undefined) {
    next({name: "notFound"});
  }
  else if (from.name !== "volunteer-register" && from.name !== 'volunteer-login' && from.name !== 'volunteer-project' && to.matched.some(record => record.meta.requireAuth)) {

    next({name: 'volunteer-login'});

  }
  else{
    next();
  }
});

export default router;