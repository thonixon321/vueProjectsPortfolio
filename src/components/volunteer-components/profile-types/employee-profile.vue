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
      <transition name="slideLeft" mode="out-in">

        <div v-show="weekShow == 1" class='weekContainer weekContainer_1'>
          <div class='workDayCard' v-for="(card, index) in userInfo.availability.week_1" :key="index">
            <h3>{{daysOfWeek[index]}} - {{card.day}}</h3>
            <hr>
            <div class='cardContent'>
              <div class='inner'>
                <input v-model="card.availability.checked" type='checkbox' :name='`cb_${index}`' :id='`cb_${index}`'>
                <label :for='`cb_${index}`'>
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
              <div class='inner'>
                <input v-model="card.availability.checked" type='checkbox' :name='`cb_${card.day}`' :id='`cb_${card.day}`'>
                <label :for='`cb_${card.day}`'>
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
              <div class='inner'>
                <input v-model="card.availability.checked" type='checkbox' :name='`cb_${card.day}`' :id='`cb_${card.day}`'>
                <label :for='`cb_${card.day}`'>
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
            </div>
          </div>
        </div>

      </transition>
      <button @click="updateAvailability()" class='submitSchedule'>Submit</button>
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
        volunteers: this.$store.state.volunteerStore.volunteers,
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
        this.callUpdateAvailability(this.userInfo);

        this.$emit('savedChanges');

      }

    },



    watch: {

    },



    mounted: function() {
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
  width: 100%;
  height: 47%;
  top: 24%;
  left: 0%;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.weekContainer {
  display: flex;
  position: absolute;
  top: 5.26em;
  left: 2%;
  width: 100%;
}
.workDayCard {
  display: flex;
  flex-direction: column;
  border: 1px blanchedalmond solid;
  padding: 1em;
  margin: 1em;
  height: 20em;
  width: 12%;
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

input[type=checkbox] {
  display: none;
}

label {
  cursor: pointer;
  font-size: .8em;
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

.submitSchedule {
  position: relative;
  top: 19em;
  font-size: 1.2em;
  border: 1px blanchedalmond solid;
  padding: .5em 1em;
}

.submitSchedule:hover {
  background: blanchedalmond;
  color: rgb(36, 34, 34);
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