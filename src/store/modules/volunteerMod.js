import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default(
  {
    namespaced: true,
    //data goes here
    state: {
      userType: 'Employee',
      admin: [],
      volunteers: [],
      dates: {
        week_1: [],
        week_2: [],
        week_3: []
      }
    },

    //retrieve data with these methods
    getters: {
      admin: (state) => state.admin,
      userType: (state) => state.userType,
      volunteers: (state) => state.volunteers,
      dates: (state) => state.dates
    },

    //call mutations and getters from here (step 1)
    actions: {
      callUpdateAvailability(state, volunteer) {
        state.commit('updateAvailability', volunteer)
      },

      callChangeUserType(state, type) {
        state.commit('changeUserType', type);
      },

      callLoadVolunteers(state, volunteers) {
        state.commit('loadVolunteers', volunteers);
      },

      callLoadAdmin(state, admin) {
        state.commit('loadAdmin', admin);
      },

      callAddVolunteer(state, volunteers) {
        state.commit('addAVolunteer', volunteers);
      },

      callAddAdmin(state, admin) {
        state.commit('addAdmin', admin);
      },

      callAddDates(state, dates) {
        state.commit('addDates', dates);
      }

    },

    //set/update/add data with these methods (step 2)
    mutations: {

      updateAvailability(state, volunteer) {

        state.volunteers.forEach(function(el){
          if (el.userName == volunteer.userName) {
            el = volunteer;
          }
        });

      },

      loadVolunteers(state, volunteers) {
        state.volunteers = volunteers;
      },

      loadAdmin(state, admin) {
        state.admin = admin;
      },

      addAdmin(state, admin) {
        state.admin.push(admin);
      },

      addAVolunteer(state, volunteers) {
        state.volunteers.push(volunteers);
      },

      changeUserType(state, type) {
        console.log(type);
        state.userType = type;
      },

      addDates(state, dates) {
        state.dates.week_1 = dates.week1;
        state.dates.week_2 = dates.week2;
        state.dates.week_3 = dates.week3;
      }

    }
  }
);

