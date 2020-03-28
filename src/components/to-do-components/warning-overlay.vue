<template>
  <div class="overlayBG">
    <div class='overlayBody' :class="cardShowing ? 'card-enter' : 'card-exit'">
      <div>
        Delete <span>"{{ item.description }}"</span> from list?
      </div>
      <div class="overlayButtonContainer">
        <button aria-label="No" class="overlayCancel" @click='removeOverlay("cancel")'>No</button>
        <button aria-label="Yes" class="overlayConfirm"  @click='removeOverlay("confirm")'>Yes</button>
      </div>
    </div>

  </div>
</template>

<script>

  import { axiosHandler } from "../../mixins/axiosHandler.js";

  export default {

    name: 'WarningOverlay',


    mixins: [axiosHandler],


    data: function() {
      return{
        cardShowing: true
      }
    },



    computed: {

    },



    props: {
      item: Object

    },



    methods: {
      removeOverlay: function(res) {
        var payLoadObj = {},
            settingsObj = {
                            url: 'https://my-json-server.typicode.com/thonixon321/tasksDB/tasks/'+this.item.id+'',
                            method: 'DELETE',
                            callBack: this.removeOverlayResponse
                           };

        if (res == 'confirm') {

          this.sendAxios(payLoadObj, settingsObj);

        }
        this.cardShowing = false;
        this.$emit('closeOverlay');
      },

      removeOverlayResponse: function(res) {
        this.item.deleted = true;
        console.log(res);
      }

    },





    watch: {

    },



    mounted: function() {

    }
  }

</script>


<style scoped>

  .overlayBG {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.74);
    display: flex;
    justify-content: center;
    align-items: center;
  }

    .overlayBody {
      width: auto;
      height: auto;
      color: black;
      transform: scale(0);
      background-color: white;
      border-radius: 3px;
      padding: .85em;
      box-shadow: 0px 0px 20px -4px rgba(0,0,0,0.75);
    }

    .overlayBody button {
      color: black;
      border: 1px solid;
      margin-top: 1em;
    }

    .overlayCancel:hover {
      background: lightcoral;
    }

    .overlayConfirm:hover {
      background: lightgreen;
    }

    .card-enter {
      animation: card-enter .3s .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    }

    .card-exit {
      animation: card-exit .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    }

    .overlayButtonContainer {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

@keyframes card-enter {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes card-exit {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

</style>