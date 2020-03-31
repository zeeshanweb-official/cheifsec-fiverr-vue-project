<template>
<div>
  <PrivacyStatement v-if="showPrivacy" @read="showPrivacy = false"></PrivacyStatement>
  <div class="tabs help-tabs">
    <ul style="background:white;padding:16px;border-radius:8px 8px 0 0;list-style: none;">
      <div class="row">
        <div class="col col-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
          <li :class="[ activeTab === 'register' ? 'is-active' : '']">
            <a @click="activeTab='register'">
              <svg class="register-icon">
                <use xlink:href="~/static/svg-icons/icons.svg#olymp-register-icon"></use>
              </svg>
              <span style="color:#ff5e3a;">MELD AAN</span>
            </a>
          </li>
        </div>
        <div class="col col-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
          <li :class="[ activeTab === 'login' ? 'is-active' : '']">
            <a @click="activeTab='login'">
              <svg class="login-icon">
                <use xlink:href="~/static/svg-icons/icons.svg#olymp-login-icon"></use>
              </svg>
              <span style="color:#ff5e3a;">LOG IN</span>
            </a>
          </li>
        </div>
      </div>
      </ul>

      <div class="box help-content">
          <div v-if="activeTab ==='register'">
              <form @submit.prevent="register" class="content">
                  <div class="row">

                      <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="inputContainer login">
                              <input v-model="registerData.first_name" class="animated-input-text anime" placeholder="Voornaam" type="text">
                          </div>
                      </div>
                      <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="inputContainer login">
                              <input v-model="registerData.last_name" class="animated-input-text anime" placeholder="Achternaam" type="text">
                          </div>
                      </div>

                      <div class="col col-6 col-xl-6 col-lg-6 col-md-6 col-sm-6" style="margin: 0 0 16px 0;">
                        <div class="tabs help-tabs" v-if="registerData.first_name.length>0 && registerData.last_name.length>0">
                          <button @click="isFemale = false;" v-bind:style='{"background-color" : (isFemale? "white" : "#ff5e3a" ), "color" : (isFemale? "#ff5e3a" : "white" ), "border-color" : (isFemale? "#ff5e3a" : "white" )}' style="font-size:1.2em;width:100%;height:42px;border-radius: 6px;">
                            Man
                          </button>
                        </div>
                      </div>

                      <div class="col col-6 col-xl-6 col-lg-6 col-md-6 col-sm-6" style="margin: 0 0 16px 0;">
                        <div class="tabs help-tabs" v-if="registerData.first_name.length>0 && registerData.last_name.length>0">
                        <button @click="isFemale = true;" v-bind:style='{"background-color" : (isFemale? "#ff5e3a" : "white" ), "color" : (isFemale? "white" : "#ff5e3a" ), "border-color" : (isFemale? "white" : "#ff5e3a" )}' style="font-size:1.2em;width:100%;height:42px;border-radius: 6px;">
                          Vrouw
                        </button>
                        </div>
                      </div>

                      <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="inputContainer login" v-if="registerData.first_name.length>0 && registerData.last_name.length>0">
                              <RegisterLoading class="foutje" style="background:white;" v-show="((userfree == 1) && (registerData.user_name.length >0))"></RegisterLoading>
                              <div v-show="(userfree == 2)" class="foutje">&times;</div>
                              <div v-show="(userfree == 3)" style="background:lightgreen;" class="foutje">&#10003;</div>
                              <input v-model="registerData.user_name" class="animated-input-text anime" placeholder="Gebruikersnaam" type="text" @keyup='checkUsername()'>
                          </div>
                      </div>
                      <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="inputContainer login" v-if="registerData.first_name.length>0 && registerData.last_name.length>0">
                              <RegisterLoading class="foutje" style="background:white;" v-show="((emailfree == 1) && (registerData.email.length >0))"></RegisterLoading>
                              <div v-show="(emailfree == 2)" class="foutje">&times;</div>
                              <div v-show="(emailfree == 3)" style="background:lightgreen;" class="foutje">&#10003;</div>
                              <input v-model="registerData.email" class="animated-input-text anime" placeholder="Email Adres" type="email" @keyup='checkEmail()'>
                          </div>
                          <div class="inputContainer login" v-if="registerData.first_name && registerData.last_name">
                              <input id="pw" v-model="registerData.password" class="animated-input-text anime" placeholder="Wachtwoord" type="password">
                          </div>
                          <div  class="inputContainer login" v-if="registerData.first_name && registerData.last_name && registerData.password">
                              <input v-model="registerData.passcon" class="animated-input-text anime" placeholder="Wachtwoord Herhalen" type="password" data-match="#pw">
                          </div>


                          <div class="remember" style="width:100%;" v-if="registerData.first_name.length>0 && registerData.last_name.length>0">
                              <div class="checkbox">
                                  <input style="width: 21px; position: absolute; margin: 0px;"
                                  type="checkbox" id="Chief" value="chief" v-model="registerData.rules">
                                  <label for="Chief" style="padding: 1px 0 0 30px; color:black; font-size: 1rem;">Ik ben akkoord met de <a @click="showPrivacy = true;" style="color:#ff5e3a;cursor:pointer;">Privacy Verklaring</a></label>
                              </div>
                          </div>
                          <button type="submit" class="btn btn-lg btn-primary full-width">REGISTREER</button>
                      </div>
                  </div>
              </form>
          </div>


          <div v-if="activeTab ==='login'">
              <form class="content" @submit.prevent="login">
                  <div class="row">
                      <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div class="inputContainer login">
                              <input class="animated-input-text anime" placeholder="Email adres" type="email" v-model="loginData.email">
                          </div>
                          <div class="inputContainer login">
                              <input class="animated-input-text anime" placeholder="Wachtwoord" type="password" v-model="loginData.password">
                          </div>

                          <div class="remember" v-if="(loginData.password.length>0) && (this.emailReg.test(this.loginData.email))">
                              <div class="checkbox">
                                  <label style="color:black;">
                                      <input name="optionsCheckboxes" type="checkbox">
                                      Onthoud mij!
                                  </label>
                              </div>
                              <a href="#" class="forgot">Wachtwoord vergeten?</a>
                          </div>

                          <button type="submit" class="btn btn-lg btn-primary full-width" style="margin-top: 16px;">LOG IN</button>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  </div>
</div>
</template>


<script>
  import axios from 'axios';
  import RegisterLoading from '~/components/registerLoading';
  import PrivacyStatement from '~/components/privacy';
  export default {
    components:{
      RegisterLoading,
      PrivacyStatement
    },
    data () {
      return {
        showPrivacy: false,
        isFemale: false,
        userfree: 0,
        emailfree: 0,
        emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        activeTab: 'register',
        loginData: {
            email: '',
            password: ''
        },
        submittedLogin: false,
        registerData: {
            first_name: '',
            last_name: '',
            user_name: '',
            email: '',
            password: ''
        },
        submittedRegister: false,
      }
    },
    methods: {
      checkUsername: function(){
        var timeout, self = this;
        this.userfree=1;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
           var username = this.registerData.user_name.trim().toLowerCase();
           if(username != ''){
            axios.post( 'https://www.beveilig.nu:3000/users/userfree/'+username, { } )
            .then(function (response) {
              if(response.data.status == 0){
                  self.userfree = 3
                  }
              else{
                  self.userfree = 2
                  }
            })
            .catch(function (error) {
              console.log(error);
            });
            }else{
            }

          }, 1000);
      },

      checkEmail: function(){
      if(this.emailReg.test(this.registerData.email) && (this.userfree == 3)) {
        var timeout, self = this;
        this.emailfree=1;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
           var emailx = this.registerData.email.trim().toLowerCase();
           if(emailx != ''){
            axios.post( 'https://www.beveilig.nu:3000/users/emailfree/'+emailx, { } )
            .then(function (response) {
              if(response.data.status == 0){
                  self.emailfree = 3
                  }
              else{
                  self.emailfree = 2
                  }
            })
            .catch(function (error) {
              console.log(error);
            });
            }else{
            }

          }, 1000);
        } else
          {
              this.emailfree = 0;
          }
      },

      register: function () {
      if((this.userfree == 3) && (this.emailfree == 3) && (this.registerData.password === this.registerData.passcon) && this.registerData.rules == true){
          let data = {
            isFemale: this.isFemale,
            firstName: this.registerData.first_name,
            lastName: this.registerData.last_name,
            userName: this.registerData.user_name.toLowerCase(),
            email: this.registerData.email.toLowerCase(),
            password: this.registerData.password,
          }
          this.$store.dispatch('register', data)
          .then(() => this.$router.push('/checkmail'))
          .catch(err => console.log(err))
        }
      },

      login: function () {
        let email = this.loginData.email.toLowerCase();
        let password = this.loginData.password;
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/me'))
       .catch(err => console.log(err))
      }

    }
  }
</script>

<style scoped>
.full-width{
  width:100%;
}

svg{
  width: 22px;
}

.klok{
    background:transparent !important;
}
.foutje{
    position:absolute;
    top:18px;
    right:30px;
    line-height:20px;
    color:white;
    width:20px;
    height:20px;
    border-radius:20px;
    background-color:#f92552;
    text-align: center;
}

.register-icon{
  fill:rgb(255,94,58);
  margin: -12px 8px -8px 0 !important;
  height: 20px;
}

.login-icon{
  fill:rgb(255,94,58);
  margin: -12px 8px -8px 0 !important;
  height: 20px;
}
.help-content {
    border-radius:0 0 8px 8px;
    margin-top:-16px;
    background: white;
    padding: 20px 16px 16px 16px;
}

.help-tabs {

}
.tabs li.is-active a {
    margin-top: -1px;
    border-radius: 6px;
    border: 2px solid #ff5e3a;
    fill: #ff5e3a;
    color: #ff5e3a;
    font-weight: bold;
}
.tabs li a {
    width:100%;
    float:left;
    text-align:center;
    line-height:56px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
}
check{
    fill: #ff5e3a;
    background-color: #fff;
    border-right: 2px solid #e6ecf5;
    height: 72px;
    width: 50%;
    float: left;
    text-align: center;
    line-height: 72px;
}
</style>
