<template>
  <div>

    <incomplete-tasks />
    <add-to-do />
    <completed-tasks />
  </div>
</template>

<script>


  import completedTasks from './completed-tasks.vue';
  import incompleteTasks from './incomplete-tasks.vue';
  import addToDo from './add-to-do.vue';

  export default {

    name: 'ToDoList',

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

    },

    created: function() {

    },

    beforeCreate() {
      this.$emit('loadTitle', 'To-Do List');
    },

    components: {
      addToDo,
      completedTasks,
      incompleteTasks
    }


  }

</script>


<style >

.addButton {
  color: blanchedalmond;
  text-decoration: underline;
}

</style>