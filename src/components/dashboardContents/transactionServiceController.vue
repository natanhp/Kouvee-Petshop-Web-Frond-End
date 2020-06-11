<template>
    <div id="app">
        <v-app id="inspire">
            <v-stepper v-model="e6" vertical>
                <v-stepper-step :complete="e6 > 1" step="1">
                    Layanan
                </v-stepper-step>

                <v-stepper-content step="1">

                            <v-stepper v-model="e1">
                                <v-stepper-header>
                                    
                                    <v-stepper-step editable step="1">Pilih Customer</v-stepper-step>
                            
                                    <v-divider></v-divider>
                            
                                    <v-stepper-step editable step="2">Layanan Belum Selesai</v-stepper-step>
                            
                                </v-stepper-header>
                            
                                <v-stepper-items>
                                    <v-stepper-content step="1">
                                    
                                        <v-card>
                                            <v-container grid-list-md mb-0>
                                                <h2 class="text-md-center">Data Customer</h2> 
                                                <v-layout row wrap style="margin:10px"> 

                                                    <v-flex xs6 class="text-right"> 
                                                        <v-text-field 
                                                            v-model="searchCustomer"
                                                            append-icon="mdi-search"
                                                            label="Search" 
                                                            hide-details 
                                                        ></v-text-field>
                                                    </v-flex>

                                                </v-layout>
                                                
                                                <v-data-table 
                                                    :headers="headersCustomer" 
                                                    :items="customers" 
                                                    :search="searchCustomer" 
                                                    :loading="loadCustomer" 
                                                    > 
                                                    <template v-slot:body="{ items }"> 
                                                        <tbody> 
                                                            <tr v-for="(item,index) in items" :key="index"> 
                                                                <td>{{ index + 1 }}</td> 
                                                                <td>{{ item.name }}</td> 
                                                                <td>{{ item.address}}</td> 
                                                                <td>{{ item.dateBirth }}</td> 
                                                                <td>{{item.phoneNumber}}</td>
                                                                <td> 
                                                                    <v-btn 
                                                                        icon 
                                                                        color="indigo" 
                                                                        light 
                                                                        @click='chooseCustomer(item)' 
                                                                    > 
                                                                        <v-icon>mdi-check</v-icon>
                                                                    </v-btn>
                                                                </td> 
                                                            </tr> 
                                                        </tbody> 
                                                    </template> 
                                                </v-data-table>

                                            </v-container> 
                                        </v-card>

                                        <v-snackbar 
                                            v-model="snackbar"
                                            :color="color" 
                                            :multi-line="true" 
                                            :timeout="3000"
                                        > 
                                            {{ text }} 
                                            <v-btn 
                                                dark 
                                                text 
                                                @click="snackbar = false" 
                                            > 
                                                Close 
                                            </v-btn> 
                                        </v-snackbar>
                                    
                                    </v-stepper-content>
                            
                                    <v-stepper-content step="2">
                                    
                                        <v-card>
                                            <v-container grid-list-md mb-0>
                                                <h2 class="text-md-center">Data Customer</h2> 
                                                <v-layout row wrap style="margin:10px"> 

                                                    <v-flex xs6 class="text-right"> 
                                                        <v-text-field 
                                                            v-model="searchUnfinished"
                                                            append-icon="mdi-search"
                                                            label="Search" 
                                                            hide-details 
                                                        ></v-text-field>
                                                    </v-flex>

                                                </v-layout>
                                                
                                                <v-data-table 
                                                    :headers="headersUnfinished" 
                                                    :items="unFinished" 
                                                    :search="searchUnfinished" 
                                                    :loading="loadUnfinished" 
                                                    > 
                                                    <template v-slot:body="{ items }"> 
                                                        <tbody> 
                                                            <tr v-for="(item,index) in items" :key="index"> 
                                                                <td>{{ index + 1 }}</td> 
                                                                <td>{{ item.ServiceTransaction_id}}</td>
                                                                <td>{{ item.customer.name }}</td>  
                                                                <td>{{ item.pet.name}}</td> 
                                                                <td>{{item.service.complete_name}}</td>
                                                                <td>{{item.isFinished}}</td>
                                                                <td> 
                                                                    <v-btn 
                                                                        icon 
                                                                        color="indigo" 
                                                                        light
                                                                        @click="finish(item,index)"
                                                                    > 
                                                                        <v-icon>mdi-check</v-icon>
                                                                    </v-btn>
                                                                </td> 
                                                            </tr> 
                                                        </tbody> 
                                                    </template> 
                                                </v-data-table> 
                                            </v-container> 
                                        </v-card>
                            
                                    </v-stepper-content>

                                </v-stepper-items>
                            </v-stepper>

                    <v-btn color="primary" v-if="info === true" @click="setForm()">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="2">Pilih Hewan Customer</v-stepper-step>

                <v-stepper-content step="2">
                    
                    <v-card>
                        <v-container grid-list-md mb-0>
                            <h2 class="text-md-center">Data Hewan</h2> 
                            <v-layout row wrap style="margin:10px"> 

                                <v-flex xs6 class="text-right"> 
                                    <v-text-field 
                                        v-model="searchPets"
                                        append-icon="mdi-search"
                                        label="Search" 
                                        hide-details 
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                            
                            <v-data-table 
                                :headers="headersPet" 
                                :items="petsTemp" 
                                :search="searchPets" 
                                :loading="loadPets" 
                                > 
                                <template v-slot:body="{ items }"> 
                                    <tbody> 
                                        <tr v-for="(item,index) in items" :key="index"> 
                                            <td>{{ index + 1 }}</td> 
                                            <td>{{ item.pet.name }}</td>
                                            <td>{{ item.size }}</td>  
                                            <td>{{ item.type}}</td> 
                                            <td> 
                                                <v-btn 
                                                    icon 
                                                    color="indigo" 
                                                    light 
                                                    @click='choosePet(item)' 
                                                > 
                                                    <v-icon>mdi-check</v-icon>
                                                </v-btn>
                                            </td> 
                                        </tr> 
                                    </tbody> 
                                </template> 
                            </v-data-table> 
                        </v-container> 
                    </v-card>

                     <v-snackbar 
                        v-model="snackbar"
                        :color="color" 
                        :multi-line="true" 
                        :timeout="3000"
                    > 
                        {{ text }} 
                        <v-btn 
                            dark 
                            text 
                            @click="snackbar = false" 
                        > 
                            Close 
                        </v-btn> 
                    </v-snackbar>

                    <v-btn color="primary" @click="setForm()">Continue</v-btn>
                    <v-btn text @click="backCustomer()">Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 3" step="3">Pilih Layanan Yang Diinginkan</v-stepper-step>

                <v-stepper-content step="3">
                   
                   <v-card>
                        <v-container grid-list-md mb-0>
                            <h2 class="text-md-center">Data Layanan</h2> 
                            <v-layout row wrap style="margin:10px"> 

                                <v-flex xs6 class="text-right"> 
                                    <v-text-field 
                                        v-model="searchService"
                                        append-icon="mdi-search"
                                        label="Search" 
                                        hide-details 
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                            
                            <v-data-table 
                                :headers="headersService" 
                                :items="servicesTemp" 
                                :search="searchService" 
                                :loading="loadService" 
                                > 
                                <template v-slot:body="{ items }"> 
                                    <tbody> 
                                        <tr v-for="(item,index) in items" :key="index"> 
                                            <td>{{ index + 1 }}</td> 
                                            <td>{{ item.completeName }}</td>
                                            <td>{{ item.price }}</td>  
                                            <td> 
                                                <v-btn 
                                                    icon 
                                                    color="indigo" 
                                                    light
                                                    @click="chooseService(item)"
                                                > 
                                                    <v-icon>mdi-check</v-icon>
                                                </v-btn>
                                            </td> 
                                        </tr> 
                                    </tbody> 
                                </template> 
                            </v-data-table> 
                        </v-container> 
                    </v-card>

                    <v-snackbar 
                        v-model="snackbar"
                        :color="color" 
                        :multi-line="true" 
                        :timeout="3000"
                    > 
                        {{ text }} 
                        <v-btn 
                            dark 
                            text 
                            @click="snackbar = false" 
                        > 
                            Close 
                        </v-btn> 
                    </v-snackbar>

                    <v-btn color="primary" @click="nextConfirm()">Continue</v-btn>
                    <v-btn text @click="backPet()">Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step step="4">Konfirmasi Layanan</v-stepper-step>
                <v-stepper-content step="4">

                    <v-card>
                        <v-container grid-list-md mb-0>
                            <h2 class="text-md-center">Data Layanan</h2> 
                            <v-layout row wrap style="margin:10px"> 

                                <v-flex xs6 class="text-right"> 
                                    <v-text-field 
                                        v-model="searchTabel"
                                        append-icon="mdi-search"
                                        label="Search" 
                                        hide-details 
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                            
                            <v-data-table 
                                :headers="headersTabel" 
                                :items="serviceTransactionDetails" 
                                :search="searchTabel" 
                                :loading="loadTabel" 
                                > 
                                <template v-slot:body="{ items }"> 
                                    <tbody> 
                                        <tr v-for="(item,index) in items" :key="index"> 
                                            <td>{{ index + 1 }}</td> 
                                            <td>{{ item.customerName}}</td>
                                            <td>{{ item.petName}}</td>
                                            <td>{{ item.serviceName}}</td>
                                            <td>{{ item.serviceQty}}</td>
                                            <td>{{ item.subTotal }}</td>  
                                            <td>
                                                <v-btn
                                                        icon
                                                        color="error"
                                                        light 
                                                        @click="deleteTabel(index)"
                                                    > 
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn> 
                                            </td>
                                        </tr> 
                                    </tbody> 
                                </template> 
                            </v-data-table> 
                        </v-container> 
                    </v-card>
                     <v-snackbar 
                        v-model="snackbar"
                        :color="color" 
                        :multi-line="true" 
                        :timeout="3000"
                    > 
                        {{ text }} 
                        <v-btn 
                            dark 
                            text 
                            @click="snackbar = false" 
                        > 
                            Close 
                        </v-btn> 
                    </v-snackbar>

                    <v-btn color="primary" @click="setConfirm()">Continue</v-btn>
                    <v-btn text  @click="e6 = 3">Cancel</v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-app>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                e6: 1,
                e1: 1,
                typeInput: '',
                snackbar: false, 
                color: null, 
                text: '',
                info: false,

                // Customer
                searchCustomer: '',
                loadCustomer: '',
                headersCustomer:[
                    { 
                        text: 'No', 
                        value: 'no', 
                    }, 
                    { 
                        text: 'Nama', 
                        value: 'name' 
                    },
                    { 
                        text: 'Alamat', 
                        value: 'address' 
                    }, 
                    { 
                        text: 'Tanggal Lahir', 
                        value: 'dateBirth' 
                    }, 
                    {
                        text: 'Nomor Telepon',
                        value: 'phoneNumber'
                    },
                    { 
                        text: 'Aksi', 
                        value: null 
                    }, 
                ],
                customers: [],
                formCustomer:{
                    id: '',
                    nama: '',
                    alamat: '',
                    tanggalLahir: '',
                    noTelepon: '',
                },

                // Hewan
                searchPets: '',
                headersPet:[
                    { 
                        text: 'No', 
                        value: 'no', 
                    }, 
                    { 
                        text: 'Nama Hewan', 
                        value: 'name' 
                    },
                    { 
                        text: 'Tipe Hewan', 
                        value: 'type' 
                    },
                    { 
                        text: 'Ukuran Hewan', 
                        value: 'size' 
                    },
                    { 
                        text: 'Aksi', 
                        value: null 
                    }, 
                ],
                loadPets: '',
                pets: [],
                petsTemp: [],
                formPet:{
                    id: '',
                    nama: '',
                    tipe: '',
                    ukuran: '',
                    size_id: '',
                    type_id: '',
                },

                // Service
                searchService: '',
                headersService: [
                    { 
                        text: 'No', 
                        value: 'no', 
                    }, 
                    { 
                        text: 'Nama Layanan', 
                        value: 'completeName' 
                    },
                    { 
                        text: 'Harga Layanan', 
                        value: 'price' 
                    },
                    { 
                        text: 'Aksi', 
                        value: null 
                    }, 
                ],
                loadService: '',
                services: [],
                servicesTemp: [],
                formService:{
                    id: '',
                    nama : '',
                    harga : '',
                },

                // Tabel Penampung
                searchTabel: '',
                headersTabel: [
                    { 
                        text: 'No', 
                        value: 'no', 
                    }, 
                    { 
                        text: 'Nama Customer', 
                        value: 'customerName' 
                    },
                    { 
                        text: 'Nama Hewan Peliharaan', 
                        value: 'petName' 
                    },
                    { 
                        text: 'Nama Layanan', 
                        value: 'serviceName' 
                    },
                    { 
                        text: 'Jumalah Layanan', 
                        value: 'serviceQty' 
                    },
                    { 
                        text: 'Sub Total', 
                        value: 'subTotal' 
                    },
                    { 
                        text: 'Aksi', 
                        value: null 
                    }, 
                ],
                loadTabel: '',
                serviceTransactionDetails: [],
                tabelService:[{
                    'ServiceDetails_id' : '',
                    'customerName' : '',
                    'petName' : '',
                    'serviceName' : '',
                    'serviceQty' : '',
                    'subTotal' : '',
                    'isFinished' : '',
                    'createdBy' : ''
                }],

                // Unfinished
                unFinished: [],
                searchUnfinished: '',
                loadUnfinished: '',
                headersUnfinished: [
                    { 
                        text: 'No', 
                        value: 'no', 
                    }, 
                    { 
                        text: 'Id Layanan', 
                        value: 'ServiceTransaction_id' 
                    },
                    { 
                        text: 'Nama Customer', 
                        value: 'customer.name' 
                    },
                    { 
                        text: 'Nama Hewan Peliharaan', 
                        value: 'pet.name' 
                    },
                    { 
                        text: 'Nama Layanan', 
                        value: 'complete_name' 
                    },
                    { 
                        text: 'Selesai', 
                        value: 'isFinished' 
                    },
                    { 
                        text: 'Aksi', 
                        value: null 
                    }, 
                ],

                //lain
                j : -1,
            }
        },
        methods: {
            getDataCustomers(){ 
                var uri = this.$apiUrl + 'customers/getall' 
                this.$http.get(uri).then(response =>{ 
                    this.customers=response.data.data
                }) 
            },
            getDataPets(){
                var uri = this.$apiUrl + 'pets/getall' 
                this.$http.get(uri).then(response =>{ 
                    this.pets = response.data.data
                }) 
            },
            getDataService(){ 
                var uri = this.$apiUrl + 'noa/servicedetails/getall' 
                this.$http.get(uri).then(response =>{ 
                    this.services = []
                    response.data.data.forEach(element => {
                        this.services.push({
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
            getDataUnfinished(){
                var uri = this.$apiUrl + 'servicetransaction/cs/getallunfinishedservice' 
                this.$http.get(uri).then(response =>{ 
                    this.unFinished = response.data.data
                }) 
            },
            setConfirm(){
                let temp = 0;
                
                for(let i = 0 ; i<this.serviceTransactionDetails.length ; i++){
                    temp = parseInt(temp) + parseInt(this.serviceTransactionDetails[i].subTotal)
                }

                let serfin = {
                    serviceTransactionDetails : this.serviceTransactionDetails,
                    createdBy : this.$store.getters.loggedInEmployee,
                    total : temp,
                    pets_id : this.formPet.id,
                }

                console.log(this.serviceTransactionDetails)

                var uri =this.$apiUrl + 'servicetransaction/cs/insert' 
                this.$http.post(uri,this.$qs.stringify(serfin), {headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }}).then(response =>{ 
                        this.snackbar = true; //mengaktifkan snackbar 
                        this.color = 'green'; //memberi warna snackbar 
                        this.text = response.data.message; //memasukkan pesan ke snackbar 
                        this.load = false; 
                        this.dialog = false;
                        this.typeInput = '';
                        this.restart();
                        this.getDataUnfinished();
                        this.e6 = 1;
                    }).catch(error =>{ 
                        this.errors = error 
                        this.snackbar = true; 
                        this.text = 'Try Again'; 
                        this.color = 'red'; 
                        this.load = false; 
                    })
            },
            finish(item,index){
                let finish = {
                    id : item.id,
                    updatedBy : this.$store.getters.loggedInEmployee
                }

                console.log(finish)

                var uri =this.$apiUrl + 'servicetransaction/cs/finish' 
                this.$http.put(uri,this.$qs.stringify(finish), {headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }}).then(response =>{ 
                        this.snackbar = true; //mengaktifkan snackbar 
                        this.color = 'green'; //memberi warna snackbar 
                        this.text = response.data.message; //memasukkan pesan ke snackbar 
                        this.load = false; 
                        this.dialog = false;
                        this.getDataUnfinished()
                    }).catch(error =>{ 
                        this.errors = error 
                        this.snackbar = true; 
                        this.text = 'Try Again'; 
                        this.color = 'red'; 
                        this.load = false; 
                    })
            },
            chooseCustomer(item){
                this.typeInput = 'Customer';
                this.formCustomer.id = item.id;
                this.formCustomer.nama = item.name;
                this.formCustomer.alamat = item.address;
                this.formCustomer.tanggalLahir = item.dateBirth;
                this.formCustomer.noTelepon = item.phoneNumber;
                this.snackbar = true; //mengaktifkan snackbar 
                this.color = 'green'; //memberi warna snackbar 
                this.text = 'Berhasil Memilih Customer'; //memasukkan pesan ke snackbar 
                this.loadService = false; 
                this.info = true;
            },
            choosePet(item){
                this.typeInput = 'Pet';
                this.formPet.id = item.pet.id;
                this.formPet.nama = item.pet.name;
                this.formPet.tipe = item.type;
                this.formPet.ukuran = item.size;
                this.formPet.size_id = item.pet.PetSizes_id;
                this.formPet.type_id = item.pet.PetTypes_id;
                this.snackbar = true; //mengaktifkan snackbar 
                this.color = 'green'; //memberi warna snackbar 
                this.text = 'Berhasil Memilih Hewan'; //memasukkan pesan ke snackbar 
                this.loadService = false; 
            },
            chooseService(item){
                this.typeInput = 'Service';
                this.formService.id = item.id
                this.formService.nama = item.completeName
                this.formService.price = item.price

                let service = {
                    serviceId : this.formService.id,
                    customerName : this.formCustomer.nama,
                    petName : this.formPet.nama,
                    serviceName : this.formService.nama,
                    serviceQty : 1,
                    subTotal : this.formService.price,
                    isFinished : 0
                }

                for(let i=0;i<this.serviceTransactionDetails.length;i++){
                    if(this.serviceTransactionDetails[i].ServiceDetails_id === service.serviceId){
                        this.j = i
                    }
                }

                if(this.j === -1){
                    for(let i=0 ; i<this.tabelService.length ; i++){
                        this.serviceTransactionDetails.push({
                            'ServiceDetails_id' : service.serviceId,
                            'customerName' : service.customerName,
                            'petName' : service.petName,
                            'serviceName' : service.serviceName,
                            'serviceQty' : service.serviceQty,
                            'subTotal' : service.subTotal,
                            'isFinished' : service.isFinished,
                            'createdBy' : this.$store.getters.loggedInEmployee
                        })
                    }
                    this.snackbar = true; //mengaktifkan snackbar 
                    this.color = 'green'; //memberi warna snackbar 
                    this.text = 'Berhasil Menambah'; //memasukkan pesan ke snackbar 
                    this.loadService = false;
                }else{
                    this.snackbar = true; //mengaktifkan snackbar 
                    this.color = 'red'; //memberi warna snackbar 
                    this.text = 'Data Sudah Ada'; //memasukkan pesan ke snackbar 
                    this.loadService = false; 
                }

                this.j = -1;
            },
            nextPets(){
                this.typeInput = '';
                let customer = {
                    id : this.formCustomer.id,
                    nama : this.formCustomer.nama,
                    alamat : this.formCustomer.alamat,
                    tanggalLahir : this.formCustomer.tanggalLahir,
                    noTelepon : this.formCustomer.alamat
                }

                this.pets.forEach(element => {
                    if(element.customer === customer.nama){
                        this.petsTemp.push(element)
                    }
                });

                this.e6 = 2;
            },
            backCustomer(){
                this.petsTemp = [];
                this.formCustomer = {};
                this.info = false
                this.e6 = 1;
            },
            backPet(){
                this.servicesTemp = [];
                this.formPet = {};
                this.e6 = 2;
            },
            nextService(){
                this.typeInput = '';

                console.log(this.formPet.size_id)
                console.log(this.formPet.type_id)
                
                this.services.forEach(element => {
                    if(element.petSizeId == this.formPet.size_id && element.petTypeId == this.formPet.type_id){
                        this.servicesTemp.push(element)
                    }
                });

                this.e6 = 3;
            },
            nextConfirm(){
                this.e6 = 4
            },
            setForm(){
                if(this.typeInput === 'Customer'){
                    this.nextPets();
                }else if(this.typeInput === 'Pet'){
                    this.nextService();
                }else if(this.typeInput === 'Service'){
                    this.nextConfirm();
                }
            },
            deleteTabel(index){
                this.serviceTransactionDetails.splice(index,1)
            },
            restart(){
                this.formCustomer = {}
                this.formPet = {}
                this.formService = {}
                this.petsTemp = []
                this.servicesTemp = []
                this.serviceTransactionDetails = []
                this.info = false
            }
        },
        mounted() {
            this.getDataCustomers();
            this.getDataPets();
            this.getDataService();
            this.getDataUnfinished();
        },
    }
</script>