<template>
  <div id="appTravel">
    <TheNavigation />
    <transition name="slide" mode="out-in">
      <!-- when same component is being used to update paths, vue router won't notice any change in data in the component unless you use this :key - which listens to the route change and updates the component with data -->
      <router-view :key="$route.path"/>
    </transition>
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation';

export default {
  name: 'TravelApp',

  components: {
    TheNavigation
  }
}
</script>


<style>
#appTravel {
  position: fixed;
  top: 0;
  left: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(212, 208, 208);
  overflow: auto;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity .61s, transform .61s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>
