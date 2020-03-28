<template>
  <div class='table'>
    <div class='listItemsHeaderRow row'>
      <div class='titleCol'>Title</div>
      <div class='statusCol'>Status</div>
      <div class='deleteCol'>Deleted?</div>
    </div>
    <div class='listItemsContainer'>
      <div v-for="(item, index) in allTodos" :key="index" class='row itemRow'>
        <div class='titleCol'>{{ item.description }}</div>
        <div class='statusCol'>{{ item.status }}</div>
        <div class='deleteCol'>{{ item.deleted }}</div>
      </div>

    </div>

  </div>
</template>

<script>

  import { mapGetters } from 'vuex';

  export default {

    name: '',

    data: function() {
      return{

      }
    },



    computed: {

      ...mapGetters({
        allTodos: 'allTodos'
      })

    },



    props: {

    },



    methods: {

    },



    watch: {

    },



    mounted: function() {

    },


    created: function() {

    },


    beforeCreate() {
      this.$emit('loadTitle', 'List History');
    },
  }

</script>


<style scoped>
.table {
  width: 23em;
}

.listItemsHeaderRow  {
  background: rgba(247, 247, 224, 0.493);
}
  .row {
    display: flex;
  }

    .titleCol {
      width: 40%;
    }

    .statusCol {
      width: 30%;
    }

    .deleteCol {
      width: 30%;
    }

</style>