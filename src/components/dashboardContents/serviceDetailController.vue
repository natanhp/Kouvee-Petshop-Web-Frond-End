<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Detail Layanan</h2> 
                <v-layout row wrap style="margin:10px"> 
                    <v-flex xs6> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3" 
                        @click="dialog = true"
                        >
                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Detail Layanan
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right"> 
                        <v-text-field 
                            v-model="keyword"
                            append-icon="mdi-search"
                            label="Search" 
                            hide-details 
                        ></v-text-field>
                       

                    </v-flex> 
                </v-layout> 
            
                <v-data-table 
                    :headers="headers" 
                    :items="serviceDetails" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.completeName }}</td> 
                                <td>{{ item.price }}</td> 
                        
                                <td class="text-center"> 
                                    <v-btn 
                                        icon 
                                        color="indigo" 
                                        light 
                                        @click="editHandler(item)" 
                                    > 
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn
                                        icon
                                        color="error"
                                        light 
                                        @click="deleteData(item.id)"
                                    > 
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn> 
                                </td> 
                            </tr> 
                        </tbody> 
                    </template> 
                </v-data-table>
                <v-switch 
                v-model="change" 
                label="LOG" 
                value="LOG"
                color = "green accent-3"
                />
                <v-flex xs6 class="text-right" v-if="change"> 
                    <v-text-field 
                        v-model="keywordLog"
                        append-icon="mdi-search"
                        label="Search" 
                        hide-details 
                    ></v-text-field>
                </v-flex>
                <v-data-table v-if="change"
                :headers="HeadLog" 
                :items="logs" 
                :search="keywordLog" 
                :loading="load" >
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.complete_name }}</td>
                                <td>{{ item.creator.name }}</td>
                                <td>{{ item.createdAt }}</td>
                                <td>{{ item.updater.name }}</td>
                                <td>{{ item.updatedAt }}</td>
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table>
            </v-container> 
        </v-card> 
        <v-dialog v-model="dialog" persistent max-width="600px"> 
            <v-card> 
                <v-card-title> 
                    <span class="headline">Data Layanan</span> 
                </v-card-title> 
                <v-card-text> 
                     <v-form ref="form">
                        <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <v-select class="my-2" :items="services" label="Layanan*" item-text="service" v-model="form.service" :rules="[() => !!form.service || 'Layanan tidak boleh kosong']" required></v-select>
                            </v-col> 
                            <v-col cols="12"> 
                                <v-select class="my-2" :items="petTypes" label="Tipe*" item-text="type" v-model="form.petType" :rules="[() => !!form.petType || 'Tipe Hewan tidak boleh kosong']" required></v-select>
                            </v-col> 
                            <v-col cols="12"> 
                                <v-select class="my-2" :items="petSizes" label="Ukuran*" item-text="size" v-model="form.petSize" :rules="[() => !!form.size || 'Ukuran tidak boleh kosong']" required></v-select>
                            </v-col> 
                            <v-col cols="12"> 
                                <v-text-field label="*Harga Layanan" v-model="form.price" :rules="[() => !!form.price.match(/^[0-9]*$/) && !!form.price || 'Harga tidak boleh kosong']" required></v-text-field>
                            </v-col>
                        </v-row> 
                        </v-container>
                     </v-form>
                    <small>*Diharuskan untuk mengisi data</small> 
                </v-card-text> 
                <v-card-actions> 
                    <v-spacer></v-spacer> 
                    <v-btn color="blue darken-1" text @click="closeForm()">Batal</v-btn> 
                    <v-btn color="blue darken-1" text @click="setForm()">Simpan</v-btn> 
                </v-card-actions> 
            </v-card> 
        </v-dialog> 
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
    </v-container> 
</template> 

<script> 
export default { 
    data () { 
        return { 
            dialog: false, 
            keyword: '', 
            headers: [ 
                { 
                    text: 'No', 
                    value: 'no', 
                }, 
                { 
                    text: 'Nama Layanan', 
                    value: 'completeName' 
                },
                { 
                    text: 'Harga', 
                    value: 'price' 
                },  
                { 
                    text: 'Aksi', 
                    value: null 
                }, 
            ], 
            logs:[],
            change: false,
            keywordLog: '',
            HeadLog:[
                { 
                    text: 'No', 
                    value: 'no', 
                }, 
                {
                    text: 'Name',
                    value: '',
                },
                {
                    text: 'Dibuat Oleh',
                    value: '',
                },
                {
                    text: 'Kapan Dibuat',
                    value: '',
                },
                {
                    text: 'Diedit Oleh',
                    value: '',
                },
                {
                    text: 'Kapan Diedit',
                    value: 'updateBy',
                },
            ],
            serviceDetails: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                service: '',
                petType: '',
                petSize : '', 
                price: ''
               
            },
            services: [],
            petTypes: [],
            petSizes: [],
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
        }
    }, 
    methods:{ 
        getData(){ 
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
        getDataLogs(){ 
            var uri = this.$apiUrl + 'log/servicedetail' 
            this.$http.get(uri).then(response =>{ 
                this.logs=response.data.data
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
        sendData(){ 
            var serviceId = ''
            var petTypeId = ''
            var petSizeId = ''

            this.services.forEach(element => {
                if(element.service === this.form.service) {
                    serviceId = element.id
                }
            })

            this.petTypes.forEach(element => {
                if(element.type === this.form.petType) {
                    petTypeId = element.id
                }
            })

            this.petSizes.forEach(element => {
                if(element.size === this.form.petSize) {
                    petSizeId = element.id
                }
            })

            let serviceDetail = {
                Services_id: serviceId,
                PetTypes_id: petTypeId,
                PetSizes_id: petSizeId,
                price: this.form.price,
                createdBy: this.$store.getters.loggedInEmployee
            }

            var uri =this.$apiUrl + 'servicedetails/insert' 
            this.load = true 
            this.$http.post(uri, this.$qs.stringify(serviceDetail), {headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar 
                this.color = 'green'; //memberi warna snackbar 
                this.text = response.data.message; //memasukkan pesan ke snackbar 
                
                this.load = false; 
                this.dialog = false 
                this.getData(); //mengambil data user 
                this.resetForm(); 
            }).catch(error =>{ 
                this.errors = error 
                this.snackbar = true; 
                this.text = 'Try Again'; 
                this.color = 'red'; 
                this.load = false; 
            }) 
        }, 
        updateData(){ 
            var serviceId = ''
            var petTypeId = ''
            var petSizeId = ''

            this.services.forEach(element => {
                if(element.service === this.form.service) {
                    serviceId = element.id
                }
            })

            this.petTypes.forEach(element => {
                if(element.type === this.form.petType) {
                    petTypeId = element.id
                }
            })

            this.petSizes.forEach(element => {
                if(element.size === this.form.petSize) {
                    petSizeId = element.id
                }
            })

            let serviceDetail = {
                id: this.updatedId,
                Services_id: serviceId,
                PetTypes_id: petTypeId,
                PetSizes_id: petSizeId,
                price: this.form.price,
                updatedBy: this.$store.getters.loggedInEmployee
            }

            var uri = this.$apiUrl + 'servicedetails/update' 
            this.load = true 
            this.$http.put(uri, this.$qs.stringify(serviceDetail), {headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }}).then(response =>{
            this.snackbar = true; //mengaktifkan snackbar 
            this.color = 'green'; //memberi warna snackbar 
            this.text = response.data.message; //memasukkan pesan ke snackbar 
            
            this.load = false; this.dialog = false 
            this.getData(); //mengambil data user 
            this.resetForm(); this.typeInput = 'new'; 
        }).catch(error =>{ 
            this.errors = error 
            this.snackbar = true; 
            this.text = 'Try Again'; 
            this.color = 'red'; 
            this.load = false; 
            this.typeInput = 'new'; 
        }) 
        }, 
        editHandler(item){ 
            this.typeInput = 'edit'; 
            this.dialog = true; 

            this.form.service = this.getServiceFromId(item.serviceId)
            this.form.petType = this.getPetTypeFromId(item.petTypeId)
            this.form.petSize = this.getPetSizeFromId(item.petSizeId)
            this.form.price = item.price

            this.updatedId = item.id 
        }, 
        deleteData(deleteId){ 
            var uri = this.$apiUrl + 'servicedetails/delete/' + deleteId
            this.$http.delete(uri).then(response =>{ 
                this.snackbar = true; 
                this.text = response.data.message; 
                this.color = 'green' 
                this.deleteDialog = false; 
                this.getData(); 
            }).catch(error =>{ 
                this.errors = error 
                this.snackbar = true; 
                this.text = 'Try Again'; 
                this.color = 'red'; 
            }) 
        }, 
        setForm(){ 
            if (this.typeInput === 'new') { 
                this.sendData() 
            } else { 
                this.updateData() 
            } 
        },
        closeForm() {
            this.resetForm()
            this.dialog = false
        },
        resetForm(){ 
            this.$refs.form.reset()
        },
        getServiceFromId(id) {
            let start = 0
            let end = this.services.length-1

            while(start <= end) {
                let mid = Math.floor((start + end)/2)
                if(this.services[mid].id === id) {
                    return this.services[mid].service
                }else if(this.services[mid].id < id) {
                    start = mid + 1;
                } else {
                    end = mid - 1;
                }
            }
        },
        getPetTypeFromId(id) {
            let start = 0
            let end = this.petTypes.length-1

            while(start <= end) {
                let mid = Math.floor((start + end)/2)
                if(this.petTypes[mid].id === id) {
                    return this.petTypes[mid].type
                }else if(this.petTypes[mid].id < id) {
                    start = mid + 1;
                } else {
                    end = mid - 1;
                }
            }
        },
        getPetSizeFromId(id) {
            let start = 0
            let end = this.petSizes.length-1

            while(start <= end) {
                let mid = Math.floor((start + end)/2)
                if(this.petSizes[mid].id === id) {
                    return this.petSizes[mid].size
                }else if(this.petSizes[mid].id < id) {
                    start = mid + 1;
                } else {
                    end = mid - 1;
                }
            }
        }
        }, 
        mounted(){ 
            this.getData()
            this.getServices()
            this.getPetTypes()
            this.getPetSizes()
            this.getDataLogs()
        }
    } 
</script>