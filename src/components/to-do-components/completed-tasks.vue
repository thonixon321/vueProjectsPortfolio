<template>
  <div class="list">
    <h3>Complete Tasks: </h3>
    <div class="toDoItem" v-for="(item, index) in allTodos" :key="index">
      <div v-if="item.status == 'complete' && item.deleted == false">
        <div class="taskContain" v-if="item.saved == true">
          <div class='checkBoxContainer'>
            <input @click='callIncompleteToDo(item)' :id="'task_'+index" type='checkbox' checked>
          </div>
          <div class='labelContainer'>
            <label :for="'task_'+index">{{ item.description }}</label>
          </div>
          <div class='buttonContainer'>
            <button @click="item.saved = false">
              <edit-icon />
            </button>
            <button @click="openIt(item)">
              <delete-icon />
            </button>
          </div>
        </div>
        <div class="taskContain" v-else-if="item.deleted == false">
          <div class='checkBoxContainer'>
            <input @click='callIncompleteToDo(item)' :id="'task_'+index" type='checkbox' checked>
          </div>
          <div class='labelContainer'>
            <input type='text' v-model="item.description">
          </div>
          <div class='buttonContainer'>
            <button @click="item.saved = true">
              <save-icon />
            </button>
            <button @click="openIt(item)">
              <delete-icon />
            </button>
          </div>
        </div>
      </div>
    </div>
    <warning-overlay @closeOverlay='closeIt' v-if="openOverlay" :item='selectedItem' />
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import WarningOverlay from './warning-overlay.vue'
  import EditIcon from '../../assets/editIcon.vue';
  import DeleteIcon from '../../assets/deleteIcon.vue';
  import SaveIcon from '../../assets/saveIcon.vue';

  export default {

    name: 'Completed',

    data: function() {
      return{
        openOverlay: false,
        overlayType: '',
        selectedItem: {}
      }
    },



    computed: {
      ...mapGetters({
            allTodos: 'toDoStore/allTodos'
      })
    },



    props: {

    },



    methods: {
      ...mapActions({
        callIncompleteToDo: 'toDoStore/callIncompleteToDo'
      }),


       incompleteTheToDo: function(id, desc, saved) {
        var payLoadObj = {
          id: id,
          deleted: false,
          description: desc,
          saved: saved,
          status: "complete"
        },
        settingsObj = {
          url: 'https://my-json-server.typicode.com/thonixon321/tasksDB/tasks/'+id+'',
          method: 'PUT',
          callBack: this.incompleteTheToDoResponse
        };

        this.sendAxios(payLoadObj, settingsObj);
      },


      incompleteTheToDoResponse: function(res) {
        console.log(res.data);
        //call the action
        this.callIncompleteToDo(res.data);

      },

      openIt: function(item) {

        this.openOverlay = true;
        this.selectedItem = item;

      },

      closeIt: function() {
        var self = this;

        setTimeout(function(){
          self.openOverlay = false;
        }, 200);
      }

    },



    watch: {

    },



    mounted: function() {

    },

    components: {
      EditIcon,
      DeleteIcon,
      SaveIcon,
      WarningOverlay
    }
  }

</script>


<style scoped>
  button {
    background: transparent;
  }

  .taskContain {
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin-left: .61em;
  }

  .labelContainer {
    width: 12em;
  }

  .labelContainer label {
    width: 11em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
</style>