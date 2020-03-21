<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Layanan</h2> 
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
                            Tambah Layanan
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
                    :items="services" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.serviceName }}</td> 
                        
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
                    <span class="headline">Data Layanan</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <v-text-field label="Nama Layanan*" v-model="form.serviceName" required></v-text-field> 
                            </v-col> 
                        </v-row> 
                    </v-container>
                    <small>*Diharuskan untuk mengisi data</small> 
                </v-card-text> 
                <v-card-actions> 
                    <v-spacer></v-spacer> 
                    <v-btn color="blue darken-1" text @click="dialog = false">Batal</v-btn> 
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
            keyword: '', 
            headers: [ 
                { 
                    text: 'ID', 
                    value: 'id', 
                }, 
                { 
                    text: 'Nama Layanan', 
                    value: 'serviceName' 
                }, 
                { 
                    text: 'Aksi', 
                    value: null 
                }, 
            ], 


            services: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                serviceName : '', 
               
            }, 
            service : new FormData, 
            typeInput: 'new', 
            errors : '', 
            updatedId : '', 
        }
            // {items: [
            //     { title: 'Click Me1' },
            //     { title: 'Click Me2' },
            //     { title: 'Click Me3' },
            //     { title: 'Click Me4' },
            // ], 
            // }
    }, 

    
            // data: () => ({
            // items: [
            //     { title: 'Click Me1' },
            //     { title: 'Click Me2' },
            //     { title: 'Click Me3' },
            //     { title: 'Click Me4' },
            // ],
            // }),
    methods:{ 
        getData(){ 

            // const auth = {
            //     headers: {Authorization: 'Bearer' + this.$cookie.get('TOKEN')} 
            // }
            var uri = this.$apiUrl + '/service' 
            this.$http.get(uri).then(response =>{ 
                this.services=response.data.message 
            }) 
        }, 
        sendData(){ 
            this.service.append('serviceName', this.form.serviceName); 
            

            // const auth = {
            //     headers: {Authorization: 'Bearer' + this.$cookie.get('TOKEN')} 
            // }
            var uri =this.$apiUrl + '/service' 
            this.load = true 
            this.$http.post(uri,this.service).then(response =>{ 
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
             this.service.append('serviceName', this.form.serviceName); 
            
            // const auth = {
            //     headers: {Authorization: 'Bearer' + this.$cookie.get('TOKEN')} 
            // }
            var uri = this.$apiUrl + '/service/' + this.updatedId; 
            this.load = true 
            this.$http.post(uri,this.service).then(response =>{
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
            this.form.serviceName = item.serviceName;  
            this.updatedId = item.id 
        }, 
        deleteData(deleteId){ //menghapus data 
        // const auth = {
        //         headers: {Authorization: 'Bearer' + this.$cookie.get('TOKEN')} 
        //     }
            var uri = this.$apiUrl + '/service/' + deleteId; //data dihapus berdasarkan id 
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
            this.form = { 
                serviceName : ''
            } 
        } 
        }, 
        mounted(){ 
            this.getData(); 
        }, 
    } 
</script>