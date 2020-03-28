<template>
  <div>
    <div class="volunteerHomeContainer">
      <transition appear name="grow">
        <h1>Which one are you?</h1>
      </transition>
      <transition appear name="slide-down">
        <div>
          <button class="userType">Admin User</button>
          <button class="userType">Employee User</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>


  export default {

    name: 'Volunteer Project',

    data: function() {
      return{

      }
    },



    computed: {

    },



    props: {

    },



    methods: {


    },



    watch: {

    },



    mounted: function() {

    }
  }

</script>


<style scoped>


.volunteerHomeContainer {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  text-decoration: blanchedalmond;
}

.grow-enter-active {
  animation: grow 1s forwards;
}

.slide-down-enter {
  opacity: 0;
}

.slide-down-enter-active {
  animation: slideDown 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
}



@keyframes grow {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-70em);
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0em);
  }
}

</style>