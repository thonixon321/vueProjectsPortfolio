<template>
   <div :class="{errorShake: errorShake}" class="loginContainer">
    <transition appear name="grow">
      <h1>Log in</h1>
    </transition>
    <transition appear name="slide-down">
      <div class='allInputs'>
        <div class='inputContainer'>
          <label :for="'userName_login'">User Name:</label>
          <input @focus="error = false"  v-model="userName" type='text' :id="'userName_login'">
        </div>
        <div class='inputContainer'>
          <label :for="'password_login'">Password:</label>
          <input @focus="error = false" v-model="password" type='password' :id="'password_login'">
        </div>
        <div v-show="error" class='inputContainer error'>
          User name and/or password is incorrect
        </div>
        <div class='inputContainer'>
          <input @click="validateLogin" type='submit' :id="'submitForm_login'" value="Submit">
        </div>
        <router-link class="userLink" to="/volunteer-project/register-page">New User? Sign up here!</router-link>
      </div>
    </transition>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {

    name: 'login-page',

    data: function() {
      return{
        attemptSubmit: false,
        userName: '',
        password: '',
        errorShake: false,
        error: false
      }
    },



    computed: {
      ...mapGetters({
        volunteers: 'volunteerStore/volunteers',
        admin: 'volunteerStore/admin'
      })
    },



    props: {

    },



    methods: {
      ...mapActions({
        callChangeUserType: 'volunteerStore/callChangeUserType'
      }),

      validateLogin(){
        var self = this;
        var match = false;
        var userType = '';

        this.attemptSubmit = true;
        //after making sure the username exists and the password is correct
        //(from local storage), send the user to their profile page and pass
        //in their username as a query param to be accessed by the profile component -
        //which will then use that to build their unique profile

        this.admin.forEach(function(el){
          if (el.userName == self.userName && el.password == self.password) {
              //make sure the store updates the user type
              self.callChangeUserType(el.userType);
              self.$router.push({name: 'user-profile', params: {userName: self.userName}});
              return;
          }
        });

        this.volunteers.forEach(function(el){
          if (el.userName == self.userName && el.password == self.password) {
              //make sure the store updates the user type
              userType = el.userType;
              match = true;
          }
        });

        if (match) {
           this.callChangeUserType(userType);
           this.$router.push({name: 'user-profile', params: {userName: self.userName}});
        }
        else{
           this.errorShake = true;
           this.error = true;
           setTimeout(function(){
              self.errorShake = false;
            }, 300);
        }

      }

    },



    watch: {

    },



    mounted: function() {

    }
  }

</script>


<style>
h1 {
  text-decoration: blanchedalmond;
}

.grow-enter-active {
  animation: grow 1s forwards;
}

.slide-down-enter {
  opacity: 0;
}

.slide-down-enter-active {
  animation: slideDown 1s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
}

.userLink {
  padding: 1em;
  color: powderblue;
}

 .loginContainer {
   display: flex;
   flex-direction: column;
 }

  .allInputs {
    position: relative;
  }

  .inputContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.3em;
    padding: 1em;
  }

  .inputContainer.error {
    font-size: .98em;
    position: absolute;
    left: -3em;
    bottom: 3.3em;
    white-space: nowrap;
    color: crimson;
  }

    label {
      margin-right: 1.2em;
    }

    input[type=submit] {
      cursor: pointer;
    }

    .requiredMsg {
      position: absolute;
      top: 2.63em;
      color: crimson;
    }

  .errorShake {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

@keyframes grow {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-70em);
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0em);
  }
}
</style>