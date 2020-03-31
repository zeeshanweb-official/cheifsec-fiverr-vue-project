<template>
  <div class="white" style="min-height:0;">
    <div class="container">
      <div class="row" style="padding-top:32px; padding-bottom:45px;">
          <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <input id="crea" v-model="sendBlogData.creator" class="textje anime" placeholder="Gebruikersnaam" type="text" :disabled="sendBlogData.creator.length >= 180">
            <label for="chi" style="width:100%;"><div style="background:black;color:white;height:20px;">{{ 160 - sendBlogData.creator.length }} tekens over</div></label>

            <input id="titl" v-model="sendBlogData.title" class="textje anime" placeholder="Titel van het artikel" type="text">
            <label for="titl" style="width:100%;"><div style="background:black;color:white;height:20px;">{{ 160 - sendBlogData.title.length }} tekens over</div></label>

            <input id="shor" v-model="sendBlogData.short_descr" class="textje anime" placeholder="Korte omschrijving van het artikel" type="text">
            <label for="shor" style="width:100%;"><div style="background:black;color:white;height:20px;">{{ 160 - sendBlogData.short_descr.length }} tekens over</div></label>

            <input id="desc" v-model="sendBlogData.description" class="textje anime" placeholder="Omschrijving van het artikel" type="text">
            <label for="desc" style="width:100%;"><div style="background:black;color:white;height:20px;">{{ 160 - sendBlogData.description.length }} tekens over</div></label>

            <input id="img" v-model="sendBlogData.img_url" class="textje anime" placeholder="Afbeelding URL" type="text">
            <label id="img" style="width:100%;"><div style="background:black;color:white;height:20px;">{{ 160 - sendBlogData.img_url.length }} tekens over</div></label>

            <input id="url" v-model="sendBlogData.url" class="textje anime" placeholder="Artikel URL" type="text">
            <label for="url" style="width:100%;"><div style="background:black;color:white;height:20px;">{{ 160 - sendBlogData.url.length }} tekens over</div></label>

            <input id="keyw" v-model="sendBlogData.keywords" class="textje anime" placeholder="Keywords" type="text">
            <label for="keyw" style="width:100%;"><div style="background:black;color:white;height:20px;">{{ 160 - sendBlogData.keywords.length }} tekens over</div></label>

            <textarea id="cont" style="width:100%;height:240px;" class="textje anime" v-model="sendBlogData.content" placeholder="Schrijf hier de content">
            </textarea>
            <label for="cont" style="width:100%;"><div style="background:black;color:white;height:20px;">{{ 160 - sendBlogData.content.length }} tekens over</div></label>

                <a @click.prevent="sendBlog"><button type="submit" class="btn btn-purple btn-lg full-width">Artikel Verzenden</button></a>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
let qs = require('qs');
import axios from 'axios'
export default{
  data() {
    return {
      sendBlogData: {
        url: '',
        title: '',
        description: '',
        short_descr: '',
        content: '',
        img_url: '',
        creator: '',
        keywords: ''
      }
    }
  },
  methods: {
    sendBlog: function () {
        //check if user is admin
        console.dir(this.sendBlogData);
        axios.post('https://www.beveilig.nu:3000/blog', qs.stringify(this.sendBlogData))
        .then(resp => {
          console.log('Blog posted');
        })
        .catch(err => {
          console.log('Error');
        });
    }
  }
}
</script>
<style scoped>
input{
  width:100%;
  margin: 8px 0 8px 0;
  padding: 8px;
}
</style>
