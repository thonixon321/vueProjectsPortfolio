<template>
  <div class='employeeProfileContainer'>
    <div class='relativeSection'>
      <p class="headerEmployee">My Availability</p>
      <p class="headerEmployeeSmall">(check boxes for days you wish to work)</p>
      <select @change="changeWeek" name='weeks' id='weekDropDown'>
        <option :value='week1'>{{ week1 }}</option>
        <option :value='week2'>{{ week2 }}</option>
        <option :value='week3'>{{ week3 }}</option>
      </select>
      <button @click="updateAvailability()" class='submitSchedule'>Submit</button>
      <transition name="slideLeft" mode="out-in">

        <div v-show="weekShow == 1" class='weekContainer weekContainer_1'>
          <div class='workDayCard' v-for="(card, index) in userInfo.availability.week_1" :key="index">
            <h3>{{daysOfWeek[index]}} - {{card.day}}</h3>
            <hr>
            <div class='cardContent'>
              <div v-if="card.availability.jobDetails[0].time == ''" class='inner'>
                <input v-model="card.availability.checked" type='checkbox' :name='`cb_${userName}_${card.day}`' :id='`cb_${userName}_${card.day}`'>
                <label :for='`cb_${userName}_${card.day}`'>
                  <svg
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    id="svg8"
                    version="1.1"
                    viewBox="0 0 14.208334 14.689585"
                    height="55.519691"
                    width="53.70079">
                    <defs
                      id="defs2" />
                    <metadata
                      id="metadata5">
                      <rdf:RDF>
                        <cc:Work
                          rdf:about="">
                          <dc:format>image/svg+xml</dc:format>
                          <dc:type
                            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                          <dc:title></dc:title>
                        </cc:Work>
                      </rdf:RDF>
                    </metadata>
                    <g
                      transform="translate(0,-282.3104)"
                      id="layer1">
                      <rect
                        class="box"
                        ry="5.8359461"
                        rx="0.133719"
                        y="283.39587"
                        x="0.82788604"
                        height="12.644545"
                        width="12.833532"
                        id="rect821"
                        style="opacity:0.72000002;fill:none;fill-opacity:1;stroke:blanchedalmond;stroke-width:0.56170589;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:0;stroke-opacity:1;paint-order:markers fill stroke" />
                      <path
                        class="check"
                        id="path825"
                        d="m 3.3004076,290.34727 c 2.2981325,2.21414 2.2981325,2.21414 2.2981325,2.21414 l 5.6777389,-6.70229"
                        style="fill:none;stroke:blanchedalmond;stroke-width:1.69492209;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
                    </g>
                  </svg>

                </label>
              </div>
              <div v-else class='jobsAssigned'>
                <div v-for="(job, jobIndex) in card.availability.jobDetails" :key="jobIndex" >
                 <div v-if="job.time !== ''" class='jobsDisplay'>
                  <p>{{job.time}}</p>
                  <p>{{job.name}}</p>
                  <p>{{job.course}}</p>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </transition>
      <transition name="slideLeft" mode="out-in">

        <div v-show="weekShow == 2" class='weekContainer weekContainer_2'>
          <div class='workDayCard' v-for="(card, index) in userInfo.availability.week_2" :key="index">
            <h3>{{daysOfWeek[index]}} - {{card.day}}</h3>
            <hr>
            <div class='cardContent'>
              <div v-if="card.availability.jobDetails[0].time == ''" class='inner'>
                <input v-model="card.availability.checked" type='checkbox' :name='`cb_${userName}_${card.day}`' :id='`cb_${userName}_${card.day}`'>
                <label :for='`cb_${userName}_${card.day}`'>
                  <svg
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    id="svg8"
                    version="1.1"
                    viewBox="0 0 14.208334 14.689585"
                    height="55.519691"
                    width="53.70079">
                    <defs
                      id="defs2" />
                    <metadata
                      id="metadata5">
                      <rdf:RDF>
                        <cc:Work
                          rdf:about="">
                          <dc:format>image/svg+xml</dc:format>
                          <dc:type
                            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                          <dc:title></dc:title>
                        </cc:Work>
                      </rdf:RDF>
                    </metadata>
                    <g
                      transform="translate(0,-282.3104)"
                      id="layer1">
                      <rect
                        class="box"
                        ry="5.8359461"
                        rx="0.133719"
                        y="283.39587"
                        x="0.82788604"
                        height="12.644545"
                        width="12.833532"
                        id="rect821"
                        style="opacity:0.72000002;fill:none;fill-opacity:1;stroke:blanchedalmond;stroke-width:0.56170589;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:0;stroke-opacity:1;paint-order:markers fill stroke" />
                      <path
                        class="check"
                        id="path825"
                        d="m 3.3004076,290.34727 c 2.2981325,2.21414 2.2981325,2.21414 2.2981325,2.21414 l 5.6777389,-6.70229"
                        style="fill:none;stroke:blanchedalmond;stroke-width:1.69492209;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
                    </g>
                  </svg>

                </label>
              </div>
              <div v-else class='jobsAssigned'>
                <div v-for="(job, jobIndex) in card.availability.jobDetails" :key="jobIndex" >
                 <div v-if="job.time !== ''" class='jobsDisplay'>
                  <p>{{job.time}}</p>
                  <p>{{job.name}}</p>
                  <p>{{job.course}}</p>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </transition>
      <transition name="slideLeft" mode="out-in">

        <div  v-show="weekShow == 3" class='weekContainer weekContainer_3'>
          <div class='workDayCard' v-for="(card, index) in userInfo.availability.week_3" :key="index">
             <h3>{{daysOfWeek[index]}} - {{card.day}}</h3>
            <hr>
            <div class='cardContent'>
              <div v-if="card.availability.jobDetails[0].time == ''" class='inner'>
                <input v-model="card.availability.checked" type='checkbox' :name='`cb_${userName}_${card.day}`' :id='`cb_${userName}_${card.day}`'>
                <label :for='`cb_${userName}_${card.day}`'>
                  <svg
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    id="svg8"
                    version="1.1"
                    viewBox="0 0 14.208334 14.689585"
                    height="55.519691"
                    width="53.70079">
                    <defs
                      id="defs2" />
                    <metadata
                      id="metadata5">
                      <rdf:RDF>
                        <cc:Work
                          rdf:about="">
                          <dc:format>image/svg+xml</dc:format>
                          <dc:type
                            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                          <dc:title></dc:title>
                        </cc:Work>
                      </rdf:RDF>
                    </metadata>
                    <g
                      transform="translate(0,-282.3104)"
                      id="layer1">
                      <rect
                        class="box"
                        ry="5.8359461"
                        rx="0.133719"
                        y="283.39587"
                        x="0.82788604"
                        height="12.644545"
                        width="12.833532"
                        id="rect821"
                        style="opacity:0.72000002;fill:none;fill-opacity:1;stroke:blanchedalmond;stroke-width:0.56170589;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:0;stroke-opacity:1;paint-order:markers fill stroke" />
                      <path
                        class="check"
                        id="path825"
                        d="m 3.3004076,290.34727 c 2.2981325,2.21414 2.2981325,2.21414 2.2981325,2.21414 l 5.6777389,-6.70229"
                        style="fill:none;stroke:blanchedalmond;stroke-width:1.69492209;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
                    </g>
                  </svg>

                </label>
              </div>
              <div v-else class='jobsAssigned'>
                <div v-for="(job, jobIndex) in card.availability.jobDetails" :key="jobIndex" >
                  <div v-if="job.time !== ''" class='jobsDisplay'>
                    <p>{{job.time}}</p>
                    <p>{{job.name}}</p>
                    <p>{{job.course}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </transition>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {

    name: '',

    data: function() {
      return{
        userInfo: '',
        componentLoaded: false,
        weekShow: 1,
        dates: this.$store.state.volunteerStore.dates,
        volunteers: '',
        daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }
    },



    computed: {

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
      userName: {
        type: String,
        required: true
      }
    },



    methods: {

      ...mapActions({
        callUpdateAvailability: 'volunteerStore/callUpdateAvailability'
      }),

      updateUserInfo() {
        this.userInfo = this.volunteers.find(
          name => name.userName === this.userName
         );
      },

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


      updateAvailability() {
        console.log(this.userInfo);
        this.callUpdateAvailability(this.userInfo);

        this.$emit('savedChanges');

      }

    },



    watch: {

    },



    mounted: function() {
      var locallyStored = JSON.parse(localStorage.getItem('volunteerStore'));

      this.volunteers = locallyStored.volunteerStore.volunteers;
      this.userInfo = '';
      this.componentLoaded = true;
      this.updateUserInfo();

    },

    created() {

    },

    beforeDestroy() {

    }
  }

</script>


<style scoped>

.headerEmployee {
  font-size: 1.3em;
  margin: 0;
}
.headerEmployeeSmall {
  font-size: .9em;
  margin-top: 0.52em;
}

hr{
  width: 100%;
}

h3 {
  padding-left: 1em;
}

.employeeProfileContainer{
  position: relative;
  width: inherit;
  height: inherit;
}
select {
  margin-bottom: -0.3em;
}
.relativeSection {
  position: relative;
  top: 14em;
  left: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.weekContainer {
  display: flex;
  position: absolute;
  top: 9.26em;
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 33em;
}
.workDayCard {
  display: flex;
  flex-direction: column;
  border: 1px blanchedalmond solid;
  margin: 1em;
  height: 60%;
  width: 14em;
  overflow: hidden;
}
.cardContent{
  height: 100%;
  width: 13.85em;
  overflow: auto;
  overflow-x: hidden;
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

input[type=checkbox] {
  display: none;
}

label {
  cursor: pointer;
  font-size: .8em;
  margin-right: 1.92em;
}

svg {
  width: 5em;
}

  .box {
    stroke-dasharray: 320;
    stroke-dashoffset: 0;
  }
  .check {
    stroke-dasharray: 70;
    stroke-dashoffset: 70;
  }

input[type=checkbox]:checked + label .check {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
}

.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: 90%;
}

.jobsDisplay {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px blanchedalmond solid;
}


.submitSchedule {
  position: relative;
  top: .81em;
  font-size: 1.2em;
  border: 1px blanchedalmond solid;
  background: blanchedalmond;
  color: rgb(36, 34, 34);
  padding: .25em 1em;
  border-radius: 4px;
}


@keyframes showActiveRight {
    0% {
      left: -27%;
    }

    50% {
      left: -12%;
    }

    100% {
      left: -27%;
    }
  }

</style>