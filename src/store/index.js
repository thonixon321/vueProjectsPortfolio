import Vue from 'vue';
import Vuex from 'vuex';


//load vuex
Vue.use(Vuex);

//create store
export const store = new Vuex.Store({

});

store.subscribe((mutation, state) => {
  //check which modules are having their state
  //changed, and update the local storage for that module
  if (mutation.type.startsWith("toDo")) {
    // Store the state object as a JSON string
    localStorage.setItem('toDoStore', JSON.stringify(state));
  }

  if (mutation.type.startsWith("volunteer")) {
    localStorage.setItem('volunteerStore', JSON.stringify(state));
  }


});