<template>
  <span class="go-back">
    <button @click="goBack">
      go back
    </button>
  </span>
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
      //tells the router to go back one route
      goBack() {
        //-1 to go back 1 route
        return this.$router.go(-1);
      }
    },



    watch: {

    },



    mounted: function() {

    }
  }

</script>


<style scoped>
  .go-back {
    display: flex;
    cursor: pointer;
  }

  button {
    border: 0;
  }
</style>