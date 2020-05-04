<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Hewan</h2> 
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
                            Tambah Hewan
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
                    :items="pets" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.name }}</td> 
                                <td>{{ item.type }}</td>
                                <td>{{ item.size }}</td> 
                                <td>{{ item.dateBirth }}</td> 
                                <td>{{ item.customer }}</td>

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
                <!-- <v-flex xs6 class="text-right" v-if="change"> 
                    <v-text-field 
                        v-model="keywordLog"
                        append-icon="mdi-search"
                        label="Search" 
                        hide-details 
                    ></v-text-field>
                </v-flex>
                <v-data-table v-if="change"
                :headers="HeadLog" 
                :items="users" 
                :search="keywordLog" 
                :loading="load" >
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.createdAt }}</td> 
                                <td>{{ item.updateAt }}</td> 
                                <td>{{ item.deletedAt}}</td> 
                                <td>{{ item.createdBy }}</td> 
                                <td>{{item.updateBy}}</td>
                                <td>{{item.updatedBy}}</td>
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table> -->
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
                                <v-text-field label="*Nama Hewan" v-model="form.name" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-menu
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="form.dateBirth"
                                        label="Tanggal Lahir*"
                                        prepend-icon="event"
                                        readonly
                                        :rules="[() => !!form.dateBirth || 'Tanggal lahir tidak boleh kosong']"
                                        required
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form.dateBirth"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12"> 
                                <v-select class="my-2" :items="petTypes" label="Tipe*" item-text="type" v-model="form.petType" required></v-select>
                            </v-col> 
                            <v-col cols="12"> 
                                <v-select class="my-2" :items="petSizes" label="Ukuran*" item-text="size" v-model="form.petSize" required></v-select>
                            </v-col> 
                            <v-col cols="12"> 
                                <v-select class="my-2" :items="customers" label="Pemilik*" item-text="customer" v-model="form.customer" required></v-select>
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
                    text: 'Tanggal Lahir', 
                    value: 'dateBirth' 
                },
                { 
                    text: 'Nama Pemilik', 
                    value: 'customer' 
                },
                { 
                    text: 'Aksi', 
                    value: null 
                }, 
            ], 
            // change: false,
            // keyworLog: '',
            // HeadLog:[
            //     { 
            //         text: 'No', 
            //         value: 'no', 
            //     }, 
            //     {
            //         text: 'createdAt',
            //         value: 'createdAt',
            //     },
            //     {
            //         text: 'updateAt',
            //         value: 'updateAt',
            //     },
            //     {
            //         text: 'deletedAt',
            //         value: 'deletedAt',
            //     },
            //     {
            //         text: 'createdBy',
            //         value: 'createdBy',
            //     },
            //     {
            //         text: 'updateBy',
            //         value: 'updateBy',
            //     },
            //     {
            //         text: 'updatedBy',
            //         value: 'updatedBy',
            //     },
            // ],
            pets: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                name: '',
                dateBirth: '',
                customer: '',
                petType: '',
                petSize : '', 
                price: ''
               
            },
            customers: [],
            petTypes: [],
            petSizes: [],
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
        }
    }, 
    methods:{ 
        getData(){ 
            var uri = this.$apiUrl + 'pets/getall' 
            this.$http.get(uri).then(response =>{ 
                this.pets = []
                response.data.data.forEach(element => {
                    this.pets.push({
                        id: element.pet.id,
                        name: element.pet.name,
                        dateBirth: element.pet.dateBirth,
                        type: element.type,
                        size: element.size,
                        customer: element.customer,
                        petTypeId: element.pet.PetTypes_id,
                        petSizeId: element.pet.PetSizes_id,
                        customerId: element.pet.Customers_id
                    })
                }); 
            }) 
        },
        getCustomers() {
                var uri = this.$apiUrl + 'customers/getall'
                this.$http.get(uri).then(response =>{
                    this.customers = [] 
                    response.data.data.forEach(element => {
                        this.customers.push({
                            id: element.id,
                            customer: element.name
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
            var customerId = ''
            var petTypeId = ''
            var petSizeId = ''

            this.customers.forEach(element => {
                if(element.customer === this.form.customer) {
                    customerId = element.id
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

            let pet = {
                Customers_id: customerId,
                PetTypes_id: petTypeId,
                PetSizes_id: petSizeId,
                name: this.form.name,
                dateBirth: this.form.dateBirth,
                createdBy: this.$store.getters.loggedInEmployee
            }

            var uri =this.$apiUrl + 'pets/insert' 
            this.load = true 
            this.$http.post(uri, this.$qs.stringify(pet), {headers: {
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
            var customerId = ''
            var petTypeId = ''
            var petSizeId = ''

            this.customers.forEach(element => {
                if(element.customer === this.form.customer) {
                    customerId = element.id
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

            let pet = {
                id: this.updatedId,
                Customers_id: customerId,
                PetTypes_id: petTypeId,
                PetSizes_id: petSizeId,
                name: this.form.name,
                dateBirth: this.form.dateBirth,
                updatedBy: this.$store.getters.loggedInEmployee
            }

            var uri = this.$apiUrl + 'pets/update' 
            this.load = true 
            this.$http.put(uri, this.$qs.stringify(pet), {headers: {
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

            this.form.customer = this.getCustomerFromId(item.customerId)
            this.form.petType = this.getPetTypeFromId(item.petTypeId)
            this.form.petSize = this.getPetSizeFromId(item.petSizeId)
            this.form.name = item.name
            this.form.dateBirth = item.dateBirth

            this.updatedId = item.id 
        }, 
        deleteData(deleteId){ 
            var uri = this.$apiUrl + 'pets/delete/' + deleteId + '/' + this.$store.getters.loggedInEmployee
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
        getCustomerFromId(id) {
            let start = 0
            let end = this.customers.length-1

            while(start <= end) {
                let mid = Math.floor((start + end)/2)
                if(this.customers[mid].id === id) {
                    return this.customers[mid].customer
                }else if(this.customers[mid].id < id) {
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
            this.getCustomers()
            this.getPetTypes()
            this.getPetSizes()
        }
    } 
</script>