<template>
  <div class="adminContainer">
    <h2 class="listH2">Available Volunteers:</h2>
    <div class='availableWorkersList'>
      <div v-for="(volunteer, outerIndex) in volunteers" :key="outerIndex" @click="expand = outerIndex">
        <div class="volunteerContainer" :class="{expand: expand == outerIndex && expand !== false}">
          <h2>{{volunteer.name}}</h2>
          <div v-show="expand == outerIndex && expand !== false" class='closeContain' @click.stop="expand = false">
            <div class='closeButton'></div>
          </div>
          <select v-model="volunteer.availability.weekShowing" name='weeks' :id='`weekDropDownAdmin_${volunteer.userName}_${outerIndex}`'>
            <option :value='1'>{{ volunteer.availability.week_1[0].day+" - "+volunteer.availability.week_1[6].day }}</option>
            <option :value='2'>{{ volunteer.availability.week_2[0].day+" - "+volunteer.availability.week_2[6].day }}</option>
            <option :value='3'>{{ volunteer.availability.week_3[0].day+" - "+volunteer.availability.week_3[6].day }}</option>
          </select>
          <transition name="slideLeft" mode="out-in">
            <div v-show="volunteer.availability.weekShowing == 1">
              <work-week :weekNum="'week_1'" :outerIndex="outerIndex" :volunteers="volunteers" :volunteer="volunteer" :availability="volunteer.availability.week_1" />
            </div>
          </transition>
          <transition name="slideLeft" mode="out-in">
            <div v-show="volunteer.availability.weekShowing == 2">
              <work-week :weekNum="'week_2'" :outerIndex="outerIndex" :volunteers="volunteers" :volunteer="volunteer" :availability="volunteer.availability.week_2" />
            </div>
          </transition>
          <transition name="slideLeft" mode="out-in">
            <div v-show="volunteer.availability.weekShowing == 3">
              <work-week :weekNum="'week_3'" :outerIndex="outerIndex" :volunteers="volunteers" :volunteer="volunteer" :availability="volunteer.availability.week_3" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import workWeek from './admin-components/work-week';

  export default {

    name: '',

    data: function() {
      return{

        expand: false,
        volunteers: ''

      }
    },



    computed: {
      ...mapGetters({
        dates: 'volunteerStore/dates',
      }),

    },



    props: {

    },



    methods: {


    },



    watch: {

    },


    components: {
      workWeek
    },



    mounted: function() {
      var locallyStored = JSON.parse(localStorage.getItem('volunteerStore'));
      this.volunteers = locallyStored.volunteerStore.volunteers;
    }
  }

</script>


<style scoped>

  .adminContainer {
    position: relative;
    top: 12em;
    left: 2em;
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

  .listH2 {
    margin-left: 1em;
  }

  .availableWorkersList {
    display: flex;
    flex-direction: column;
    padding: 0em 1em;
  }

  .volunteerContainer {
    position: relative;
    border: 1px blanchedalmond solid;
    width: 86%;
    height: 4.5em;
    margin: 1em;
    cursor: pointer;
    border-radius: 4px;
    transition: .5s ease;
    overflow: hidden;
  }

  .volunteerContainer.expand {
    transform: scale(1.01) translateX(3%);
    background: blanchedalmond;
    color: rgb(36, 34, 34);
    height: 41em;
    cursor: default;
  }

  .volunteerContainer:hover {
    transform: scale(1.01) translateX(3%);
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