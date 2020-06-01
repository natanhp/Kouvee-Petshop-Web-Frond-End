<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Pemasok</h2> 
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
                            Tambah Pemasok
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
                    :items="suppliers" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.name }}</td> 
                                <td>{{ item.address}}</td> 
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
                                        @click="deleteData(item.idSupplier)"
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
                                <td>{{ item.name }}</td>
                                <td>{{ item.creator.name }}</td>
                                <td>{{ item.createdAt }}</td>
                                <td>{{ item.updater.name }}</td>
                                <td>{{ item.updatedAt }}</td>
                                <td>{{ item.deletor.name }}</td>
                                <td>{{ item.deletedAt }}</td> 
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table>
            </v-container> 
        </v-card> 
        <v-dialog v-model="dialog" persistent max-width="600px"> 
            <v-card> 
                <v-card-title> 
                    <span class="headline">Data Pemasok</span> 
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
                                <v-text-field label="Nomor Telepon*" v-model="form.phoneNumber" :rules="[() => !!form.phoneNumber.match(/^[0-9]*$/) && !!form.phoneNumber || 'Nomor telepon harus angka dan tidak boleh kosong']" required></v-text-field> 
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
                    text: 'Nama', 
                    value: 'name' 
                }, 
                { 
                    text: 'Alamat', 
                    value: 'address' 
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
                {
                    text: 'Dihapus Oleh',
                    value: '',
                },
                {
                    text: 'Kapan Dihapus',
                    value: '',
                },
            ],
            suppliers: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                name : '', 
                address : '', 
                phoneNumber : '', 
            },
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
        }
    }, 
    methods:{ 
        getData(){ 
            var uri = this.$apiUrl + 'suppliers/getall' 
            this.$http.get(uri).then(response =>{ 
                this.suppliers=response.data.data 
            }) 
        },
        getDataLogs(){ 
            var uri = this.$apiUrl + 'log/supplier' 
            this.$http.get(uri).then(response =>{ 
                this.logs=response.data.data 
            }) 
        }, 
        sendData(){ 
            let supplier = {
                name: this.form.name,
                address: this.form.address,
                phoneNumber: this.form.phoneNumber,
                createdBy: this.$store.getters.loggedInEmployee
            }

            var uri =this.$apiUrl + 'suppliers/insert' 
            this.load = true 
            this.$http.post(uri,this.$qs.stringify(supplier), {headers: {
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
            let supplier = {
                idSupplier: this.updatedId,
                name: this.form.name,
                address: this.form.address,
                phoneNumber: this.form.phoneNumber,
                updatedBy: this.$store.getters.loggedInEmployee
            }

            var uri = this.$apiUrl + 'suppliers/update' 
            this.load = true 
            this.$http.put(uri,this.$qs.stringify(supplier), {headers: {
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
            this.form.name = item.name; 
            this.form.address = item.address; 
            this.form.phoneNumber = item.phoneNumber;
            this.updatedId = item.idSupplier 
        }, 
        deleteData(deleteId){ //menghapus data 
            var uri = this.$apiUrl + 'suppliers/delete/'+ deleteId +'/' + this.$store.getters.loggedInEmployee 
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
        closeForm() {
            this.resetForm()
            this.dialog = false
        },
        resetForm(){ 
            this.$refs.form.reset()
        } 
        }, 
        mounted(){ 
            this.getData();
            this.getDataLogs();
        },
    } 
</script>