<template>
  <div class="addToDoContainer">
    <button v-if="addToDo ==  false" class="addButton" @click="addToDo = true">+ Add Task</button>

    <input v-model="toDoItem" placeholder="do dishes" v-if="addToDo" type='text'>
    <button v-if="addToDo" @click="updateTasks">Submit</button>
    <button v-if="addToDo" @click="addToDo = false">Cancel</button>

  </div>
</template>

<script>
import { axiosHandler } from '../../mixins/axiosHandler';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddToDo',
  mixins: [axiosHandler],
  data: function () {

    return {
      addToDo: false,
      toDoItem: '',
      idIteration: 0
    }

  },

  computed: {

    ...mapGetters({
      allTodos: 'toDoStore/allTodos'
    })

  },



  methods: {
     ...mapActions({
      callAddToDo: 'toDoStore/callAddToDo'
    }),

    updateTasks: function () {
      var idNum = parseFloat(this.allTodos.length);

     if (this.toDoItem !== '') {
        this.idIteration = idNum+=2;
        var payLoadObj = {
            id: this.idIteration,
            deleted: false,
            description: this.toDoItem,
            saved: true,
            status: "incomplete"
          },
        settingsObj = {
          url: 'https://my-json-server.typicode.com/thonixon321/tasksDB/tasks',
          method: 'POST',
          callBack: this.updateTasksResponse
        };

        this.sendAxios(payLoadObj, settingsObj);

     }
    this.addToDo = false;

    },

    updateTasksResponse: function(res) {
      //call action
      console.log(res.data);
      this.callAddToDo(res.data);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addButton {
  padding: 1em;
}

</style>
