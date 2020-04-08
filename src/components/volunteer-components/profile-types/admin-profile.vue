<template>
  <div class="adminContainer">
    <h2>Available Volunteers:</h2>
    <div class='availableWorkersList'>
      <div v-for="(volunteer, outerIndex) in volunteers" :key="outerIndex" @click="expand = outerIndex">
        <div class="volunteerContainer" :class="{expand: expand == outerIndex && expand !== false}">
          <h2>{{volunteer.name}}</h2>
          <div v-show="expand == outerIndex && expand !== false" class='closeContain' @click.stop="expand = false">
            <div class='closeButton'></div>
          </div>
          <select @change="changeWeek" name='weeks' :id='`weekDropDownAdmin_${volunteer.userName}_${outerIndex}`'>
            <option :value='volunteer.availability.week_1[0].day+" - "+volunteer.availability.week_1[6].day'>{{ volunteer.availability.week_1[0].day+" - "+volunteer.availability.week_1[6].day }}</option>
            <option :value='volunteer.availability.week_2[0].day+" - "+volunteer.availability.week_2[6].day'>{{ volunteer.availability.week_2[0].day+" - "+volunteer.availability.week_2[6].day }}</option>
            <option :value='volunteer.availability.week_3[0].day+" - "+volunteer.availability.week_3[6].day'>{{ volunteer.availability.week_3[0].day+" - "+volunteer.availability.week_3[6].day }}</option>
          </select>
          <transition name="slideLeft" mode="out-in">
            <div v-show="weekShow == 1">
              <work-week :weekNum="'week_1'" :outerIndex="outerIndex" :volunteer="volunteer" :availability="volunteer.availability.week_1" />
            </div>
          </transition>
          <transition name="slideLeft" mode="out-in">
            <div v-show="weekShow == 2">
              <work-week :weekNum="'week_2'" :outerIndex="outerIndex" :volunteer="volunteer" :availability="volunteer.availability.week_2" />
            </div>
          </transition>
          <transition name="slideLeft" mode="out-in">
            <div v-show="weekShow == 3">
              <work-week :weekNum="'week_3'" :outerIndex="outerIndex" :volunteer="volunteer" :availability="volunteer.availability.week_3" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import workWeek from './admin-components/work-week';

  export default {

    name: '',

    data: function() {
      return{
        componentLoaded: false,
        expand: false,
        weekShow: 1,

      }
    },



    computed: {
      ...mapGetters({
        volunteers: 'volunteerStore/volunteers',
        dates: 'volunteerStore/dates',
      }),

      week1() {
        var week = '';
        if (this.componentLoaded) {
          week = this.dates.week_1[0].day+" - "+this.dates.week_1[6].day;
        }
        return week;
      },
      week2() {
        var week = '';
        if (this.componentLoaded) {
          week = this.dates.week_2[0].day+" - "+this.dates.week_2[6].day;
        }
        return week;
      },
      week3() {
        var week = '';
        if (this.componentLoaded) {
          week = this.dates.week_3[0].day+" - "+this.dates.week_3[6].day;
        }
        return week;
      },
    },



    props: {

    },



    methods: {
      ...mapActions({
        callLoadVolunteers: 'volunteerStore/callLoadVolunteers'
      }),

       changeWeek(event) {
        if (event.target.value == this.week1) {
          this.weekShow = 1;
        }
        else if (event.target.value == this.week2){
          this.weekShow = 2;
        }
        else{
          this.weekShow = 3;
        }
      }
    },



    watch: {

    },


    components: {
      workWeek
    },



    mounted: function() {
       this.componentLoaded = true;
    }
  }

</script>


<style scoped>

  .adminContainer {
    position: relative;
    top: 20%;
    left: 3%;
  }

  .closeContain {
    position: absolute;
    top: 0em;
    right: .15em;
    width: 3em;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .closeButton {
    background: black;
    height: 23px;
    position: relative;
    width: 5px;
    border-radius: 5px;
    transform: rotate(45deg);
  }

  .closeButton:after {
    background: black;
    content: "";
    height: 5px;
    width: 23px;
    border-radius: 5px;
    left: -9px;
    position: absolute;
    top: 9.3px;
  }

  .availableWorkersList {
    display: flex;
    flex-direction: column;
    padding: 0em 1em;
  }

  .volunteerContainer {
    position: relative;
    border: 1px blanchedalmond solid;
    width: 80%;
    height: 5em;
    margin: 1em;
    cursor: pointer;
    border-radius: 4px;
    transition: .5s ease;
    overflow: hidden;
  }

  .volunteerContainer.expand {
    transform: scale(1.1) translateX(6%);
    background: blanchedalmond;
    color: rgb(36, 34, 34);
    height: 35em;
    cursor: default;
  }

  .volunteerContainer:hover {
    transform: scale(1.1) translateX(6%);
    background: blanchedalmond;
    color: rgb(36, 34, 34);
  }

    select{
          margin: 0em 1.12em;
    }

    h2{
      padding: .2em .5em;
    }

    .slideLeft-enter-active,
    .slideLeft-leave-active {
      transition: opacity .81s, transform .81s;
    }

    .slideLeft-enter,
    .slideLeft-leave-to {
      opacity: 0;
    }

    .slideLeft-enter {
      transform: translateX(-100%);
    }

    .slideLeft-leave-to {
      transform: translateX(100%);
    }
</style>