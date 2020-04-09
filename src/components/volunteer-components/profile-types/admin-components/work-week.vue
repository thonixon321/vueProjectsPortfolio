<template>
  <div class='weekContainer'>
    <div class='workDayCard' v-for="(card, index) in availability" :key="index">
      <p class="cardHeader">{{daysOfWeek[index]}} - {{card.day}}</p>
      <hr>
      <div class='cardContent'>
        <div class="availableCard" v-if="card.availability.checked">
          <div class='jobDetailsContainer' v-for="(job, innerIndex) in card.availability.jobDetails" :key="innerIndex">

            <div class="assignAvailable" v-if="job.time == '' && job.edit == false">
              <button @click="job.edit = true, job.name = '', job.course = '', job.time = ''" class='assignButton'>Assign</button>
            </div>
            <div v-else-if="job.edit" class='assignDetails'>
              <label :for='`jobTime_${weekNum}_${volunteer.userName}_${index}_${innerIndex}`'>Time:</label>
              <input type='text' v-model="job.time" :id='`jobTime_${weekNum}_${volunteer.userName}_${index}_${innerIndex}`'>
              <label :for='`jobName_${weekNum}_${volunteer.userName}_${index}_${innerIndex}`'>Name:</label>
              <input type='text' v-model="job.name" :id='`jobName_${weekNum}_${volunteer.userName}_${index}_${innerIndex}`'>
              <label :for='`jobCourse_${weekNum}_${volunteer.userName}_${index}_${innerIndex}`'>Course:</label>
              <input type='text' v-model="job.course" :id='`jobCourse_${weekNum}_${volunteer.userName}_${index}_${innerIndex}`'>
              <div class="buttonContainer">
                <button @click="assignJob(job, card.availability.jobDetails, innerIndex)" class='submitAssign'>Submit</button>
                <button @click="cancelAssign(outerIndex, index, weekNum, job, card.availability.jobDetails, innerIndex)" class='cancelAssign'>Cancel</button>
              </div>
            </div>
            <div v-else-if="job.time !== '' && job.edit == false" class="jobSummary">
              <div class='assignSummary'>
                <div>{{job.time}} </div>
                <div>{{job.name}}</div>
                <div>{{job.course}}</div>
              </div>
              <div class="buttonContainer">
                <button @click="job.edit = true" class='editAssign'>Edit</button>
                <button @click="deleteJob(innerIndex, card.availability.jobDetails)" class='deleteAssign'>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div class="nonAvail" v-else>Not Available</div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {

    name: 'Work-Card',

    data: function() {
      return{
        mounted: false,
        daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        editAssignment: false
      }
    },



    computed: {

    },



    props: {
      availability: Array,
      volunteer: Object,
      volunteers: Array,
      outerIndex: Number,
      weekNum: String
    },



    methods: {
      ...mapActions({
        callLoadVolunteers: 'volunteerStore/callLoadVolunteers'
      }),

      assignJob(job, jobArray, innerIndex) {

        if (job.time !== '' && job.name !== '' && job.course !== '') {

          this.callLoadVolunteers(this.volunteers);
          job.edit = false;
          //don't add another assign button to this day if user is
          //just editing a previously made job
          if (innerIndex+1 == jobArray.length) {
            jobArray.push({edit: false, time: '', name: '', course: ''});
          }

        }
      },

      deleteJob(index, jobArray) {
        jobArray.splice(index, 1);
        this.callLoadVolunteers(this.volunteers);
      },

      cancelAssign(outerIndex, index, weekNum, job, jobArray, innerIndex) {
        var store = JSON.parse(localStorage.getItem('volunteerStore'));
        var volunteersStorage = store.volunteerStore.volunteers;

        job.time = volunteersStorage[outerIndex].availability[weekNum][index].availability.jobDetails[innerIndex].time;
        job.name = volunteersStorage[outerIndex].availability[weekNum][index].availability.jobDetails[innerIndex].name;
        job.course = volunteersStorage[outerIndex].availability[weekNum][index].availability.jobDetails[innerIndex].course;
        job.edit = false;

      }

    },



    watch: {

    },



    mounted: function() {

    }
  }

</script>


<style scoped>
hr{
  width: 100%;
  margin-bottom: .82em;
  color: black;
}
.weekContainer {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 33em;
  overflow: auto;
  overflow-x: hidden;
  border-top: 1px black solid;
  margin-top: 1em;
  padding: 0em .51em;
}
.workDayCard {
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  border-radius: 4px;
  padding: .21em;
  margin: 1em .72em;
  height: 16em;
  width: 14em;
  font-size: .9em;
}
.cardHeader {
  font-size: 1.2em;
  font-weight: 700;
  margin: 0.42em 0 0 0.2em;
}
.cardContent{
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}

.availableCard, .assignAvailable, .assignSummary {
  display: flex;
  flex-direction: column;
}

.availableCard {
  width: 95%;
}

.jobSummary {
  background: rgba(248, 254, 225, 0.91);
  margin-top: .5em;
  border: 1px black solid;
  border-radius: 4px;
}

.assignSummary {
  margin-top: .32em;
  align-items: center;
}

.assignDetails {
  background: rgba(248, 254, 225, 0.91);
  margin-top: .95em;
  margin-bottom: .95em;
  border: 1px black solid;
  border-radius: 4px;
  padding: .3em;
  overflow: hidden;
}

.assignDetails input {
  width: 98%;
  border: 1px black solid;
  border-radius: 4px;
  padding: .3em;
  margin: .41em 0em;
}

.buttonContainer {
  display: flex;
  justify-content: center;
  margin: 0 0 .32em 0;
}

.availableCard button {
  background: rgba(248, 254, 225, 0.91);
  border: 1px black solid;
  padding: .2em .5em;
  color: black;
  margin: .33em;
  border-radius: 4px;
  width: 43%;
}

.availableCard button.assignButton {
  margin: 0.95em 0 .95em 0;
  width: 100%;
}

.availableCard button:hover {
  background: rgb(41, 78, 180);
  color: blanchedalmond;
  border-color: rgb(41, 78, 180);
}

.nonAvail {
  margin-top: .95em;
}

</style>