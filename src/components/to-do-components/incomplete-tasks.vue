<template>
  <div class="list">
    <h3>Incomplete Tasks: </h3>
    <div class="toDoItem" v-for="(item, index) in allTodos" :key="index">
      <div v-if="item.status == 'incomplete' && item.deleted == false">
        <div class="taskContain" v-if="item.saved == true">
          <div class='checkBoxContainer'>
            <input @click='completeTheToDo(item.id, item.description, item.saved)' :id="'task_'+index" type='checkbox'>
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
            <input @click='completeTheToDo(item.id, item.description, item.saved)' :id="'task_'+index" type='checkbox'>
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

  import { axiosHandler } from '../../mixins/axiosHandler';
  import { mapGetters, mapActions } from 'vuex';
  import WarningOverlay from './warning-overlay.vue';
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


    mixins: [axiosHandler],



    computed: {
      ...mapGetters({
            allTodos: 'toDoStore/allTodos'
          })

    },




    methods: {
      ...mapActions({
        callCompleteToDo: 'toDoStore/callCompleteToDo'
      }),

      completeTheToDo: function(id, desc, saved) {
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
          callBack: this.completeTheToDoResponse
        };

        this.sendAxios(payLoadObj, settingsObj);
      },


      completeTheToDoResponse: function(res) {
        console.log(res.data);
        //call the action
        this.callCompleteToDo(res.data);

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


    created: function() {

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

  /* checkmark styles */

  .payroll_colCustomAccess label.payroll_checkBoxContainer , .payroll_employeeReverse label.payroll_checkBoxContainer  {
    display: flex;
    justify-content: center;
    position: relative;
    /* padding-left: 35px; */
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .payroll_addBusinessItem input.payroll_userCustomAccessInput , input.payroll_employeeReversalInput {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  label.payroll_checkBoxContainer .payroll_checkmark {
    position: absolute;
    top: -.15em;
    /* left: 41%; */
    height: 25px;
    width: 25px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin: 0em;
  }

  label.payroll_checkBoxContainer .payroll_checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  label.payroll_checkBoxContainer input:checked ~ .payroll_checkmark {
    border: 1px solid #69c55d;
  }

  label.payroll_checkBoxContainer input:checked ~ .payroll_checkmark:after {
    display: block;
  }

  label.payroll_checkBoxContainer .payroll_checkmark:after {
    left: 8px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid #69c55d;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

</style>