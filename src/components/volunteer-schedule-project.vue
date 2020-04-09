<template>
  <div>
    <div class="volunteerHomeContainer">
      <router-view mode="out-in">

      </router-view>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import volunteerStore from '../store/modules/volunteerMod';

  export default {

    name: 'VolunteerProject',

    data: function() {
      return{

      }
    },



    computed: {
      ...mapGetters({
        volunteers: 'volunteerStore/volunteers',
        admin: 'volunteerStore/admin',
        dates: 'volunteerStore/dates',
        userType: 'volunteerStore/userType'
      })

    },



    props: {

    },



    methods: {
      ...mapActions({
        callLoadVolunteers: 'volunteerStore/callLoadVolunteers',
        callAddDates: 'volunteerStore/callAddDates',
        callLoadAdmin: 'volunteerStore/callLoadAdmin'
      }),

      registerStores() {
        var locallyStoredState;
        var storedVolunteers;

        this.$store.registerModule('volunteerStore', volunteerStore);
        storedVolunteers = this.volunteers;

        if(localStorage.getItem('volunteerStore') && storedVolunteers.length === 0) {
          locallyStoredState = JSON.parse(localStorage.getItem('volunteerStore'));

          this.callLoadVolunteers(locallyStoredState.volunteerStore.volunteers);
          this.callLoadAdmin(locallyStoredState.volunteerStore.admin);

        }



      },

      unregisterStores() {
        this.$store.unregisterModule('volunteerStore');
      },

      //depending on what day it is today, find the monday that starts
      //the current week, store dates for Monday - Sunday in array for week 1,
      //then the next Monday - Sunday dates for week 2, etc.
      storeDates() {
        var month,
            day,
            formattedDate,
            today = new Date(),
            nextWeek = new Date(),
            weekAfterNext = new Date(),
            date = today.getDay(),
            diff = today.getDate() - date + (date == 0 ? -6:1),
            diffNextMonday = diff + 7,
            diffMondayAfterNext = diff + 14,
            monday = new Date(today.setDate(diff)),
            nextMonday = new Date(nextWeek.setDate(diffNextMonday)),
            mondayAfterNext = new Date(weekAfterNext.setDate(diffMondayAfterNext)),
            week1Arr = [],
            week2Arr = [],
            week3Arr = [],
            dateObj = {};

        for (var i = 0; i < 7; i++) {
          var nextDay = new Date(this.getNextDay(new Date(monday), i));
          var newObj = {};

          month = (1 + nextDay.getMonth()).toString();
          month = month.length > 1 ? month : '0' + month;
          day = nextDay.getDate().toString();
          day = day.length > 1 ? day : '0' + day;
          formattedDate = month + '/' + day;

          newObj.day = formattedDate;
          newObj.availability = {checked:false, jobDetails: [{edit: false, time: '', name: '', course: ''}]};
          monday = new Date(monday);
          week1Arr.push(newObj);
        }

        for (var j = 0; j < 7; j++) {
          var nextDay2 = new Date(this.getNextDay(new Date(nextMonday), j));
          var newObj2 = {};

          month = (1 + nextDay2.getMonth()).toString();
          month = month.length > 1 ? month : '0' + month;
          day = nextDay2.getDate().toString();
          day = day.length > 1 ? day : '0' + day;
          formattedDate = month + '/' + day;

          newObj2.day = formattedDate;
          newObj2.availability = {checked:false, jobDetails: [{edit: false, time: '', name: '', course: ''}]};
          nextMonday = new Date(nextMonday);
          week2Arr.push(newObj2);
        }

        for (var k = 0; k < 7; k++) {
          var nextDay3 = new Date(this.getNextDay(new Date(mondayAfterNext), k));
          var newObj3 = {};

          month = (1 + nextDay3.getMonth()).toString();
          month = month.length > 1 ? month : '0' + month;
          day = nextDay3.getDate().toString();
          day = day.length > 1 ? day : '0' + day;
          formattedDate = month + '/' + day;

          newObj3.day = formattedDate;
          newObj3.availability = {checked:false, jobDetails: [{edit: false, time: '', name: '', course: ''}]};
          mondayAfterNext = new Date(mondayAfterNext);
          week3Arr.push(newObj3);
        }
        //getDate() returns the day of the month (like 30, for the 30th),
        //and getDay() returns 0 for Sunday, 1 for Monday, etc.
        dateObj.week1 = week1Arr;
        dateObj.week2 = week2Arr;
        dateObj.week3 = week3Arr;
        dateObj.weekShowing = 1;

        this.volunteers.forEach(function(el){
          //make sure the work weeks stored for each volunteer match
          //with the current weeks we just found through today's date
          if (el.availability.week_1[0].day !== week1Arr[0].day) {
            if (el.availability.week_1[0].day == week2Arr[0].day) {
              el.availability.week_1 = el.availability.week_2;
              el.availability.week_2 = el.availability.week_3;
              el.availability.week_3 = week3Arr;
            }
            else if(el.availability.week_1[0].day == week3Arr[0].day) {
              el.availability.week_1 = el.availability.week_3;
              el.availability.week_2 = week2Arr;
              el.availability.week_3 = week3Arr;
            }
            else{
              el.availability.week_1 = week1Arr;
              el.availability.week_2 = week2Arr;
              el.availability.week_3 = week3Arr;
            }
          }
        });
        this.callLoadVolunteers(this.volunteers);
        this.callAddDates(dateObj);
      },


      getNextDay(monday,day) {
        return monday.setDate(monday.getDate() + day);
      }


    },


    watch: {

    },



    mounted: function() {
      this.registerStores();
      this.storeDates();
    },


    beforeDestroy() {
      this.unregisterStores();
    },
  }

</script>


<style scoped>


.volunteerHomeContainer {
  position: fixed;
  top: 0;
  left: 0;
  background:  rgb(36, 34, 34);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}



</style>