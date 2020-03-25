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
                    <span class="headline">Data Produk</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <v-text-field label="*Nama Produk" v-model="form.productName" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="*Jumlah Produk" v-model="form.productQuantity" required></v-text-field>
                            </v-col> 
                            <v-col cols="12"> 
                                <v-text-field label="*Harga Produk" v-model="form.productPrice" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="*Satuan Produk" v-model="form.meassurement" required></v-text-field>
                            </v-col>
                            <v-col cols="12"> 
                                <v-text-field label="*Jumlah Minimal" v-model="form.minimumQty" required></v-text-field>
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
                    text: 'Gambar Produk', 
                    value: 'productImage' 
                },
                { 
                    text: 'Nama Produk', 
                    value: 'productName' 
                },
                { 
                    text: 'Jumlah Produk', 
                    value: 'productQuantity' 
                },
                { 
                    text: 'Harga Produk', 
                    value: 'productPrice' 
                },
                { 
                    text: 'Satuan Produk', 
                    value: 'meassurement' 
                },
                { 
                    text: 'Jumlah Minimum', 
                    value: 'minimumQty' 
                }, 
            ], 
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
            this.product.append('productName', this.form.productName); 
            this.product.append('productQuantity', this.form.productQuantity);
            this.product.append('productPrice', this.form.productPrice);
            this.product.append('meassurement', this.form.meassurement);
            this.product.append('minimumQty', this.form.minimumQty);
            
            // const auth = {
            //     headers: {Authorization: 'Bearer' + this.$cookie.get('TOKEN')} 
            // }
            var uri = this.$apiUrl + '/product/' + this.updatedId; 
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
            this.typeInput = 'new'; 
        }) 
        }, 
        editHandler(item){ 
            this.typeInput = 'edit'; 
            this.dialog = true; 
            this.form.productName = item.productName;
            this.form.productQuantity = item.productQuantity;
            this.form.productPrice = item.productPrice;
            this.form.meassurement = item.meassurement;
            this.form.minimumQty = item.minimumQty;  
            this.updatedId = item.id 
        }, 
        deleteData(deleteId){ //menghapus data 
        // const auth = {
        //         headers: {Authorization: 'Bearer' + this.$cookie.get('TOKEN')} 
        //     }
            var uri = this.$apiUrl + '/product/' + deleteId; //data dihapus berdasarkan id 
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
                productName : '',
                productQuantity :'',
                productPrice :'',
                meassurement :'',
                minimumQty :''
            } 
        } 
        }, 
        mounted(){ 
            this.getData(); 
        }, 
    } 
</script>