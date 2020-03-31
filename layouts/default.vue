<template>
  <div :style="{fontSize:fSize+'px'}">
    <nuxt />
  </div>
</template>

<script>
let defaultWidth = 1600,
    defaultFont = 14,
    minWidth = 1200,
    minHeight = 800,
    defaultHeight = 800;
  export default {
    data () {
        return {
            vW:  0,
            vH:  0
        }
    },
    components: {
      },
    watch: {
      $route () {
        /*
        console.log('route changed', this.$route);
        if(!this.$store.state.token){
          console.log('not logged in');
        }
        if(this.$store.state.token){
          console.log('logged in as: ' + this.$store.state.user.userName);
        }
        */
      }
    },
    mounted () {
        window.addEventListener('resize',this.onResize.bind(this));
        this.vW = window.innerWidth;
        this.vH = window.innerHeight;
    },
    computed: {
        fSize () {
            var ret = 1.4 + (20 * Math.min( Math.max(minWidth,this.vW) / defaultWidth, Math.max(minHeight,this.vH) / defaultHeight));
            return ret;
        }
    },
    methods: {
        onResize () {
            this.vW = window.innerWidth;
            this.vH = window.innerHeight;
        }
    }
  }
</script>


<style>
.content-bg-wrap:before{
top: 0;
right: 0;
bottom: 0;
left: 0;
content: '';
position: fixed;
background-color: rgb(255,94,58, 0.95);
opacity: 1;
}

.content-bg-wrap{
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  z-index:-1;
  position:fixed;
  background: url('landing-users.png');
  -webkit-animation: linksomlaag 120s linear infinite;
  animation: linksomlaag 120s linear infinite;
  will-change: background-position;
}

@keyframes linksomlaag {
from{
    background-position: 0 0;
  }
to{
    background-position: -2000px 2000px;
  }
}

body{
  font-family: Roboto,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;
  font-size: 16px;
}

html {
  font-family: Roboto, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
