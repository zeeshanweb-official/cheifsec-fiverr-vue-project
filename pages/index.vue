<template>
  <div>
    <div class="content-bg-wrap"></div>
    <Logo></Logo>
    <div @click="wie = !wie" class="wie"><b>Wie?</b></div>

    <div v-if="wie" class="wie-panel">
      <div @click="wie = !wie" class="wie" style="margin-top:46px;">X</div>
        <div class="container">
        <div class="spacer"></div>
        <div class="row">
          <div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" style="margin:auto;">
            Informatie text
            </div>
          </div>
        </div>
      </div>

        <div class="container">
        <div class="spacer"></div>
        <div class="row">
          <div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" style="margin:auto;">
            <h1 class="text-white">Welkom</h1>
            <p class="text-white">Word lid van BEVEILIG.NU om meer uit je carriere te halen. Kom in contact met opleidigingsinstellingen, collega's en werkgevers in de particuliere beveiligingsbranche. Gebruik je profiel om werkgerelateerde media, verhalen en succesvol afgeronde projecten zichtbaar te maken voor toekomstige werkgevers. Registreren werkt snel en kostenloos.</p>
          </div>
          <div v-if="!$store.state.isLoggedIn" class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" style="min-height:340px;">
            <RegisterContainer></RegisterContainer>
          </div>
          <div v-if="$store.state.isLoggedIn" class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" style="min-height:341px;">
            <LoggedInContainer></LoggedInContainer>
          </div>
        </div>
        <div class="spacer"></div>
      </div>

    <div class="white">
      <div class="container">
        <div class="row" style="padding-bottom:45px;">
          <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding:30px 0 30px 0;">
            <h1 class="h1-bigger" style="text-align:center;margin-top:2rem;">Waarom Beveilig.nu</h1>
          </div>
          <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 vert-mid">
            <div>
              <video width="100%" ref="videoRef" controls autoplay autobuffer playsinline loop muted="muted"></video>
            </div>
          </div>
          <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 vert-mid">
            <p>

              <ul>
                <li>Speciaal voor de beveiliging</li>
                <li>Profielen met info, media en meer</li>
                <li>Chat met andere members</li>
                <li>Calamiteitendienst net als UBER</li>
                <li>Nieuwe kansen voor meer veiligheid</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
          <div class="col col-12">
            <div class="spacer"></div>
            <h1 class="text-white">Intentieverklaring</h1>
            <p class="text-white">
              Onder deze domeinnaam wordt een centraal systeem gebouwd die uitsluitend bedoeld is voor mensen die werkzaam zijn in de particuliere beveiligingssector.
              Hieronder vallen onder andere beveiligers, event security officers (ESO), horecaportiers, honden geleiders, EHBO'ers, brandwachten en verkeersregelaars.
              Bij voldoende draagkracht vanuit de sector heeft dit positieve invloed op:
              <ul>
                <li>de vindbaarheid van opleidingsinstellingen voor leerling kandidaten</li>
                <li>gebruikersprofielen met tijdlijn, verleden en skills zichtbaar</li>
                <li>bedrijven kunnen bij nood beroep doen op beschikbare collega's bij collega bedrijven</li>
              </ul>
              ia een online profiel zijn opleidingsinstellingen beter vindbaar voor leerling-kandidaten,
            kunnen beveiligingsbedrijven diensten ruilen,
            beveiligers kunnen jobs filteren en specialisten zich beschikbaar stellen bij calamiteiten.
          </p>
          <div class="spacer"></div>
          </div>
      </div>
    </div>


    <!--
    <div class="container">
      <div class="spacer"></div>
      <h1 @click="pushPublicMess()" class="text-white" style="width:100%;text-align:center;">Gebruikersactiviteit</h1>
      <div class="row">
        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" style="margin:auto;">
          <div style="min-height:120px;max-height:240px;overflow:hidden">
            <div v-for="block in reversedBlocks">
              <div style="color:white;line-height:36px;">{{ block.number }} - {{ block.username }} heeft op {{ block.date }} om {{ block.time }} een {{ block.type }} geplaatst.</div>
            </div>
          </div>
        </div>
        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <div style="min-height:120px;max-height:240px;overflow:hidden">
            <div v-for="rock in reversedRocks">
              <div style="color:white;line-height:36px;">{{ rock.number }} - {{ rock.username }} heeft op {{ rock.date }} om {{ rock.time }} een {{ rock.type }} geplaatst.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
    -->
    <div class="white">
      <div class="container" style="padding-top:56px;padding-bottom:56px;">
        <div class="row ">
          <div class="col col-12">
            <h1 style="text-align:center;margin-bottom:44px;">Blogs</h1>
            <div class="row bottom-space-1">
              <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <nuxt-link :to="blogs[0].url">
                  <img class="blog-img" :src="blogs[0].img_url">
                </nuxt-link>
                <sub>Door <nuxt-link :to="'https://www.beveilig.nu/user/' + blogs[0].creator"><b>{{ blogs[0].creator }}</b></nuxt-link> op {{ blogs[0].time }}</sub>
                <h2>{{ blogs[0].title }}</h2>
                <p>
                  {{ blogs[0].short_descr }}<br><nuxt-link :to="blogs[0].url" style="blogmore">Lees meer..</nuxt-link>
                </p>
              </div>

              <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <nuxt-link :to="blogs[1].url">
                  <img class="blog-img" :src="blogs[1].img_url">
                </nuxt-link>
                <sub>Door <nuxt-link :to="'https://www.beveilig.nu/user/' + blogs[1].creator"><b>{{ blogs[1].creator }}</b></nuxt-link> op {{ blogs[1].time }}</sub>
                <h2>{{ blogs[1].title }}</h2>
                <p>
                  {{ blogs[1].short_descr }}<br><nuxt-link :to="blogs[1].url" style="blogmore">Lees meer..</nuxt-link>
                </p>
              </div>

              <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <nuxt-link :to="blogs[2].url">
                  <img class="blog-img" :src="blogs[2].img_url">
                </nuxt-link>
                <sub>Door <nuxt-link :to="'https://www.beveilig.nu/user/' + blogs[2].creator"><b>{{ blogs[2].creator }}</b></nuxt-link> op {{ blogs[2].time }}</sub>
                <h2>{{ blogs[2].title }}</h2>
                <p>
                  {{ blogs[2].short_descr }}<br><nuxt-link :to="blogs[2].url" style="blogmore">Lees meer..</nuxt-link>
                </p>
              </div>

              <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <nuxt-link :to="blogs[3].url">
                  <img class="blog-img" :src="blogs[3].img_url">
                </nuxt-link>
                <sub>Door <nuxt-link :to="'https://www.beveilig.nu/user/' + blogs[3].creator"><b>{{ blogs[3].creator }}</b></nuxt-link> op {{ blogs[3].time }}</sub>
                <h2>{{ blogs[3].title }}</h2>
                <p>
                  {{ blogs[3].short_descr }}<br><nuxt-link :to="blogs[3].url" style="blogmore">Lees meer..</nuxt-link>
                </p>
              </div>
            </div>
            <div @click="allblogs = !allblogs" style="font-size:1.2rem;margin:15px 0 45px 0;width:100%;" class="btn btn-primary btn-lg">Meer blogs</div>
          </div>

          <div class="col col-12" v-if="allblogs">
            <div class="row bottom-space-1">
              <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <nuxt-link :to="blogs[4].url">
                  <img class="blog-img" :src="blogs[4].img_url">
                </nuxt-link>
                <sub>Door <nuxt-link :to="'https://www.beveilig.nu/user/' + blogs[4].creator">{{ blogs[4].creator }}</nuxt-link> op {{ blogs[4].time }}</sub>
                <h3>{{ blogs[4].title }}</h3>
                <p class="p-intro" style="margin-bottom:0;">
                  {{ blogs[4].short_descr }}<br><nuxt-link :to="blogs[4].url" style="blogmore">Lees meer..</nuxt-link>
                </p>
              </div>

              <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <nuxt-link :to="blogs[5].url">
                  <img class="blog-img" :src="blogs[5].img_url">
                </nuxt-link>
                <sub>Door <nuxt-link :to="'https://www.beveilig.nu/user/' + blogs[5].creator">{{ blogs[5].creator }}</nuxt-link> op {{ blogs[5].time }}</sub>
                <h3>{{ blogs[5].title }}</h3>
                <p class="p-intro" style="margin-bottom:0;">
                  {{ blogs[5].short_descr }}<br><nuxt-link :to="blogs[5].url" style="blogmore">Lees meer..</nuxt-link>
                </p>
              </div>

              <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <nuxt-link :to="blogs[6].url">
                  <img class="blog-img" :src="blogs[6].img_url">
                </nuxt-link>
                <sub>Door <nuxt-link :to="'https://www.beveilig.nu/user/' + blogs[6].creator">{{ blogs[6].creator }}</nuxt-link> op {{ blogs[6].time }}</sub>
                <h3>{{ blogs[6].title }}</h3>
                <p class="p-intro" style="margin-bottom:0;">
                  {{ blogs[6].short_descr }}<br><nuxt-link :to="blogs[6].url" style="blogmore">Lees meer..</nuxt-link>
                </p>
              </div>

              <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <nuxt-link :to="blogs[7].url">
                  <img class="blog-img" :src="blogs[7].img_url">
                </nuxt-link>
                <sub>Door <nuxt-link :to="'https://www.beveilig.nu/user/' + blogs[7].creator">{{ blogs[7].creator }}</nuxt-link> op {{ blogs[7].time }}</sub>
                <h3>{{ blogs[7].title }}</h3>
                <p class="p-intro" style="margin-bottom:0;">
                  {{ blogs[7].short_descr }}<br><nuxt-link :to="blogs[7].url" style="blogmore">Lees meer..</nuxt-link>
                </p>
              </div>
            </div>
            <nuxt-link to="/blog/" style="width:100%;"><div style="font-size:1.2rem;margin:15px 0 45px 0;width:100%;" class="btn btn-primary btn-lg">Alle Blogs</div></nuxt-link>
          </div>
      </div>
    </div>
  </div>

    <!--
    <div v-if="chico">
        <div class="center white full">
          <div v-for="(article, index) in articles">
            <img :src="article.src" style="padding:100px;"
              :key="index">
          </div>
        </div>
      </div>
    -->

    </div>
  </div>
</template>

<script>
  import RegisterContainer from '~/components/register'
  import LoggedInContainer from '~/components/loggedin'
  import Logo from '~/components/Logo'
  export default {
    data () {
      return {
        wie: false,
        blocks: [],
        rocks: [],
        nr: 0,
        blogs: [],
        allblogs: false
      }
    },
    computed: {
      reversedBlocks: function(){
        return this.blocks.slice().reverse();
      },
      reversedRocks: function(){
        return this.rocks.slice().reverse();
      }
    },
    components: {
      Logo,
      RegisterContainer,
      LoggedInContainer
    },
    async asyncData({$axios}){
      const {data} = await $axios.$get('https://www.beveilig.nu:3000/blog');
      //const {blogs} = await $axios.$get('https://newsapi.org/v2/top-headlines?country=nl&apiKey=af4129710bf14609b57b33cc43239681');
      return {blogs: data.blogs};
    },
    methods: {
      initVideo: function(){
        this.$refs.videoRef.src = "video/debby.mov";
        this.$refs.videoRef.play();
      },
      pushPublicMess: function(){
        if (this.nr % 3){
          this.blocks.push({'number': this.nr, 'username': 'chief', 'date': new Date().toJSON().slice(0,10).replace(/-/g,'/'), 'time': new Date().toJSON().slice(11,19).replace(/-/g,'/'), 'type': 'keef'});
        }
        else{
          this.rocks.push({'number': this.nr, 'username': 'chief', 'date': new Date().toJSON().slice(0,10).replace(/-/g,'/'), 'time': new Date().toJSON().slice(11,19).replace(/-/g,'/'), 'type': 'keef'});
        }
        this.nr++;
      }
    },
    mounted(){
      this.initVideo();
    }
  }
</script>
<style>
h3{
  font-size:inherit;
}

.wie{
  color:white;
  margin-left: -30px;
  margin-top: -64px;
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

.white{
  background-color: white;
}
/*
.white:after {
  background: inherit;
  bottom: 0;
  content: '';
  display: block;
  height: 50%;
  left: 0;
  position: absolute;
  right: 0;
  transform: skewY(-1.5deg);
  transform-origin: 100%;
  z-index: -1;
}
*/
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
