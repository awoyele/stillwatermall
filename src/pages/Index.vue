<template>
  <q-page class="q-mx-aut">
    <div class="col-12">
      <h1 class="q-headline capitalize">View what's going on in Stillwater, OK</h1>
      <p>
        Hello everyone, my name is John and this is an AI project I came up with.
        I am training my ML algorithm to study local businesses in Stillwater and how people interact with them.
        Feel free to browse through and find things you like about this awesome city or fun things to do. Ciao.
      <hr/>
      </p>
    </div>
    <!--<img alt="Quasar logo" src="~assets/quasar-logo-full.svg">-->
    <div class="row">
      <div class="col-md-9 col-12 q-px-md">
        <div>
          <h2 class="q-mx-auto q-title">
            Places to eat in Stillwater
          </h2>
          <div class="row">
            <q-spinner-pie size="50px" color="primary" v-if="!showRestaurants" class="q-mx-auto"></q-spinner-pie>
          </div>
          <carousel :per-page="3" :autoplay="true" :navigation-enabled="true" :scroll-per-page="false" :autoplayTimeout="6000" :loop="true" id="restaurants">
            <template v-if="showRestaurants" v-for="(restaurant,ind) in restaurants">
            <slide>
              <q-card inline :key="restaurant.id" class="q-mb-sm col-6 col-lg-4  " thumbnails-icon="times">
              <q-card-media v-if="!!restaurant.images && !!restaurant.images[0].link">
                <img  :src="restaurant.images[0].link" :title="restaurant['image-title']" :alt="restaurant['image-alt']">
              </q-card-media>
              <q-card-title class="row">
                <span class="q-body-2 text-weight-bolder">{{ restaurant.title }}</span><br>
              </q-card-title>
              <q-card-main>
                <a class="addr_link" :href="'https://maps.google.com?q='+restaurant.title" target="_blank">
                  <q-icon size="1rem" name="pin_drop" color="brown" class="q-inline"></q-icon>
                  <p class="q-body-2 _address">{{ restaurant.address }}</p>
                </a>
              </q-card-main>
            </q-card>
            </slide>
            </template>
          </carousel>
        </div>
        <div>
          <h2 class="q-mx-auto q-title">
            Fun Places to Visit Stillwater
          </h2>
          <div class="row">
            <q-spinner-pie size="50px" color="primary" v-if="!showAttractions" class="q-mx-auto"></q-spinner-pie>
          </div>
            <carousel :per-page="3" :autoplay="true" :navigation-enabled="true" :scroll-per-page="false" :autoplayTimeout="4000" :loop="true" id="attractions" >
              <template v-if="showAttractions" v-for="(attraction,ind) in attractions">
                <slide>
                <q-card inline :key="attraction.id" class="q-mb-sm col-6 col-lg-4" thumbnails-icon="times">
                <q-card-media v-if="attractionsHasImages">
                  <img  :src="(attraction.images[0]||'').link||''" :title="attraction['image-title']" :alt="attraction['image-alt']">
                </q-card-media>
                <q-card-title class="row">
                  <span class="q-body-2 text-weight-bolder">{{ attraction.title }}</span><br>
                </q-card-title>
                <q-card-main>
                  <a class="addr_link" :href="'https://maps.google.com?q='+attraction.title" target="_blank">
                    <q-icon size="1rem" name="pin_drop" color="brown" class="q-inline"></q-icon>
                    <p class="q-body-2 _address">{{ attraction.address }}</p>
                  </a>
                </q-card-main>
                </q-card>
                </slide>
              </template>
            </carousel>
        </div>
      </div>
      <div class="col-md-3 col-12 q-pl-md car-block">

        <div class="row">
          <h2 class="q-mx-auto q-title">
            Local Cars for Sale
          </h2>
        </div>
        <div class="row">
          <q-spinner-pie size="50px" color="primary" v-if="!showCars" class="q-mx-auto"></q-spinner-pie>
        </div>
        <div class="row">
          <q-card v-if="showCars" v-for="(car,ind) in cars" :key="car.id" class="q-mb-sm col-5 col-md-12  q-mx-sm" thumbnails-icon="times">
            <a @click="showCar(ind)">
              <q-card-media v-if="!!car.images.length > 0"> <img  :src="car.images[0].link" :title="car['image-title']" :alt="car['image-alt']"></q-card-media>
            <q-card-title class="row">
              <span class="q-body-2">{{ car.title }}</span><br>
              <span class="q-body-2 text-weight-bolder">{{ car.MSRP }}</span>
              <q-btn @click="goTo(car.link)" class="btn q-ml-auto q-body-2 float-right" href="#" size="sm" color="primary"> SEE MORE</q-btn>
            </q-card-title>
            </a>
          </q-card>
        </div>
      </div>
    </div>
    <q-modal v-model="carModal" v-if="carModal" maximized>
      <q-carousel class="text-white" arrows :thumbnails="carM.images.map(a => a.link)" height="80vh" :thumbnails-horizontal="true">
        <q-carousel-slide v-for="(image,ind) in carM.images" :img-src="image.link" :key="ind">
        </q-carousel-slide>
      </q-carousel>
      <div class="row">
        <div class="col-12 q-mt-md">
          <p class="q-ml-sm q-title"> {{carM.title}}</p>
          <p class="q-ml-sm"> MSRP: {{carM.MSRP}}</p>
        </div>
        <q-btn rounded push color="green" icon="play_arrow" class="q-ml-auto"label="See More" @click="goTo(carM.link)" />
        <q-btn rounded push color="amber" icon="close" class="q-ml-auto"label="Close" @click="carModal = false" />
      </div>
    </q-modal>
  </q-page>
</template>


<script>
  import homeStoreModule from '../store/home'
  import { Carousel, Slide } from 'vue-carousel';
  import { mapMultiRowFields } from 'vuex-map-fields';
  import { QIcon, QCard, QCardTitle, QCardMain, QCardMedia, Notify, QModal, QBtn, QCarousel, QCarouselSlide, QCarouselControl, QInnerLoading, QSpinnerGears, QSpinnerPie} from "quasar"

export default {
  name: 'PageIndex',
  components:{ QIcon, QCard, QCardTitle, QCardMain, QCardMedia, Notify, QModal, QBtn, QCarousel, QCarouselSlide, QCarouselControl, QInnerLoading, QSpinnerGears, QSpinnerPie , Carousel, Slide},
  data: ()=>({ carModal:false, carM:{}, /*cars:[], restaurants:[], attractions:[]*/}),
  methods:{
    showCar(ind){
      this.carModal =true
      this.carM = this.cars[ind]
    },
    goTo(url){
      var win = window.open(url, '_blank');
      win.focus();
    }
  },
  computed:{
    ...mapMultiRowFields("home", ['cars', 'restaurants', 'attractions']),
    showCars:function(){return this.cars.length > 0},
    showRestaurants:function(){return this.restaurants.length > 0 && this.restaurants != undefined },
    showAttractions:function(){return this.attractions.length > 0 && this.attractions != undefined },
    attractionsHasImages:function(){return this.attractions.length > 0 && this.attractions != undefined &&!!(((this.attractions||'').images||'').length > 0) && !!((this.attractions.images[0]||'').link||'') }
  },
  created() {
    return this.$store.dispatch("home/getInfos")
  },
  meta: {
    title: 'Home Page',
    titleTemplate: title => `${title} - Stillwater Mall`,
    meta: {
      description: { name: 'description', content: 'Home Page showing Popular things in Stillwater' },
      keywords: { name: 'keywords', content: 'Stillwater, Mall, local, shopping, website' },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
    }
  },
  preFetch ({ store }) {
    // store.registerModule('home', homeStoreModule)
    return store.dispatch("home/getInfos")
  },
  destroyed () {
    this.$store.unregisterModule('home')
  },

}
</script>

<style>
  #restaurants .q-card-media {
    max-height: 8rem;
  }
  ._address{
    display: contents;
  }
  a.addr_link{
    text-decoration: none;
  }
  .car-block{
    box-shadow: -4px 0px 0px 0px #eee4;
  }
  h2.q-title {
    font-size: 1.8rem;
  }
  h1.q-headline {
    font-size: 3rem;
    line-height: 48px;
  }
  .q-card-title .q-body-2 {
    font-size: 1.2rem;
    color: #235f;
  }
  p.q-body-2._address {
    color: #47b;
  }
  i.q-icon.q-inline.material-icons.text-brown {
    padding-right: 1rem;
  }
  .q-card {
      margin: 13px 8px;
  padding: 4px;
  background-color: #def;
  }
  .q-px-md .row>.col-lg-4 {
      width: 31.4%;
  }
  .goodies {
     margin: 13px 8px;
     width: 31.4%;
     padding: 4px;
     background-color: #def;
   }
  .VueCarousel .q-card-media {
    max-height: 11rem;
  }

</style>