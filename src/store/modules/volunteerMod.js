import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default(
  {
    namespaced: true,
    //data goes here
    state: {
      volunteers: [
        {
          name: 'Tommy'
        }
      ]
    },

    //retrieve data with these methods
    getters: {

    },

    //call mutations and getters from here (step 1)
    actions: {


    },

    //set/update/add data with these methods (step 2)
    mutations: {
    initialiseStore(state) {
        if(localStorage.getItem('volunteerStore')) {
          // Replace the state object with the stored item
          this.replaceState(
            Object.assign(state, JSON.parse(localStorage.getItem('volunteerStore')))
          );

        }

    }

    }
  }
);

