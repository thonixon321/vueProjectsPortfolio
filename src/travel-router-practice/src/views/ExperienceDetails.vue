<template>
  <section>
    <h1>Experiences</h1>
    <h2>{{experience.name}}</h2>
    <div class='experience-details'>
      <img :src='require(`../assets/${experience.image}`)' :alt='experience.name'>
      <p>{{experience.description}}</p>
    </div>
  </section>
</template>

<script>

  import store from '../store.js';

  export default {

    name: '',

    data: function() {
      return{

      }
    },



    computed: {
      destination() {
        return store.destinations.find(
          destination => destination.slug === this.slug
        );
      },
      experience() {
        return this.destination.experiences.find(
          experience => experience.slug === this.experienceSlug
        )
      }
    },



    props: {
      slug: {
        type: String,
        required: true
      },
      experienceSlug: {
        type: String,
        required: true
      }
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
  section {
    max-height: 400px;
    height: auto;
    width: 100%;
  }

  .experience-details {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin: 0 40px;
    font-size: 20px;
    text-align: left;
  }
</style>