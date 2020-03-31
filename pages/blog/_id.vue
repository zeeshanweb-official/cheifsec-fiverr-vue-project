<template>
  <div class="white">
    <nuxt-link to="/">Terug</nuxt-link>
    <Logo></Logo>
    <div class="container">
      <div class="row" style="padding-bottom:45px;">
          <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding:30px 0 30px 0;">
              <h1 class="h1-bigger center">{{ blog.title }}</h1>
              <p class="flow-text center">{{ blog.creator }} op {{ blog.date }}</p>
            </div>
          <div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div style="display: flex;justify-content: center;flex-direction: column;">
              <!--<video width="100%" ref="videoRef" controls autoplay autobuffer playsinline loop muted="muted"></video>-->
              <img :src="blog.img_url" style="width: 80%;object-fit: cover;margin: 36px auto;">
              </div>
          </div>
          <div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" style="margin:auto;" >
            <p class="p-bigger" v-html="blog.short_descr"></p>
          </div>
          <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="margin:36px auto 0 auto;" >
            <p class="p-bigger" v-html="blog.description"></p>
          </div>
      </div>
    </div>
    <div class="container">
      <div class="row" style="padding-bottom:72px;">
          <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <p class="p-bigger" v-html="blog.content"></p>
          </div>
      </div>
    </div>
  </div>


</template>

<script>
import axios from 'axios'
import Logo from '~/components/Logo'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Logo
  },
  async asyncData({params}){
    const {data} = await axios.get('https://www.beveilig.nu:3000/blog/' + params.id);
    return {blog: data.data};
  },
  head() {
    return {
      title: `${this.blog.title} - ${this.blog.creator}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.blog.keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.blog.description,
        },
      ],
    }
  },
  mounted(){
  },

}
</script>

<style scoped>

</style>
