<template>
  <div class='weekContainer'>
    <div class='workDayCard' v-for="(card, index) in availability" :key="index">
      <p>{{daysOfWeek[index]}} - {{card.day}}</p>
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
              <button @click="assignJob(job, card.availability.jobDetails, innerIndex)" class='submitAssign'>Submit</button>
              <button @click="cancelAssign(outerIndex, index, weekNum, job, card.availability.jobDetails, innerIndex)" class='cancelAssign'>Cancel</button>
            </div>
            <div v-else-if="job.time !== '' && job.edit == false" class='assignSummary'>
              <div>Time: {{job.time}} </div>
              <div>Group Name: {{job.name}}</div>
              <div>Course: {{job.course}}</div>
              <button @click="job.edit = true" class='editAssign'>Edit</button>
              <button @click="deleteJob(innerIndex, card.availability.jobDetails)" class='deleteAssign'>Delete</button>
            </div>
          </div>
        </div>
        <div v-else>Not Available</div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

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
      ...mapGetters({
        volunteers: 'volunteerStore/volunteers',
      }),

    },



    props: {
      availability: Array,
      volunteer: Object,
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
  margin: 1em .52em;
  height: 27em;
  width: 14%;
  font-size: .9em;
}
.cardContent{
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}

.availableCard, .assignAvailable {
  display: flex;
  flex-direction: column;
}

.assignDetails {
  margin-top: .5em;
}

.availableCard button {
  background: transparent;
  border: 1px black solid;
  padding: .2em .5em;
  color: black;
  margin-top: .3em;
}

.availableCard button.assignButton {
  margin-top: .83em;
}

.availableCard button:hover {
  background: black;
  color: blanchedalmond;
}

</style>