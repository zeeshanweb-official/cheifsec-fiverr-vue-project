<template>
  <div>
    <div class="content-bg-wrap"></div>
    <nuxt-link to="/blog">Nieuws</nuxt-link>
    <Logo></Logo>

        <div class="container">
        <div class="spacer"></div>
        <div class="row">
          <div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" style="margin:auto;">
            <h1 class="text-white">Account activatie</h1>
            <p class="text-white">
              Er is zojuist een automatische activatie mail verstuurd naar het ingevoerde adres.
              Volg de link in de mail die u heeft ontvangen. Klik <nuxt-link to="/" style="text-decoration:none;color:white;"><b>hier</b></nuxt-link> om terug te keren naar het hoofdscherm. 
            </p>
          </div>
        </div>
        <div class="spacer"></div>
      </div>
    </div>
</template>

<script>
  import Logo from '~/components/Logo'
  export default {
    data () {
      return {

      }
    },
    computed: {

    },
    components: {
      Logo,
    },
    methods: {

    },
    mounted(){
    }
  }
</script>
<style>
h3{
  font-size:inherit;
}

.wie{
  color:white;
  margin-left: -46px;
  margin-top: -46px;
  width: 100%;
  text-align: right;
}

.vert-mid{
  margin-top:auto;
  margin-bottom:auto;
}

.blog-img{
  width:100%;
  object-fit:cover;
  border-radius:8px;
  height: 150px;
}

.full{
  width: 100vw;
}

.wie-panel{
  top: 0;
  background: rgba(0,0,0,0.90);
  z-index: 500;
  width: 100%;
  height: 100vh;
  position: fixed;
  color: white;
}

.spacer{
  position: relative;
  height: 7vh;
  width: 100%;
}

.center{
  margin: 0 auto 0 auto;
}
 img{
   width:100%;
 }
</style>
