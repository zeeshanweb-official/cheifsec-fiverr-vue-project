<template>
  <div>
    <div class="content-bg-wrap"></div>
    <Logo></Logo>
    <form-wizard style="color:#ffffff;max-width:440px;margin:auto;" v-if="$store.state.user.userName" @on-complete="onComplete"
                         shape="tab"
                         color="#9b59b6"
                         back-button-text="Vorige"
                         next-button-text="Volgende"
                         finish-button-text="Verzenden"
                         >
      <h4 slot="title"></h4>
      <div class="container" v-if="step == 3">
        <div class="row">
          <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" style="margin:auto;">
            <div v-if="opleiding.length > 0 && saved.opl" style="height:120px;">Soort profiel:<br><b>{{ opleiding }}</b></div>
          </div>

          <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" style="margin:auto;">
            <div v-if="completionData.adres.length > 0" style="height:120px;">Adres: <br><b>{{ completionData.adres }} {{ completionData.nr }}</b>
              <div v-if="completionData.postcode.length > 3">
                <b>{{ completionData.postcode }}, {{ completionData.stad }}</b>
              </div>
            </div>
          </div>
        </div>

      </div>
      <tab-content title="Adres"
                    icon="ti-user" :before-change="beforeTabSwitch">
        <div v-if="step == 0">
          <p>
            Bedankt {{ $store.state.user.firstName }}, je activatie is gelukt.
            Om je profiel compleet te maken dien je een aantal gegevens in te vullen.
            We beginnen met je adres. Zoals je in de Privacy Verklaring hebt gelezen
            worden je NAW gegeven gebruikt om vast te stellen wie onze gebruikers daadwerkelijk zijn.
            Dit is een maatregel die getroffen is om misbruik van het systeem tegen te gaan.
          </p>
          <div @click="mutate">Mutate</div>
          <input class="animated-input-text anime" v-model="completionData.adres" placeholder="Adres" style="width:75%;margin-right:20px;float:left"><input class="animated-input-text anime" v-model="completionData.nr" placeholder="Huisnr" style="width:calc(25% - 20px);">
          <input class="animated-input-text anime" v-model="completionData.postcode" placeholder="Postcode">
          <input class="animated-input-text anime" v-model="completionData.stad" placeholder="Stad">
          <button @click.prevent="saved.adr_filled = true; step++;" class="compl_but" style="margin:0 0 10px 0;" :disabled="(completionData.adres.length<1 || completionData.postcode.length<1 || completionData.stad.length<1) ? true : false">Bevestig</button>
        </div>

        <div>
          <div v-if="step == 1">
            <select v-model="completionData.profiel" style="height:52px;">
              <option disabled value="">Soort profiel:</option>
              <option value="school">Ik zoek een school</option>
              <option value="leerbedrijf">Ik zoek een leerbedrijf</option>
              <option value="stagiair">Ik loop stage</option>
              <option value="gediplomeerd">Ik ben gediplomeerd</option>
              <option value="oproepkracht">Ik werk als oproepkracht</option>
              <option value="parttime">Ik heb een part-time baan</option>
              <option value="fulltime">Ik heb een full-time baan</option>
              <option value="zzp">Ik ben een zzp-er</option>
              <option value="k9">Ik ben een hondengeleider</option>
              <option value="horeca">Ik ben een horecaportier</option>
              <option value="eso">Ik ben een Event Security Officer</option>
              <option value="leidinggevende">Ik ben leidinggevende van een organisatie</option>
              <option value="recruiter">Ik ben een recruiter voor eigen ND nummer</option>
              <option value="recruiter">Ik ben een recruiter voor intermediair</option>
              <option value="anders">Anders</option>
            </select>
            <sub v-if="completionData.profiel.length > 0">Let op: deze documenten dien je alvast bij de hand te hebben:<br>
              <ul v-for="upldoc in upldocs">
                <li>{{ upldoc.name }}</li>
              </ul>
            </sub>
            <input style="margin-top: 16px;" v-model="completionData.otherProfile" v-if="completionData.profiel === 'anders'" class="animated-input-text anime" placeholder="Voer handmatig in" type="text">
            <button @click.prevent="saved.opl = true; step++;" v-if="opleiding.length > 0" class="compl_but">Bevestig</button>
          </div>

          <div v-if="step == 2">
            <!-- Required: {{ requireddocs.length }}, Uploaded:{{ uploadeddocs.length }} - {{ requirementsMet }} -->
            <div v-for="(value, name, index) in upldocs">
              <UploadFile v-if="value.show" :type="value.name" @finished="uploadDoc(value.id, value.name)"> </UploadFile>
            </div>
            <div v-if="requirementsMet">Alle benodigde documenten zijn geupload</div>
            <button @click.prevent="step++;" class="compl_but" :disabled="!requirementsMet ? true : false">Bevestig</button>
          </div>

        </div>
        <div v-if="step == 3"><div v-if="requirementsMet">Alle benodigde documenten zijn geupload</div>Controleer je gegevens en klik op volgende.</div>
       </tab-content>

       <tab-content title="Profiel"
                    icon="ti-settings"
                    :before-change="beforeTabSwitch">
                    <div v-if="step == 4">
                      <UploadFile type="Profielfoto" @finished="uploadFinished(0)"> </UploadFile>
                    </div>
                    <div v-if="step == 5">
                      <UploadFile type="Omslagfoto" @finished="uploadFinished(1)"> </UploadFile>
                    </div>
                    <div v-if="step == 6">
                      Persoonlijke info:<br>
                      <textarea v-model="completionData.persinfo" style="width:100%;min-height:490px;" placeholder="Bijvoorbeeld: 'Mijn specialiteit als beveiliger ligt vooral bij de zorg en dan voornamelijk bij de intensieve begeleiding van crisispatienten in de geestelijke gezondheidszorg. Ik ben ook zeer gedreven op andere gebieden van de beveiliging. Ik werk al 14 jaar in de beveiliging en heb inmiddels veel ervaring opgebouwd als horecaportier, evenementenbeveiliger, mobiel surveillant, straatcoach en persoonsbeveiliger.  Ik heb gewerkt bij lokale en landelijke organisaties. Bij de lokale organisaties voel ik meer collegialiteit en saamhorigheid. Dankzij de opdrachten van landelijke opdrachtgevers kom ik aan meer uren. Het liefst blijf ik afwisselen tussen de twee werelden om eentonigheid te voorkomen. Het werk moet wel leuk blijven. Ik werk om te leven, niet andersom."></textarea>
                      <button v-if="completionData.persinfo.length>0" @click="step++;" class="compl_but" style="margin:0 0 10px 0;">Bevestig</button>
                    </div>
                    <div v-if="step == 7">
                      <div style="width:100%;max-height:140px;">
                        <img @click="step = 5;" style="cursor:pointer;width:100%;height:120px;object-fit:cover;border:2px solid white;border-radius:8px;background:white;" src="http://www.pngmart.com/files/7/Red-Smoke-Transparent-Images-PNG.png">
                        <img @click="step = 4;" style="cursor:pointer;width:60px;height:60px;border-radius:50%;margin-top:48px;position:absolute;left:calc(100vw - 50% - 30px);border:2px solid white;background:white;" src="http://www.pngmart.com/files/7/Red-Smoke-Transparent-Images-PNG.png">
                      </div>
                      <a @click="step = 6;">Persoonlijke text: <br>{{ completionData.persinfo }} </a><br>
                      Controleer je gegevens en klik op volgende.
                    </div>
        </tab-content>

       <tab-content title="Afronden"
                    icon="ti-check"
                    :before-change="beforeTabSwitch">
                    <div v-if="step == 8">
                      Stap 3
                    </div>
       </tab-content>

       <template slot="footer" slot-scope="props">
          <div class="wizard-footer-left">
              <wizard-button v-if="step > 0" @click.native="props.prevTab(); if(step>0){step--;}" :style="props.fillButtonStyle">Vorige</wizard-button>
           </div>
           <div class="wizard-footer-right">
             <wizard-button v-if="!props.isLastStep && (step == 3) || (step == 7)" @click.native="props.nextTab(); step++;" class="wizard-footer-right" :style="props.fillButtonStyle">Volgende</wizard-button>

             <wizard-button v-if="show.finish" @click.native="alert('Done')" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Versturen' : 'Volgende'}}</wizard-button>
           </div>
         </template>

   </form-wizard>
   <nuxt-link v-else-if="!$store.state.user.userName" to="/" style="padding-left:8px;">Home</nuxt-link>

  </div>
</template>
<script>
import Logo from '~/components/Logo'
import UploadFile from '~/components/UploadFile'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    Logo,
    UploadFile,
    FormWizard,
    TabContent
  },
  data () {
    return {
      test: 0,
      step: 0,
      completionData: {
        profiel: '',
        otherProfile: '',
        adres: '',
        postcode: '',
        stad: '',
        persinfo: '',
        edu: { naam: '', opleiding: '', start: '', end: '' },
      },
      saved: {
        opl: false,
        adr_warn: true,
        adr_filled: false,
      },
      show: {
        previous: false,
        next: false,
        finish: false,
      },
      alldocs: [
        {id: 0, name:'Profielfoto', show: false},
        {id: 1, name:'Omslagfoto', show: false},
        {id: 2, name:'Legitimatie (ID, rijbewijs of paspoort)', show: true},
        {id: 3, name:"Behaalde Diploma's (behalve beveiliging)", show: false},
        {id: 4, name:'Certificaten', show: false},
        {id: 5, name:'Legitimatie (Particuliere Beveiliging)', show: false},
        {id: 6, name:'Diploma Beveiliger', show: false},
        {id: 7, name: "Schoolverklaring", show: false},
        {id: 8, name: "KvK", show: false},
        {id: 9, name: "ND-vergunning", show: false},
        {id: 10, name: "Certificaat Hond", show: false},
        {id: 11, name: "Werkgeversverklaring", show: false},
      ],
      requireddocs: [],
      uploadeddocs: [],
      requirementsMet: false,
      nextUploadStep: 0,
    }
  },
  computed: {
    opleiding: function () {
      if(this.completionData.profiel === 'anders' && this.completionData.otherProfile.length > 0){
        return this.completionData.otherProfile;
      }
      else return this.completionData.profiel;
    },
    showme: function() {
      return true;
    },
    upldocs: function() {
      let y = this.alldocs;
      if(this.opleiding === 'school'){
        this.requireddocs = [y[2], y[3], y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'leerbedrijf'){
        this.requireddocs = [y[2],y[7],y[3],y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'stagiair'){
        this.requireddocs = [y[2],y[5],y[7],y[3],y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'gediplomeerd'){
        this.requireddocs =  [y[2],y[6], y[3],y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'oproepkracht'){
        this.requireddocs = [y[2],y[5],y[6],y[3],y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'parttime'){
        this.requireddocs =  [y[2],y[5],y[6],y[3],y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'fulltime'){
        this.requireddocs =  [y[2],y[5],y[6],y[3],y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'zzp'){
        this.requireddocs =  [y[2],y[8],y[5],y[6],y[3],y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'leidinggevende'){
        this.requireddocs =  [y[2],y[8],y[9],y[5],y[6],y[3],y[4]];
        return this.requireddocs;
      }
      if(this.opleiding === 'recruiter'){
        this.requireddocs = [y[2],y[10], y[5], y[6]];
        return this.requireddocs;
      }
    },
  },
  methods: {
    //when you finish all stepts
    onComplete: function() {
        console.log('Je krijgt een brief thuisgestuurd');
    },
    beforeTabSwitch: function() {
        console.log(this.opleiding);
        return true;
    },
    mutate: function() {
      let data = { id: this.test, url: 'chief'+this.test, type: 'img'+this.test};
      this.$store.dispatch('addupload', data)
      .then(() => console.log('added'))
      .catch(err => console.log(err))
      this.test ++;
      /* working:
    
      */
      //  let x = [];
      // x.push(this.$store.state.user.firstName);
      // x.push(this.$store.state.user.lastName);
      // console.log(x);
    },
    nextUpload(){
      let x = this.nextUploadStep;
      let i;
      if(x < this.requireddocs.length){
        for(i=0;i<this.requireddocs.length;i++){
          this.requireddocs[i].show = false;
        }
        if((x+1) < this.requireddocs.length){
          x++;
          this.nextUploadStep++;
          this.requireddocs[x].show = true;
        }
        else{

          console.log('all required docs uploaded');
        }
      }
    },
    uploadDoc: function (id, name){
      this.uploadeddocs.push({id: id, name: name});
      let x = false;
      let i;
      let vm = this;
      let found = [];
      this.requireddocs.forEach(function(required) {
        vm.uploadeddocs.forEach(function(uploaded) {
          if(uploaded.id == required.id){
            found.push({id: uploaded.id, name: uploaded.name});
          }
        });
      });
        let uniq = [ ...new Set(found.map(x => x.id))];
        let requiredid = [ ...new Set(this.requireddocs.map(y => y.id))];
        //sort both arrays and then check if they both contain the same value on the same index
        // if so, set requirementsMet to true;
        if(uniq.length === requiredid.length && uniq.sort().every(function(value, index) { return value === requiredid.sort()[index]})){
          this.requirementsMet = true;
        }
      this.nextUpload();
      return x;
    },
    uploadFinished: function(nr){
      if(nr == 0){
        this.step = 5;
      }
      else{
        this.step = 6;
      }
    },
  },
  created(){
    //console.log(this.$store.state.user.userName);
  }
}
</script>
<style>
.inputfile{
  color:white;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  cursor: pointer; /* "hand" cursor */
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: #ff5e3a;
  display: inline-block;
  border: 2px solid white;
  padding: 20px;
  border-radius: 12px;
}

.inputfile:focus + label,
.inputfile + label:hover {
  background-color:rgb(155, 89, 182);
}

.inputfile:focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}

.compl_but{
  border-radius:8px;
  border-width:1px;
  width:100%;
  padding:8px;
  margin: 16px 0 16px 0;
  background:white;
}
.wizard-header{
  display: none;
}
button{
  border-color: white !important;
}
span{
  line-height: 24px;
  z-index:1;
  margin-top:-32px;
  color:#ff5e3a;
}
.stepTitle.active{
  color:white !important;
}
.topmar{
  margin-top: 8px;
}
</style>
