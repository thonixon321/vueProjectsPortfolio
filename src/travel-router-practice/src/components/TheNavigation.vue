<template>
  <nav id="nav">
    <p class='logo'>Travel App</p>
    <ul class='nav-links'>
      <li class='links'>
        <router-link to="/travel-app">Home</router-link> |
      </li>
      <li v-for="destination in destinations" :key="destination.name" class='links'>
        <router-link :to="{
          name: 'destination-details',
          params: {slug: destination.slug}
        }">
          {{destination.name}}
        </router-link>
      </li>
    </ul>

  </nav>
</template>

<script>

  import store from '../store.js';

  export default {

    name: '',

    data: function() {
      return{
        destinations: store.destinations
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 10px;
  text-decoration: none;
  font-weight: bold;
}

#nav a.tom-exact-active {
  color: purple;
}

.nav-links {
  display: flex;
}

.links{
  padding-right: 20px;
  list-style: none;
}

.links:hover {
  text-decoration: underline;
}

.logo {
   font-size: 20px;
   color: purple;
   font-weight: bold;
}

</style>