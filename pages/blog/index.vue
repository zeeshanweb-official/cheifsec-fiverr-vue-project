<template>
  <div>
    <nuxt-link to="/">Homepage</nuxt-link>
    <div class="container">
      <div class="row">
        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 center">
          <div v-for="(article, index) in articles" :key="index">
            <div>
              <img
                :src="article.urlToImage"
                width="100%"
                height="200px"
              >

              <div primary-title>
                <div>
                  <div class="headline">{{article.title}}</div>
                </div>
              </div>

              <div v-html="article.content">
              </div>

              <div>
                <a :href="article.url" target="_blank">Open</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    async asyncData({$axios}){
      const {articles} = await $axios.$get('https://newsapi.org/v2/top-headlines?country=nl&apiKey=af4129710bf14609b57b33cc43239681');
      return{articles};
    },
  }
</script>
<style scoped>
.center{
  margin: 0 auto 0 auto;
}
img{
  object-fit: cover;
}
</style>
