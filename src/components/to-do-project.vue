<template>
  <div id='to-do-project'>
    <div class='navAndAddContain'>
      <router-link class="nav todoListNav" to="/to-do-project">
        <span v-if="header == 'To-Do List'" class="activeArrow"></span>
        <span class="navTitle">To-Do List</span>
      </router-link>
      <router-link class="nav listHistoryNav" to="/listHistory">
        <span v-if="header == 'List History'" class="activeArrow"></span>
        <span class="navTitle">List History</span>
      </router-link>

    </div>

    <div class='viewAndTitleContain'>
      <h1>{{ header }}</h1>
      <hr>

      <transition name="bounce">
        <router-view  @loadTitle='changeTitle'>

        </router-view>
      </transition>
    </div>

    <div class='clearStorageContain'>
      <a href='#' @click="clearStorage">Clear Local Storage</a>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { axiosHandler } from '../mixins/axiosHandler';
  import toDoStore from '../store/modules/toDoMod';

  export default {

    name: 'to-do-project',

    mixins: [axiosHandler],

    data: function() {
      return {
        createToDo: false,
        header: 'To-Do List'
      }
    },

    computed: {
      ...mapGetters({
        allTodos: 'toDoStore/allTodos'
      })

    },


    methods: {
      registerStores() {
        this.$store.registerModule('toDoStore', toDoStore);
      },

      ...mapActions({
        callAddToDo: 'toDoStore/callAddToDo'
      }),

      changeTitle: function(passedTitle) {
        this.header = passedTitle;
      },

      clearStorage: function() {
        window.localStorage.clear();

      },

      fetchTodos: function() {
        var settingsObj = {
            url: 'https://my-json-server.typicode.com/thonixon321/tasksDB/tasks',
            method: 'GET',
            callBack: this.fetchTodosResponse
          };

          this.sendAxios({}, settingsObj);
        },

      fetchTodosResponse: function(res) {
        console.log(res.data);

        for (var i=0; i < res.data.length; i++) {
          this.callAddToDo(res.data[i]);
        }

      },



    },



    created: function() {
      this.registerStores();
      console.log(this.$store);
      //don't want to keep adding the todos from the database
      //if they are already in local storage
      if(this.allTodos.length == 0) {
        this.fetchTodos();
      }
    },

    components: {

    }
  }

</script>


<style scoped>
#to-do-project {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: rgb(36, 34, 34);
  color: blanchedalmond;
}

svg.edit:hover {
  background: rgb(11, 80, 145);
  border-radius: 5px;
}

svg.trash:hover {
  background: lightcoral;
  border-radius: 5px;
}

.clearStorageContain a {
  color:blanchedalmond;
  margin-left: 5em;
}

.nav.router-link-exact-active .navTitle {
  background: rgb(11, 80, 145);
}

.navTitle {
  padding: 1em 2em;
  width: 100%;
}

.navTitle:hover {
  background: rgb(11, 80, 145);
}

  .navAndAddContain a {
    margin-top: 1em;
  }

  .navAndAddContain button {
    position: relative;
    display: flex;
    color: blanchedalmond;
    text-decoration: none;
    margin-top: .95em;

  }

.viewAndTitleContain {
  margin-left: 5em;
  width: 22em;
  height: 21em;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

  .toDoItem {
    display: flex;
  }

  div.buttonContainer {
    margin-top: .29em;
  }

  .addToDoContainer {
    height: 2em;
    display: flex;
    align-items: center;
  }

  .nav {
    position: relative;
    display: flex;
    color: blanchedalmond;
    text-decoration: none;
    margin-top: .25em;
    margin-left: 3em;
    border: 1px solid blanchedalmond;
  }

  .bounce-enter-active {
    animation: bounce .3s .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }

  .bounce-leave-active {
    animation: bounce .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse;
  }

  .bounce-enter-to {
    transform: scale(1);
  }

    .activeArrow {
      position: absolute;
      top: 23%;
      left: -24%;
      width: 1.42em;
      height: 1.42em;
      background: transparent;
      border-top: 7px solid #42b883;
      border-right: 7px solid #42b883;
      border-left: transparent;
      border-bottom: transparent;
      border-radius: 15%;
      border-style: double;
      transform: rotate(45deg);
      animation: showActive 1s cubic-bezier(.17,.67,.83,.67) infinite forwards;
    }



@keyframes showActive {
    0% {
      left: -27%;
    }

    50% {
      left: -12%;
    }

    100% {
      left: -27%;
    }
  }


</style>