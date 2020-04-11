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
              <v-btn text large color="white" href="#team ">Tentang</v-btn>
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
          <!-- <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a> -->
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
        <div>
          <!-- Tampilan Produk -->
          <v-container>
            <v-toolbar flat color="white">
              <v-toolbar-title>Produk</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field v-model="keyword" append-icon="mdi-search" label="Pencarian" hide-details></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
            <v-row>
              <v-col cols="3" v-for="(item,index) in filter" :key="index">
                <v-card>
                  <v-list-item three-line>
                   <v-list-item-content>
                      <div class="overline mb-4"><v-img :src="item.img_url" max-width="200px" max-height="500px"></v-img></div>
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
        <div>
          <!-- Tampilan Layanan -->
          <v-container>
            <v-toolbar flat color="white">
              <v-toolbar-title>Layanan</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field v-model="keywordService" append-icon="mdi-search" label="Pencarian" hide-details></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
            <v-row>
              <v-col cols="3" v-for="(item,index) in filterService" :key="index">
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
        <!-- <div class="row text-center">
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">E-Commerce</h4>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Responsive Design</h4>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Web Security</h4>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
        </div> -->
      </div>
    </section>

    <!-- Team -->
    <section class="bg-light" id="team">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">Kelompok 2 P3L Kelas J</h2>
            <!-- <h3 class="section-subheading text-muted"></h3> -->
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="img/team/1.jpg">
              <h4>Natan HP</h4>
              <p class="text-muted">Scrum Master</p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="img/team/2.jpg">
              <h4>Larry</h4>
              <p class="text-muted">Apprentice</p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="img/team/3.jpg">
              <h4>Arum Puspa Belindo</h4>
              <p class="text-muted">Apprentice</p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="img/team/4.jpg">
              <h4>Nobel Husodo</h4>
              <p class="text-muted">Apprentice</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <p class="large text-muted">Sesuatu yang berat di mulai dari pikiran diri sendiri</p>
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
</style>

<script>
export default {
  data () { 
        return { 
            dialog: false, 
            keyword: '',
            keywordService: '',
            data: [],
            serviceDetails: [],
            services: [],
            petTypes: [],
            petSizes: [],
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
    filter(){
      return this.data.filter((data) => {
          return data.product.productName.toLowerCase().includes(this.keyword.toLowerCase())
      })
    },
    filterService(){
      return this.serviceDetails.filter((serviceDetails) => {
          return serviceDetails.completeName.toLowerCase().includes(this.keywordService.toLowerCase())
      })
    }
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
        getServices() {
                var uri = this.$apiUrl + 'services/getall'
                this.$http.get(uri).then(response =>{
                    this.services = [] 
                    response.data.data.forEach(element => {
                        this.services.push({
                            id: element.id,
                            service: element.serviceName
                        })
                    }) 
                }) 
        },
        getPetSizes() {
                var uri = this.$apiUrl + 'uni/petsizes/getall'
                this.$http.get(uri).then(response =>{
                    this.petSizes = [] 
                    response.data.data.forEach(element => {
                        this.petSizes.push({
                            id: element.id,
                            size: element.size
                        })
                    }) 
                }) 
        },
        getPetTypes() {
                var uri = this.$apiUrl + 'uni/pettypes/getall'
                this.$http.get(uri).then(response =>{
                    this.petTypes = []  
                    response.data.data.forEach(element => {
                        this.petTypes.push({
                            id: element.id,
                            type: element.type
                        })
                    }) 
                }) 
        },
  }, 
  mounted(){ 
      this.getData();
      this.getDataService();
      this.getServices()
      this.getPetTypes()
      this.getPetSizes()
  },
}
</script>
