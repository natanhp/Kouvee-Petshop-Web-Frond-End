<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Customer</h2> 
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
                            Tambah Customer
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
                    :items="customers" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.name }}</td> 
                                <td>{{ item.address}}</td> 
                                <td>{{ item.dateBirth }}</td> 
                                <td>{{item.phoneNumber}}</td>
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
            </v-container> 
        </v-card> 
        <v-dialog v-model="dialog" persistent max-width="600px"> 
            <v-card> 
                <v-card-title> 
                    <span class="headline">Data Pegawai</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-form ref="form">
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <v-text-field label="Nama*" v-model="form.name" :rules="[() => !!form.name || 'Nama tidak boleh kosong']" required></v-text-field> 
                            </v-col> 

                            <v-col cols="12">
                                <v-text-field label="Alamat*" v-model="form.address" :rules="[() => !!form.address || 'Alamat tidak boleh kosong']" required></v-text-field>
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
                                <v-text-field label="Nomor Telepon*" v-model="form.phoneNumber" :rules="[() => !!form.phoneNumber.match(/^[0-9]*$/) && !!form.phoneNumber || 'Nomor telepon harus angka dan tidak boleh kosong']" required></v-text-field> 
                            </v-col> 
                        </v-row> 
                    </v-container>
                    </v-form>
                    <small>*Diharuskan untuk mengisi data</small> 
                </v-card-text> 
                <v-card-actions> 
                    <v-spacer></v-spacer> 
                    <v-btn color="blue darken-1" text @click="closeCreateDialog()">Batal</v-btn> 
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
<!-- 
        <div class="text-center">
        <v-menu>
            <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                <v-btn
                    color="primary"
                    dark
                    v-on="{ ...tooltip, ...menu }"
                >Dropdown w/ Tooltip</v-btn>
                </template>
                <span>Im A ToolTip</span>
            </v-tooltip>
            </template>
            <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="pick"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
        </div> -->

    </v-container> 
</template> 

<script> 
export default { 
    data () { 
        return { 
            dialog: false, 
            calendarDialog: false,
            keyword: '', 
            headers: [ 
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
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                name : '', 
                address : '', 
                dateBirth : '',
                phoneNumber : '',
            }, 
            typeInput: 'new', 
            errors : '', 
            updatedId : '',
        }
    }, 
    methods:{ 
        getData(){ 
            var uri = this.$apiUrl + 'customers/getall' 
            this.$http.get(uri).then(response =>{ 
                this.customers=response.data.data
            }) 
        },
        sendData(){ 
            let customer = {
                name: this.form.name,
                address: this.form.address,
                dateBirth: this.form.dateBirth,
                phoneNumber: this.form.phoneNumber,
                createdBy: this.$store.getters.loggedInEmployee
            }

            var uri =this.$apiUrl + 'customers/insert' 
            this.load = true 
            this.$http.post(uri, this.$qs.stringify(customer), {headers: {
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
           let customer = {
                id: this.updatedId,
                name: this.form.name,
                address: this.form.address,
                dateBirth: this.form.dateBirth,
                phoneNumber: this.form.phoneNumber,
                updatedBy: this.$store.getters.loggedInEmployee
            }

            var uri = this.$apiUrl + 'customers/update'; 
            this.load = true 
            this.$http.put(uri,this.$qs.stringify(customer), {headers: {
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
            this.typeInput = 'edit'; 
        }) 
        }, 
        editHandler(item){ 
            this.typeInput = 'edit' 
            this.dialog = true
            this.form.name = item.name
            this.form.address = item.address 
            this.form.dateBirth = item.dateBirth
            this.form.phoneNumber = item.phoneNumber
            this.updatedId = item.id
        }, 
        deleteData(deleteId){
            var uri = this.$apiUrl + 'customers/delete/' + deleteId + '/' + this.$store.getters.loggedInEmployee;
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
                console.log("dddd")
                this.updateData() 
            } 
        }, 
        resetForm(){ 
           this.$refs.form.reset()
        },
        closeCreateDialog() {
            this.resetForm()
            this.dialog = false
            this.typeInput = 'new'
        }
        }, 
        mounted(){ 
            this.getData();
        }, 
        watch: {
            passwordConfirm: 'validateForm'
        }
    } 
</script>