<template>
  <div class="profileContainer">
    <div class="profileHeader">
      <img src='../../assets/profileAvatar.png' alt='avatar'>
      <div class="userNameEmployee">Hello {{ userName }}!</div>
      <router-link class="logoutLink" :to="{name: 'volunteer-login'}">Log out</router-link>
    </div>

    <transition name="appear" mode="out-in">
      <admin-profile @savedChanges="savedChanges" :userName="userName" v-if="userType == 'Admin' && !saved" />
      <employee-profile @savedChanges="savedChanges" :userName="userName" v-else-if="!saved"/>
      <div class="savedChanges" v-else>Changes Saved!</div>
    </transition>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import adminProfile from './profile-types/admin-profile';
  import employeeProfile from './profile-types/employee-profile';

  export default {

    name: 'User-Profile',

    data: function() {
      return{
        saved: false
      }
    },



    computed: {
      ...mapGetters({
        userType: 'volunteerStore/userType'
      })
    },



    props: {
      userName: {
        type: String,
        required: true
      }
    },



    methods: {
      savedChanges() {
        var self = this;

        this.saved = true;

        setTimeout(function(){
          self.$router.push({name: 'volunteer-login'});
          self.saved = false;
        }, 2000);

      }
    },



    watch: {

    },



    mounted: function() {

    },

    components: {
      adminProfile,
      employeeProfile
    }
  }

</script>


<style scoped>
  .profileContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }
  .profileHeader {
    position: absolute;
    top: 10%;
    left: 0.75%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    font-size: 1.5em;
    width: 100%;
  }

  .savedChanges {
    position: relative;
    top: 43%;
    left: 44%;
    font-size: 2em;
  }

  .logoutLink {
    position: absolute;
    right: 6%;
    cursor: pointer;
    z-index: 2;
  }

  img {
    border-radius: 50%;
    margin-right: 1em;
  }

  .appear-enter-active {
    animation: appear .5s forwards;
  }

  .appear-leave-active {
    animation: appear .5s reverse;
  }



  @keyframes appear {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>