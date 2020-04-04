<template>
  <div id="notFound">
    <h1>Not Found</h1>
    <p>Oops, that page was not found. Try going
      <router-link :to="{name: 'home'}">here</router-link>
    </p>
  </div>
</template>

<script>

  //import componentName from './components/componenet-name.vue';

  export default {

    name: '',

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
  #notFound {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>