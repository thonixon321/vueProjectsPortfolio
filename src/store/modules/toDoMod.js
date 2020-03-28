import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default(
  {
   namespaced: true,
   //data goes here
   state: {
    todo: []
   },

  //retrieve data with these methods
   getters: {
    allTodos: (state) => state.todo

   },

  //call mutations and getters from here (step 1)
   actions: {

    callAddToDo (state, todo) {
      console.log(todo);
      state.commit('addAToDo', todo);
    },

    callCompleteToDo (state, todo) {
      state.commit('completeAToDo', todo);
    },

    callIncompleteToDo (state, todo) {
      state.commit('incompleteAToDo', todo);
    }
  },

  //set/update/add data with these methods (step 2)
   mutations: {
    initialiseStore(state) {
        if(localStorage.getItem('toDoStore')) {
          // Replace the state object with the stored item
          this.replaceState(
            Object.assign(state, JSON.parse(localStorage.getItem('toDoStore')))
          );

        }

    },

    addAToDo (state, todo) {
      state.todo.push(todo);
      console.log(state);
    },

    completeAToDo (state, todo) {
      state.todo.forEach(function(el){
        if (el.id == todo.id) {
          el.status = 'complete';
        }
      });
    },

    incompleteAToDo (state, todo) {
      state.todo.forEach(function(el){
        if (el.id == todo.id) {
          el.status = 'incomplete';
        }
      });
    }

   }
  }
);
