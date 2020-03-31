<template>
  <div class="container">
    <div class="row" style="margin: 0 auto 0 auto;text-align:center;">
      <div class="col col-12">
        <div v-show="fileUploaded">
          <img ref="uplfile" src="https://www.subsidiegezocht.nl/templates/shared/werkcooperatie-logo-wit.png" style="width:100%;object-fit:cover;max-height:140px;border:2px solid white;border-radius:8px;">
          <button @click="opnieuw()" class="compl_but">Opnieuw</button>
          <button @click="nextStep()" class="compl_but">Akkoord</button>
        </div>
        <div v-if="!fileUploaded">
          <div v-if="fileChanged">
            Een ogenblik geduld aub.
          </div>
          <h5 class="question-header">{{ type }} uploaden</h5>
          <input class="inputfile" type="file" id="file" ref="file" v-on:change="handleFileUpload()">
          <label for="file" style="font-size:inherit;">
            <img src="~assets/icon2.svg" />
          </label>
          <br>
          <progress max="100" :value.prop="uploadPercentage"></progress>
          <br>
          <button @click.prevent="submitFile();" class="compl_but">Uploaden</button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
      name: 'UploadFile',
      data() {
        return {
          fileChanged: false,
          file: null,
          fileUploaded: false,
          uploadPercentage: 0
        }
      },
      props: {
        type: String
      },
      mounted(){
        window.setInterval(()=>{
          if(this.uploadPercentage < 100){this.uploadPercentage ++;}
        }, 50);
      },
      methods: {
        submitFile: function(){
          if (!this.fileChanged) { console.log('no file selected'); return; }
          this.$store.dispatch('submitfileaction', { file: this.file, username: this.$store.state.user.userName, token: this.$store.state.token, type: this.type } )
          .then(() => this.finished(this.file.name))
          .catch(err => console.log(err));
        },
        handleFileUpload(){
          this.fileChanged = true;
          if(this.$refs.file){
            this.file = this.$refs.file.files[0];
          }
        },
        finished: function(name){
          this.$refs.uplfile.src = "https://www.beveilig.nu:3000/files/"+ this.$store.state.user.userName + "/" + name;
          this.fileChanged = false;
          this.file = null;
          this.fileUploaded = true;
        },
        opnieuw(){
          this.fileChanged = false;
          this.file = null;
          this.fileUploaded = false;
          this.$refs.uplfile.src = "";
        },
        nextStep(){
          this.fileChanged = false;
          this.file = null;
          this.fileUploaded = false;
          this.$refs.uplfile.src = "";
          this.$emit('finished');
        }
      }
    }
</script>
<style>
</style>
