<template>
  <div class="loggedin btn btn-lg" @click="logout()">
    <div class="centersvg">
      <img src="~assets/icon3.svg" />
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      logout: function(){
        this.$store.dispatch('logout', this.$store.state.user.userName)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
.loggedin{
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 8px;
  text-align: center;
}
.centersvg{
  width: 329px;
  margin-left: auto;
  margin-right: auto;
  line-height: 329px;
}
</style>
