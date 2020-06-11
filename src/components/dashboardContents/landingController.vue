<template>
  <div id="app">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">Kouvee Petshop</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button> 
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <li class="nav-item">
              <v-btn text large color="white" href="#services">Pelayanan</v-btn>
            </li>
            <li class="nav-item">
              <v-btn text large color="white" href="#team">Tentang</v-btn>
            </li>
            <li class="nav-item">
              <v-btn text large color="white" router to="/login">LOGIN</v-btn>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Header -->
    <header class="masthead">
      <div class="container">
        <div class="intro-text">
          <div class="intro-lead-in">Selamat Datang Di Kouvee Petshop!</div>
          <div class="intro-heading text-uppercase" aria-activedescendant="">Berikan Yang Terbaik Untuk Hewan Kesayangan Anda</div>
        </div>
      </div>
    </header>

    <!-- Services -->
    <section id="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">Pelayanan</h2>
            <h3 class="section-subheading text-muted">Semua yang ada disini terbuka bagi Anda</h3>
          </div>  
        </div>
        <!-- Tampilan Produk -->
        <div>
          <v-container>
            <v-toolbar flat color="white">
              <v-toolbar-title>Produk</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field v-model="keyword" append-icon="mdi-search" label="Pencarian" hide-details></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn text @click="sortByPriceProduct">Sort By Harga</v-btn>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn text @click="sortByQtyProduct">Sort By Jumlah</v-btn>
            </v-toolbar>
            <v-row>
              <v-col cols="3" v-for="(item,index) in FilterAndSortProduct" :key="index">
                <v-card>
                  <v-list-item three-line>
                   <v-list-item-content>
                      <div class="overline mb-4"><v-img class="img" :src="item.img_url" max-width="200px" max-height="500px"></v-img></div>
                      <v-list-item-title class="headline mb-1">{{item.product.productName}}</v-list-item-title> 
                      <v-list-item-subtitle>Jumlah: {{item.product.productQuantity}}</v-list-item-subtitle>
                      <v-list-item-subtitle>Harga: {{item.product.productPrice}}</v-list-item-subtitle>
                      <v-list-item-subtitle>Satuan: {{item.product.meassurement}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <!-- Tampilan Layanan -->
        <div>
          <v-container>
            <v-toolbar flat color="white">
              <v-toolbar-title>Layanan</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field v-model="keywordService" append-icon="mdi-search" label="Pencarian" hide-details></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn text @click="sortByPriceService">Sort By Harga</v-btn>
            </v-toolbar>
            <v-row>
              <v-col cols="3" v-for="(item,index) in FilterAndSortService" :key="index">
                <v-card>
                  <v-list-item three-line>
                   <v-list-item-content>
                      <v-list-item-subtitle class="headline mb-1">{{item.completeName}}</v-list-item-subtitle>
                      <v-list-item-subtitle>Harga: {{item.price}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="bg-light" id="team">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">ABOUT US</h2>
            <h2 class="section-heading text">Kouvee Petshop</h2>
            <h2 class="section-heading text-uppercase">(Kelompok 2 P3L Kelas J)</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../../assets/img/team/1.jpg">
              <h4>Natan HP</h4>
              <p class="text-muted">Scrum Master</p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../../assets/img/team/2.jpg">
              <h4>Larry</h4>
              <p class="text-muted">Apprentice</p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../../assets/img/team/3.jpg">
              <h4>Arum Puspa Belindo</h4>
              <p class="text-muted">Apprentice</p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../../assets/img/team/4.jpg">
              <h4>Nobel Husodo</h4>
              <p class="text-muted">Apprentice</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <p class="large text-muted">Kouvee Pet Shop merupakan sebuah toko hewan yang sudah berdiri sejak tahun 2018 menyediakan produk dan jasa layanan yang berada di Kota Yogyakarta. 
              Kouvee Pet Shop menyediakan berbagai macam produk untuk hewan kesayangan anda seperti makanan, aksesoris, perlengkapan dan lain-lain sesuai kebutuhan hewan kesayangan anda. 
              Selain menjual berbagai macam produk, Kouvee Pet Shop juga menyediakan jasa layanan seperti grooming dan penitipan hewan.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: white;  
}

#mainNav {
  background-color: black;
}

.img{
  height: 200px;
  object-fit: cover;
  object-position: center;
}
</style>

<script>
export default {
  data () { 
        return {
            clickPrice: 0,
            clickQty: 0,
            clickService: 0,
            dialog: false, 
            keyword: '',
            keywordService: '',
            data: [],
            serviceDetails: [],
            services: [],
            snackbar: false,
            color: null, 
            text: '', 
            load: false,
            form: { 
                productName : '',
                productQuantity: '',
                productPrice: '',
                meassurement: '',
                minimumQty: '',
                image: '',
            },
            product : {}, 
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
      } 
  },
  computed:{
    FilterAndSortProduct(){
      let filter = new RegExp(this.keyword, 'i')
      return this.data.filter(el => el.product.productName.match(filter))
    },
    FilterAndSortService(){
      let filter = new RegExp(this.keywordService, 'i')
      return this.serviceDetails.filter(el => el.completeName.match(filter))
    },
  },
  methods:{
    getData(){ 
        var uri = this.$apiUrl + 'noa/products/getall'
        this.$http.get(uri).then(response =>{ 
            this.data = []
            response.data.data.forEach(element => {
                this.data.push({
                    product: element.product,
                    img_url: element.image_url
                }) 
            });
        })  
    },
    getDataService(){ 
        var uri = this.$apiUrl + 'noa/servicedetails/getall' 
        this.$http.get(uri).then(response =>{ 
            this.serviceDetails = []
            response.data.data.forEach(element => {
                this.serviceDetails.push({
                    completeName: element.complete_name,
                    id: element.service_detail.id,
                    price: element.service_detail.price,
                    petTypeId: element.service_detail.PetTypes_id,
                    petSizeId: element.service_detail.PetSizes_id,
                    serviceId: element.service_detail.Services_id
                })
            }); 
        }) 
    },
    sortByPriceProduct(){
      if(this.clickPrice === 0){
        this.data.sort((a,b) => a.product.productPrice > b.product.productPrice ? 1 : -1)
        this.clickPrice = 1;
      }else if(this.clickPrice === 1){
        this.data.sort((a,b) => a.product.productPrice < b.product.productPrice ? 1 : -1)
        this.clickPrice = 0;
      }
    },
    sortByQtyProduct(){
      if(this.clickQty === 0){
        this.data.sort((a,b) => a.product.productQuantity > b.product.productQuantity ? 1 : -1)
        this.clickQty = 1;
      }else if(this.clickQty === 1){
        this.data.sort((a,b) => a.product.productQuantity < b.product.productQuantity ? 1 : -1)
        this.clickQty = 0;
      }
    },
    sortByPriceService(){
      if(this.clickService === 0){
        this.serviceDetails.sort((a,b) => a.price > b.price ? 1 : -1)
        this.clickService = 1;
      }else if(this.clickService === 1){
        this.serviceDetails.sort((a,b) => a.price < b.price ? 1 : -1)
        this.clickService = 0;
      }
    },
  },
  mounted(){ 
      this.getData();
      this.getDataService();
  },
}
</script>
