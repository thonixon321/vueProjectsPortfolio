<template>
  <div class="adminContainer">
    <h2>Available Volunteers:</h2>
    <div class='availableWorkersList'>
      <div v-for="(volunteer, index) in volunteers" :key="index" @click="expand = index">
        <div class="volunteerContainer" :class="{expand: expand == index && expand !== false}">
          <h2>{{volunteer.name}}</h2>
          <div v-show="expand == index && expand !== false" class='closeContain' @click.stop="expand = false">
            <div class='closeButton'></div>
          </div>
          <select @change="changeWeek" name='weeks' id='weekDropDownAdmin'>
            <option :value='volunteer.availability.week_1[0].day+" - "+volunteer.availability.week_1[6].day'>{{ volunteer.availability.week_1[0].day+" - "+volunteer.availability.week_1[6].day }}</option>
            <option :value='volunteer.availability.week_2[0].day+" - "+volunteer.availability.week_2[6].day'>{{ volunteer.availability.week_2[0].day+" - "+volunteer.availability.week_2[6].day }}</option>
            <option :value='volunteer.availability.week_3[0].day+" - "+volunteer.availability.week_3[6].day'>{{ volunteer.availability.week_3[0].day+" - "+volunteer.availability.week_3[6].day }}</option>
          </select>
          <transition name="slideLeft" mode="out-in">
            <div v-show="weekShow == 1" class='weekContainer weekContainer_1'>
              <div class='workDayCard' v-for="(card, index) in volunteer.availability.week_1" :key="index">
                <p>{{daysOfWeek[index]}} - {{card.day}}</p>
                <hr>
                <div class='cardContent'>
                  <div class="availableCard" v-if="card.availability.checked">
                    <span v-show="hide !== index">Available!</span>
                    <button v-show="hide !== index" @click="assignWork(index)" class='assignButton'>Assign</button>
                    <div v-show="assignJob == index && assignJob !== false" class='assignDetails'>
                      <label :for='`jobTime_${index}`'>Time:</label>
                      <input type='text' :id='`jobTime_${index}`'>
                      <label :for='`jobName_${index}`'>Name:</label>
                      <input type='text' :id='`jobName_${index}`'>
                      <label :for='`jobCourse_${index}`'>Course:</label>
                      <input type='text' :id='`jobCourse_${index}`'>
                      <button class='submitAssign'>Submit</button>
                      <button @click="assignWork('')" class='cancelAssign'>Cancel</button>
                    </div>
                  </div>
                  <div v-else>Not Available</div>
                </div>
              </div>
            </div>
          </transition>
          <transition name="slideLeft" mode="out-in">
            <div v-show="weekShow == 2" class='weekContainer weekContainer_2'>
              <div class='workDayCard' v-for="(card, index) in volunteer.availability.week_2" :key="index">
                <p>{{daysOfWeek[index]}} - {{card.day}}</p>
                <hr>
                <div class='cardContent'>
                  <div class="availableCard" v-if="card.availability.checked">
                    <span v-show="hide !== index">Available!</span>
                    <button v-show="hide !== index" @click="assignWork(index)" class='assignButton'>Assign</button>
                    <div v-show="assignJob == index && assignJob !== false" class='assignDetails'>
                      <label :for='`jobTime_${index}`'>Time</label>
                      <input type='text' :id='`jobTime_${index}`'>
                      <label :for='`jobName_${index}`'>Name:</label>
                      <input type='text' :id='`jobName_${index}`'>
                      <label :for='`jobCourse_${index}`'>Course:</label>
                      <input type='text' :id='`jobCourse_${index}`'>
                      <button class='submitAssign'>Submit</button>
                      <button @click="assignWork('')" class='cancelAssign'>Cancel</button>
                    </div>
                  </div>
                  <div v-else>Not Available</div>
                </div>
              </div>
            </div>
          </transition>
          <transition name="slideLeft" mode="out-in">
            <div v-show="weekShow == 3" class='weekContainer weekContainer_3'>
              <div class='workDayCard' v-for="(card, index) in volunteer.availability.week_3" :key="index">
                <p>{{daysOfWeek[index]}} - {{card.day}}</p>
                <hr>
                <div class='cardContent'>
                  <div class="availableCard" v-if="card.availability.checked">
                    <span v-show="hide !== index">Available!</span>
                    <button v-show="hide !== index" @click="assignWork(index)" class='assignButton'>Assign</button>
                    <div v-show="assignJob == index && assignJob !== false" class='assignDetails'>
                      <label :for='`jobTime_${index}`'>Time</label>
                      <input type='text' :id='`jobTime_${index}`'>
                      <label :for='`jobName_${index}`'>Name:</label>
                      <input type='text' :id='`jobName_${index}`'>
                      <label :for='`jobCourse_${index}`'>Course:</label>
                      <input type='text' :id='`jobCourse_${index}`'>
                      <button class='submitAssign'>Submit</button>
                      <button @click="assignWork('')" class='cancelAssign'>Cancel</button>
                    </div>
                  </div>
                  <div v-else>Not Available</div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';

  export default {

    name: '',

    data: function() {
      return{
        hide: '',
        assignJob: false,
        componentLoaded: false,
        expand: false,
        weekShow: 1,
        daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
      },

      assignWork(index) {
        this.assignJob = index;
        this.hide = index;
      }
    },



    watch: {

    },



    mounted: function() {
       this.componentLoaded = true;
    }
  }

</script>


<style scoped>
  .availableCard {
    display: flex;
    flex-direction: column;
  }

  .availableCard button {
    background: transparent;
    border: 1px black solid;
    padding: .2em .5em;
    color: black;
    margin-top: .3em;
  }

  .availableCard button:hover {
    background: black;
    color: blanchedalmond;
  }

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
    height: 23em;
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

    hr{
      width: 100%;
    }

    .weekContainer {
      position: absolute;
      display: flex;
      width: 100%;
    }
    .workDayCard {
      display: flex;
      flex-direction: column;
      border: 1px black solid;
      padding: .21em;
      margin: 1em 1.52em;
      height: 15em;
      width: 13%;
      font-size: .9em;
    }
    .cardContent{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 59%;
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