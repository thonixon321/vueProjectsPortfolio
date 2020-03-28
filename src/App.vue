<template>
  <div id="app">

    <transition name="slideIn">
      <div v-if="sideBarActive" class='side-drawer'>
        <div @click="sideBarActive=false" class="closeIcon">
          <div class='line'></div>
          <div class='line'></div>
        </div>
        <router-link
        @click.native="sideBarActive=false; notHome=false"
        class="navMain todoListNav"
        to="/">
          Home
        </router-link>
        <router-link
        @click.native="sideBarActive=false; notHome=true"
        class="navMain todoListNav"
        to="/to-do-project">
          To-Do-List
        </router-link>
        <router-link
        @click.native="sideBarActive=false; notHome=true"
        class="navMain volunteerScheduleNav"
        to="/volunteer-project">
          Volunteer Schedule
        </router-link>
      </div>
    </transition>

    <div @click="sideBarActive=true" class="hamburgerIcon">
      <div class='line'></div>
      <div class='line'></div>
      <div class='line'></div>
    </div>

    <div class='homeContainer' :class="{hidden: notHome}">

      <div v-show="c2" class='circle c2'>
        <div v-show="c3" class='circle c3'>
          <div v-show="c4" class='circle c4'>
            <div v-show="c5" class='circle c5'>
              <div v-show="c6" class='circle c6'>
                <div v-show="c7" class='circle c7'>
                  <div v-show="c8" class='circle c8'>
                    <div v-show="c9" class='circle c9'>
                      <img class="vueTitle_1" src='./assets/vueProjectTitleNew.png' alt='Vue Projects'>
                      <img class="Thomas" src='./assets/me.png' alt='Thomas Nixon'>
                      <img class="vueTitle_2" src='./assets/vueProjectTitleNew2.png' alt='Author Thomas Nixon'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <transition name="fade">
      <router-view class="router-view">

      </router-view>
    </transition>

  </div>
</template>

<script>


export default {
  name: 'app',

  data: function() {
    return {
      sideBarActive: false,
      notHome: false,
      c2: true,
      c3: true,
      c4: false,
      c5: false,
      c6: false,
      c7: false,
      c8: false,
      c9: false,
    }
  },

  computed: {

  },


  methods: {

  },

  mounted() {
    var self = this;


    setTimeout(function(){
      self.c4 = true;
    }, 600);
    setTimeout(function(){
      self.c5 = true;
    }, 900);
    setTimeout(function(){
      self.c6 = true;
    }, 1200);
    setTimeout(function(){
      self.c7 = true;
    }, 1500);
    setTimeout(function(){
      self.c8 = true;
    }, 1800);
    setTimeout(function(){
      self.c9 = true;
    }, 2100);

  },


  created: function() {

  },



  components: {

  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

html {
  background: rgb(36, 34, 34);
}

body {
  margin: 0;
  padding: 0;
}


img.Thomas {
  position: relative;
  top: 3.7em;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  transform: scale(1.5);
}

img.vueTitle_1 {
  position: relative;
  top: 1em;
  left: -3em;
  transform: scale(1.25);
}

img.vueTitle_2 {
  position: relative;
  top: -1em;
  left: 1em;
}

.circle {
  border: 1px rgba(255, 255, 255, 0.062) solid;
  border-radius: 50%;
  background: radial-gradient(transparent, black, rgb(211, 209, 209));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

  .c2 {
    width: 140em;
    height: 140em;
  }
  .c3 {
    width: 120em;
    height: 120em;
  }
  .c4 {
    width: 90em;
    height: 90em;
    animation: bounce .3s  cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  .c5 {
    width: 80em;
    height: 80em;
    animation: bounce .3s  cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  .c6 {
    width: 60em;
    height: 60em;
    animation: bounce .3s  cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  .c7 {
    width: 50em;
    height: 50em;
    animation: bounce .3s  cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  .c8 {
    width: 30em;
    height: 30em;
    animation: bounce .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  .c9 {
    width: 10em;
    height: 10em;
    background: transparent;
    border: none;
    animation: bounce .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: blanchedalmond;
  position: fixed;
  height: 100%;
  width: 100%;
}

  .homeContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80%;
    width: inherit;
  }

  .homeContainer.hidden {
    display: none;
  }

  .router-view {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 4em;
    left: 0;
    background:rgb(36, 34, 34);
    z-index: 3;
  }

 .side-drawer {
    position: fixed;
    top: 0;
    background-color: rgb(31, 35, 83);
    width: 20%;
    height: 100%;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
 }

 .navMain {
    width: 60%;
    height: 2em;
    position: relative;
    display: flex;
    color: blanchedalmond;
    text-decoration: none;
    margin-top: .25em;
    margin-left: 1em;
    border-bottom: 1px solid blanchedalmond;
  }

  .hamburgerIcon {
    width: 3em;
    height: 3em;
    border:blanchedalmond 1px solid;
    margin: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 4;
  }

  .closeIcon {
    position: absolute;
    width: 100%;
    margin: 1em;
    cursor: pointer;
    right: 0em;
    top: 1%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .hamburgerIcon .line {
    width: 70%;
    height: .2em;
    background-color: blanchedalmond;
    margin: .23em;
  }

  .closeIcon .line {
    position: absolute;
    width: 1.62em;
    height: .29em;
    border-radius: 5px;
    background-color: blanchedalmond;
  }

  .closeIcon .line:first-child {
    transform: rotate(45deg);
  }

  .closeIcon .line:last-child{
    transform: rotate(-45deg);
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: blanchedalmond;
  }

  .buttonContainer,
  .checkBoxContainer,
  .labelContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5em
  }

  .slideIn-enter-active {
    right: 20em;
    animation: slide .5s forwards;
  }

  .slideIn-leave-active {
    right: 20em;
    animation: slide .5s reverse;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  @keyframes slide {
    from {
      left: -100%;
    }

    to {
      left: 0%;
    }

  }

  @keyframes bounce {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }


</style>
