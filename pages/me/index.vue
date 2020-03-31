<template>
  <div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      blocks: [],
    }
  },
  mounted() {
    //do something before mounting vue instance
    if(!this.$store.state.user.activated){
      console.log('user not activated');
      this.$router.push('/checkmail');
    }
    else if(!this.$store.state.user.completed){
      console.log('user not completed');
      this.$router.push('/completion');
    }
    else if(!this.$store.state.user.approved){
      console.log('user not approved');
      this.$router.push('/approval');
    }
    }
  }
</script>
<style>

</style>



//completion
//verification letter
//personal Profielen
