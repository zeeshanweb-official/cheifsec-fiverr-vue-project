<template>
  <div class="privacy">
    <Logo style="margin-top:36px;margin-bottom:36px;"></Logo>
    <div @click="closePrivacy" style="color:white;text-align:center;font-size:36px;position:fixed;top:36px;right:36px;width:36px;height:36px;line-height:34px;border:1px solid white;border-radius:50%;">
      &times;
    </div>
    <div class="container">
      <div class="row">
        <div style="color:white; font-size:14px;" class="col col-12">
          <h2>Privacy Verklaring</h2>
          <p>
            Binnen BEVEILIG.NU houden we ons aan een gedragscode. Gebruikers met een
            rol als admin of moderator hebben de bevoegdheid om bij vaststelling van ongewenste gedragingen
            de toegang tot het systeem te blokkeren. Je gegevens blijven alleen bij ons bekend.
            Om te voorkomen dat geblokkeerde gebruikers een account kunnen aanmaken onder een ander email adres
            doen wij een volledige persoonscheck. Dat houdt in dat we al je relevante papierwerk willen zien.
            Op het gebied van online communities is BEVEILIG.NU het eerste platform voor de beveiligingssector.</br>
          </p>
          <p>
            Binnen BEVEILIG.NU houden we ons aan een gedragscode. Gebruikers met een
            rol als admin of moderator hebben de bevoegdheid om bij vaststelling van ongewenste gedragingen
            de toegang tot het systeem te blokkeren. Je gegevens blijven alleen bij ons bekend.
            Om te voorkomen dat geblokkeerde gebruikers een account kunnen aanmaken onder een ander email adres
            doen wij een volledige persoonscheck. Dat houdt in dat we al je relevante papierwerk willen zien.
            Op het gebied van online communities is BEVEILIG.NU het eerste platform voor de beveiligingssector.</br>
          </p>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Logo from '~/components/Logo'
  export default {
    name: 'Privacy',
    components:{
      Logo
    },
    data () {
      return {
        submittedLogin: false,
        loginData: {
            email: '',
            password: ''
        },
      }
    },
    methods: {
      closePrivacy: function(){
        this.$emit('read');
      },

    }
  }
</script>

<style scoped>
.privacy{
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(255,94,58);
  padding: 16px;
  width: 100%;
  height: 100%;
  border: 8px solid white;
}
</style>
