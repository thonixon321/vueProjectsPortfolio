<template>
  <div class="loginContainer">
    <transition appear name="grow">
      <h1>Register</h1>
    </transition>
    <transition appear name="slide-down">
      <div class='allInputs'>
        <div class='inputContainer'>
          <label for="firstName">First Name:</label>
          <input v-model="firstName" type='text' id="firstName">
          <p v-show="firstName == '' && attemptSubmit" class='requiredMsg'>*required</p>
        </div>
        <div class='inputContainer'>
          <label for="lastName">Last Name:</label>
          <input v-model="lastName" type='text' id="lastName">
          <p v-show="lastName == '' && attemptSubmit" class='requiredMsg'>*required</p>
        </div>
        <div class='inputContainer'>
          <label for="userName">User Name:</label>
          <input v-model="userName" type='text' id="userName">
          <p v-show="userName == '' && attemptSubmit" class='requiredMsg'>*required</p>
          <p v-show="userNameExists" class='requiredMsg'>User name already exists</p>
        </div>
        <div class='inputContainer'>
          <label for="email">Email:</label>
          <input v-model="email" type='text' id="email">
          <p v-show="email == '' && attemptSubmit" class='requiredMsg'>*required</p>
          <p v-show="emailExists" class='requiredMsg'>Email already exists</p>
        </div>
        <div class='inputContainer'>
          <label for="password">Password:</label>
          <input v-model="password" type='password' id="password">
          <p v-show="password == '' && attemptSubmit" class='requiredMsg'>*required</p>
        </div>
        <div class='inputContainer'>
          <label for="confirmPassword">Confirm Password:</label>
          <input v-model="confirmedPassword" type='password' id="confirmPassword">
          <p v-show="confirmedPassword == '' && attemptSubmit" class='requiredMsg'>*required</p>
          <p v-show="passwordMismatch && attemptSubmit" class='requiredMsg'>Passwords do not match</p>
        </div>
        <div class='inputContainer'>
          <input @click="validateForm" type='submit' id="submitForm" value="Submit">
        </div>
        <router-link class="userLink" to="/volunteer-project"> Already signed up? Login here </router-link>
      </div>
    </transition>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  export default {

    name: 'volunteer-register',

    data: function() {
      return{
        attemptSubmit: false,
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmedPassword: '',
        emailExists: false,
        userNameExists: false
      }
    },



    computed: {
      ...mapGetters({
        volunteers: 'volunteerStore/volunteers',
        dates: 'volunteerStore/dates'
      }),


      passwordMismatch() {
        var bool;

        if (this.password !== this.confirmedPassword && this.confirmedPassword !== ''){
          bool = true;
        }
        else{
          bool = false;
        }

        return bool;
      },


      errorsFound() {
        var inputArr = [
          this.firstName,
          this.lastName,
          this.userName,
          this.email,
          this.password,
          this.confirmedPassword,
        ],
        bool;

        if (inputArr.indexOf('') > -1) {
          bool = true;
        }
        else if (this.password !== this.confirmedPassword){
          bool = true;
        }
        else{
          bool = false;
        }

        return bool;
      }

    },



    props: {

    },



    methods: {
      ...mapActions({
        callAddVolunteer: 'volunteerStore/callAddVolunteer',
        callAddAdmin: 'volunteerStore/callAddAdmin',
        callChangeUserType: 'volunteerStore/callChangeUserType'
      }),


      validateForm() {
        var addUser;
        var self = this;

        this.attemptSubmit = true;

        if(!this.errorsFound && !this.passwordMismatch) {
          addUser = {
            name: this.firstName + ' ' + this.lastName,
            userName: this.userName,
            email: this.email,
            password: this.confirmedPassword
          };
          if (this.volunteers.length) {
            this.userNameExists = false;
            this.emailExists = false;

            this.volunteers.forEach(function(el){
              if(el.userName == addUser.userName) {
                self.userNameExists = true;
              }
              else if (el.email == addUser.email) {
                self.emailExists = true;
              }
            });
            //password regex
            // /(?=.*[(!@#$%^&*()_+=])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.{8,})/
          }

          if (!this.userNameExists && !this.emailExists) {
            //only the user with the username 'yams' will be an admin
            //all others are employees

            if (this.userName == 'yams') {
              this.callChangeUserType('Admin');
              addUser.userType = 'Admin';
              this.callAddAdmin(addUser);
            }
            else{
              addUser.availability = this.dates;
              this.callChangeUserType('Employee');
              addUser.userType = 'Employee';
              this.callAddVolunteer(addUser);
            }
            this.$router.push({name: 'user-profile', params: {userName: this.userName}});
          }
        }

      }
    },



    watch: {

    },



    mounted: function() {

    }
  }

</script>


<style >
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

  .inputContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.3em;
    padding: 1em;
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