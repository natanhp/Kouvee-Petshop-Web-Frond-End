<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Produk</h2> 
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
                            Tambah Produk
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right"> 
                        <v-text-field 
                            v-model="keyword"
                            append-icon="mdi-search"
                            label="Pencarian" 
                            hide-details 
                        ></v-text-field>
                    </v-flex> 
                </v-layout> 
            
                <v-data-table 
                    :headers="headers" 
                    :items="data" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td> 
                                <td><v-img :src="item.img_url" max-width="100px" max-height="100px"></v-img></td>
                                <td>{{ item.product.productName }}</td>
                                <td>{{ item.product.productQuantity }}</td> 
                                <td>{{ item.product.productPrice }}</td> 
                                <td>{{ item.product.meassurement }}</td>
                                <td>{{ item.product.minimumQty }}</td> 
                               
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
                                        @click="deleteData(item.product.id)"
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
                    <span class="headline">Data Produk</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-form ref="form">
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <v-text-field label="*Nama Produk" v-model="form.productName" :rules="[() => !!form.productName || 'Nama Produk tidak boleh kosong']" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="*Jumlah Produk" v-model="form.productQuantity" :rules="[() => !!form.productQuantity.match(/^[0-9]*$/) && !!form.productQuantity || 'Jumlah Produk tidak boleh kosong']" required></v-text-field>
                            </v-col> 
                            <v-col cols="12"> 
                                <v-text-field label="*Harga Produk" v-model="form.productPrice" :rules="[() => !!form.productPrice.match(/^[0-9]*$/) && !!form.productPrice || 'Harga Produk tidak boleh kosong']" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="*Satuan Produk" v-model="form.meassurement" :rules="[() => !!form.meassurement || 'Satuan Produk tidak boleh kosong']" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="*Jumlah Minimal" v-model="form.minimumQty" :rules="[() => !!form.minimumQty.match(/^[0-9]*$/) && !!form.minimumQty || 'Jumlah Minimal tidak boleh kosong']" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-file-input
                                    :rules="[
                                        value => !value || value.size < 56000 || 'Ukuran gambar maksimal 56Kb',
                                    ]"
                                    v-model="form.image"
                                    accept="image/jpeg"
                                    placeholder="Pilih Gambar"
                                    prepend-icon="mdi-camera"
                                    label="Gambar Produk"
                                ></v-file-input>
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
                    text: 'Gambar Produk', 
                    value: 'img_url' 
                },
                { 
                    text: 'Nama Produk', 
                    value: 'product.productName' 
                },
                { 
                    text: 'Jumlah Produk', 
                    value: 'product.productQuantity' 
                },
                { 
                    text: 'Harga Produk', 
                    value: 'product.productPrice' 
                },
                { 
                    text: 'Satuan Produk', 
                    value: 'product.meassurement' 
                },
                { 
                    text: 'Jumlah Minimum', 
                    value: 'product.minimumQty' 
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
            data: [], 
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
        sendData(){ 
            this.product = new FormData
            this.product.append('productName', this.form.productName); 
            this.product.append('productQuantity', this.form.productQuantity);
            this.product.append('productPrice', this.form.productPrice);
            this.product.append('meassurement', this.form.meassurement);
            this.product.append('minimumQty', this.form.minimumQty);
            this.product.append('image', this.form.image);
            this.product.append('createdBy', this.$store.getters.loggedInEmployee);
            
            var uri =this.$apiUrl + 'products/insert' 
            this.load = true 
            this.$http.post(uri,this.product).then(response =>{ 
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
            this.product = new FormData
            this.product.append('id', this.updatedId); 
            this.product.append('productName', this.form.productName); 
            this.product.append('productQuantity', this.form.productQuantity);
            this.product.append('productPrice', this.form.productPrice);
            this.product.append('meassurement', this.form.meassurement);
            this.product.append('minimumQty', this.form.minimumQty);
            this.product.append('updatedBy', this.$store.getters.loggedInEmployee);
            if(this.form.image != undefined) {
                this.product.append('image', this.form.image);
            }

            var uri = this.$apiUrl + 'products/update' 
            this.load = true 
            this.$http.post(uri,this.product).then(response =>{
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
        }) 
        }, 
        editHandler(item){ 
            this.typeInput = 'edit'; 
            this.dialog = true; 
            this.form.productName = item.product.productName;
            this.form.productQuantity = item.product.productQuantity;
            this.form.productPrice = item.product.productPrice;
            this.form.meassurement = item.product.meassurement;
            this.form.minimumQty = item.product.minimumQty;  
            this.updatedId = item.product.id 
        }, 
        deleteData(deleteId){ //menghapus data 
            var uri = this.$apiUrl + 'products/delete/' + deleteId + '/' + this.$store.getters.loggedInEmployee //data dihapus berdasarkan id 
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
        }, 
    } 
</script>