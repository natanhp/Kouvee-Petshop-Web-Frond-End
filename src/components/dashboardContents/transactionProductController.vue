<template>
    <div id="app">
        <v-app id="inspire">
            <v-stepper v-model="e6" vertical>
                <v-stepper-step :complete="e6 > 1" step="1">
                    Pilih Produk
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-card>
                        <v-container grid-list-md mb-0>
                            <h2 class="text-md-center">Data Produk</h2> 
                            <v-layout row wrap style="margin:10px"> 
                                <v-flex xs6 class="text-right"> 
                                    <v-text-field 
                                        v-model="keywordPro"
                                        append-icon="mdi-search"
                                        label="Pencarian" 
                                        hide-details 
                                    ></v-text-field>
                                </v-flex> 
                            </v-layout> 
                            <v-data-table 
                                :headers="headersPro" 
                                :items="data" 
                                :search="keywordPro" 
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
                                        
                                            <td class="text-center"> 
                                                <v-btn 
                                                    icon 
                                                    color="indigo" 
                                                    light 
                                                    @click="editHandlerPro(item)"
                                                > 
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </td> 
                                        </tr> 
                                    </tbody> 
                                </template> 
                            </v-data-table>
                        </v-container> 
                    </v-card>
                    <v-dialog v-model="dialogPro" persistent max-width="600px"> 
                        <v-card> 
                            <v-card-title> 
                                <span class="headline">Data Produk</span> 
                            </v-card-title> 
                            <v-card-text> 
                                <v-form ref="formPro">
                                <v-container> 
                                    <v-row> 
                                        <v-col cols="12"> 
                                            <v-text-field label="*Jumlah Produk" v-model="formPro.productQuantity" :rules="[() => !!formPro.productQuantity.match(/^[0-9]*$/) && !!formPro.productQuantity || 'Jumlah harus angka 1-9 dan tidak boleh kosong']" required></v-text-field>
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
                    <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="2">Konfirmasi Product Pesanan</v-stepper-step>

                <v-stepper-content step="2">
                    <!-- Produk -->
                    <v-data-table class="my"
                        :headers="headersProTable"
                        :items="productTransactionDetails"
                        :loading="load" 
                    >
                        <template v-slot:body="{ items }"> 
                            <tbody> 
                                <tr v-for="(item,index) in items" :key="index"> 
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.productName }}</td>
                                    <td>{{ item.itemQty }}</td>
                                    <td>{{ item.productPrice }}</td>
                                    <td>{{ item.meassurement }}</td>
                                    <td>{{ item.subTotal }}</td>
                                    <td>
                                        <v-btn 
                                            icon 
                                            color="indigo" 
                                            light 
                                            @click="editTabel(item,index)"
                                        > 
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
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
                    <v-dialog v-model="dialogTab" persistent max-width="600px"> 
                        <v-card> 
                            <v-card-title> 
                                <span class="headline">Jumlah Produk</span> 
                            </v-card-title> 
                            <v-card-text> 
                                <v-form ref="formTabel">
                                <v-container> 
                                    <v-row>
                                        <v-col cols="12"> 
                                            <v-text-field label="*Jumlah Produk" v-model="formTabel.qty" :rules="[() => !!formTabel.qty.match(/^[0-9]*$/) && !!formTabel.qty || 'Jumlah harus angka 1-9 dan tidak boleh kosong']" required></v-text-field>
                                        </v-col> 
                                    </v-row> 
                                </v-container>
                                </v-form>
                            </v-card-text> 
                            <v-card-actions> 
                                <v-spacer></v-spacer> 
                                <v-btn color="blue darken-1" text @click="closeForm()">Batal</v-btn> 
                                <v-btn color="blue darken-1" text @click="setForm()">Simpan</v-btn> 
                            </v-card-actions> 
                        </v-card> 
                    </v-dialog>

                    <v-container> 
                        <v-row>
                            <v-col cols="5"> 
                                Jumlah Total : {{total}}
                            </v-col> 
                        </v-row>
                    </v-container>

                    <v-container> 
                        <v-row>
                            <v-col cols="12"> 
                                <v-select class="my-2" :items="customers" label="Customers*" item-text="name" v-model="formCus.customer" required></v-select>
                            </v-col> 
                        </v-row>
                    </v-container>

                    <v-btn color="primary" @click="setProductTransaction()">Confirm</v-btn>
                    <v-btn text @click="e6=1">Cancel</v-btn>
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
                onPro: false,
                
                // Produk
                keywordPro: '',    
                headersPro: [ 
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
                        text: 'Aksi',
                        value: null
                    }
                ],
                headersProTable: [
                    {
                        text: 'No', 
                        value: 'no', 
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
                        text: 'Sub Total', 
                        value: null 
                    },
                    {
                        text: 'Aksi',
                        value: null
                    }

                ],
                data: [], 
                snackbar: false, 
                color: null, 
                text: '',
                dialogPro: false,
                load: false,
                formPro: { 
                    productName : '',
                    productQuantity: '',
                    productPrice: '',
                    meassurement: '',
                    productQty: '',
                    subTotal: '',
                }, 
                product : {}, 

                // Tabel Penampung
                tablePro:[{
                    'Products_id': '',
                    'productName': '',
                    'itemQty': '',
                    'productPrice': '',
                    'meassurement': '',
                    'subTotal': '',
                    'createdBy': '',
                }],
                productTransactionDetails:[],
                dialogTab: false,
                formTabel: {
                    qty : '',
                    price : '',
                    sub : '',
                    index : '',
                },

                // Kebutuhan lain
                formCus:{
                    customer:'',
                    id:'',
                },
                customers:[],
                customer:{},
                createdBy: '',
                customer_id: '',
                total: 0,
                typeInput: 'new', 
                errors : '', 
                updatedId : '',
                profin : {},
                j: -1,
            }
        },
        methods:{ 
            getDataProduct(){ 
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
            getDataCustomer(){ 
                var uri = this.$apiUrl + 'customers/getall' 
                this.$http.get(uri).then(response =>{ 
                    this.customers=response.data.data
                    this.customers.unshift("Customer")
                })
            },
            setProductTransaction(){
                this.createdBy = this.$store.getters.loggedInEmployee;
                this.customers.forEach(element => {
                    if(element.name === this.formCus.customer){
                        this.customer_id = element.id
                        this.formCus.id = element.id
                    }else if(this.formCus.customer === "Customer"){
                        this.customer_id = null
                    }
                })

                console.log(this.customer_id)

                if(this.customer_id === this.formCus.id) {
                    let temp = {
                        createdBy : this.createdBy,
                        Customers_id : this.customer_id,
                        isPaid : 0,
                        productTransactionDetails : this.productTransactionDetails,
                        total : this.total,
                    }
                    this.profin = temp
                }else if(this.customer_id === null){
                    let temp = {
                        createdBy : this.createdBy,
                        isPaid : 0,
                        productTransactionDetails : this.productTransactionDetails,
                        total : this.total,
                    }
                    this.profin = temp
                }

                console.log(this.profin)

                var uri =this.$apiUrl + 'producttransaction/cs/insert' 
                this.$http.post(uri,this.$qs.stringify(this.profin), {headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }}).then(response =>{ 
                        this.snackbar = true; //mengaktifkan snackbar 
                        this.color = 'green'; //memberi warna snackbar 
                        this.text = response.data.message; //memasukkan pesan ke snackbar 
                        this.load = false; 
                        this.dialog = false;
                        this.getDataProduct();
                        this.resetForm();
                        this.startAll();
                    }).catch(error =>{ 
                        this.errors = error 
                        this.snackbar = true; 
                        this.text = 'Try Again'; 
                        this.color = 'red'; 
                        this.load = false; 
                    })
            },
            editHandlerPro(item){
                this.typeInput = 'product'; 
                this.dialogPro = true;
                this.formPro.id = item.product.id;
                this.formPro.productName = item.product.productName;
                this.formPro.productQuantity = 0;
                this.formPro.productPrice = item.product.productPrice;
                this.formPro.meassurement = item.product.meassurement;
                this.formPro.subTotal = '';
            },
            editTabel(item,index){
                this.typeInput = 'editProduct';
                this.dialogTab = true;
                this.formTabel.qty = item.itemQty;
                this.formTabel.price = item.productPrice;
                this.formTabel.sub = item.subTotal;
                this.formTabel.index = index;
            },
            setTabelProduct(){
                let temp = 0;
            
                let product = {
                    id: this.formPro.id,
                    productName: this.formPro.productName,
                    productQuantity: this.formPro.productQuantity,
                    productPrice: this.formPro.productPrice,
                    meassurement: this.formPro.meassurement,
                    subTotal: parseInt(this.formPro.productQuantity) * parseInt(this.formPro.productPrice)
                }
                
                for(let i=0;i<this.productTransactionDetails.length;i++){
                    if(this.productTransactionDetails[i].Products_id === product.id){
                        this.j = i
                    }
                }

                if(this.j === -1){
                    for(let i = 0; i<this.tablePro.length ; i++){
                        this.productTransactionDetails.push({
                            'Products_id' : product.id,
                            'productName' : product.productName,
                            'itemQty' : product.productQuantity,
                            'productPrice' : product.productPrice,
                            'meassurement' : product.meassurement,
                            'subTotal' : product.subTotal,
                            'createdBy' : this.$store.getters.loggedInEmployee
                        })
                    }
                }else{
                    if(this.productTransactionDetails[this.j].Products_id === product.id){
                        let edit = {
                            itemQty: parseInt(this.productTransactionDetails[this.j].itemQty)+parseInt(product.productQuantity),
                            subTotal : parseInt(this.productTransactionDetails[this.j].subTotal) + parseInt(product.subTotal)
                        }
                        Object.assign(this.productTransactionDetails[this.j], edit)
                    }
                }

                for(let i = 0 ; i<this.productTransactionDetails.length ; i++){
                    temp = parseInt(temp) + parseInt(this.productTransactionDetails[i].subTotal)
                }

                this.total = temp;

                console.log(this.total)
                this.closeForm()
            },
            deleteTabel(index){
                let temp = 0;
                this.productTransactionDetails.splice(index,1)
                for(let i = 0 ; i<this.productTransactionDetails.length ; i++){
                    temp = parseInt(temp) + parseInt(this.productTransactionDetails[i].subTotal)
                }
                this.total = temp;
            },
            setEditTabel(){
                let temp = 0;
                let edit = {
                    itemQty: this.formTabel.qty,
                    subTotal : parseInt(this.formTabel.qty) * parseInt(this.formTabel.price)
                }
                Object.assign(this.productTransactionDetails[this.formTabel.index], edit)

                for(let i = 0 ; i<this.productTransactionDetails.length ; i++){
                    temp = parseInt(temp) + parseInt(this.productTransactionDetails[i].subTotal)
                }
                this.total = temp;

                console.log(this.total)
                this.closeForm();
            },
            setForm(){ 
                if(this.typeInput === 'product'){
                    this.setTabelProduct()
                }else{
                    this.setEditTabel()
                }
            },
            closeForm() {
                this.resetForm()
                this.dialogPro = false
                this.dialogTab = false
                this.j = -1
            },
            resetForm(){ 
                this.$refs.formPro.reset()
            },
            startAll(){
                this.productTransactionDetails = []
                this.formCus.customer = ''
                this.total = 0
                this.e6 = 1
            }
        }, 
        mounted(){ 
            this.getDataProduct();
            this.getDataCustomer();
        }, 
    }
</script>