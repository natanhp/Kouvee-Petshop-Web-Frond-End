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
                            <h2 class="text-md-center">Produk Tersisa</h2>
                            <v-layout row wrap style="margin:10px"> 
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
                                            <td>{{ item.product.meassurement }}</td>
                                            <td class="text-center"> 
                                                <v-btn 
                                                    icon 
                                                    color="indigo" 
                                                    light
                                                    @click="editHandler(item)"
                                                >
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                            </td> 
                                        </tr> 
                                    </tbody> 
                                </template> 
                            </v-data-table>
                        </v-container> 
                    </v-card>
                    <v-dialog v-model="dialog" persistent max-width="600px"> 
                        <v-card flat> 
                            <v-card-title> 
                                <span class="headline">Pilih Jumlah Produk</span> 
                            </v-card-title> 
                            <v-card-text> 
                                <v-form ref="form">
                                <v-container> 
                                    <v-row> 
                                        <v-col cols="12"> 
                                            <v-text-field label="*Jumlah Produk" v-model="form.productQuantity" :rules="[() => !!form.productQuantity.match(/^[0-9]*$/) && !!form.productQuantity || 'Jumlah tidak boleh kosong']" required></v-text-field>
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
                    <!-- Button -->
                    <v-btn color="primary" @click="e6=2">Continue</v-btn>
                    <v-btn text @click="e6=3">Konfirmasi</v-btn>
                </v-stepper-content>


                <v-stepper-step :complete="e6 > 2" step="2">Pilih Supplier</v-stepper-step>
                <v-stepper-content step="2">
                    <v-data-table
                        :headers="headtable"
                        :items="productRestockDetails"
                        :loading="load" 
                    >
                        <template v-slot:body="{ items }"> 
                            <tbody> 
                                <tr v-for="(item,index) in items" :key="index"> 
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.itemQty }}</td>
                                    <td>{{ item.meassurement }}</td>
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
                        <v-container> 
                            <v-row>
                                <v-col cols="12"> 
                                    <v-select class="my-2" :items="suppliers" label="Suppliers*" item-text="supplier" v-model="formTabel.sup" required></v-select>
                                </v-col> 
                            </v-row>
                        </v-container>
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
                                            <v-text-field label="*Jumlah Produk" v-model="formTabel.qty"></v-text-field>
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
                    <v-btn color="primary" @click="setFinal()">Continue</v-btn>
                    <v-btn text @click="e6=1">Cancel</v-btn>
                </v-stepper-content>


                <v-stepper-step :complete="e6 > 3" step="3">Konfirmasi</v-stepper-step>
                <v-stepper-content step="3">
                    <div>
                        <v-container>
                            <v-toolbar flat color="white">
                            <v-toolbar-title>Detail Restock Produk</v-toolbar-title>
                            </v-toolbar>
                            <v-row>
                            <v-flex cols="3" v-for="(item,index) in details" :key="index">
                                <v-card class="text-xs-center ma-3">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title class="text-center headline mb-1">{{item.id}}</v-list-item-title>
                                            <v-list-item-subtitle class="text-center">Nama Supplier: {{item.supplier_name}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-flex cols="3" v-for="(temp,index) in item.productRestockDetails" :key="index">
                                        <v-list-item-content>
                                            <v-list-item-subtitle class="text-center">Nama Produk: {{temp.product_name}}</v-list-item-subtitle>
                                            <v-list-item-subtitle class="text-center">Jumlah Produk: {{temp.itemQty}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-flex>
                                    <v-btn color="blue darken-1" text @click="setConfirm(item.id)">Konfirm</v-btn> 
                                </v-card>
                            </v-flex>
                            </v-row>
                        </v-container>
                    </div>
                    <v-btn color="primary" @click="setAwal()">Continue</v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-app>
    </div>
</template>

<script> 
export default { 
    data () { 
        return {
            e6: 1,
            dialog: false,
            dialogTab: false,
            dialogSup: false,
            keyword: '',
            keyRes: '',
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
                    text: 'Satuan Produk', 
                    value: 'product.meassurement' 
                },
                { 
                    text: 'Aksi', 
                    value: null
                }, 
            ],
            headtable: [
                {
                    text: 'No',
                    value: 'no'
                },
                { 
                    text: 'Nama Produk',
                    value: 'name'
                },
                { 
                    text: 'Jumlah Produk',
                    value: 'qty' 
                },
                { 
                    text: 'Satuan Produk',
                    value: 'meassurement'
                },
                { 
                    text: 'Aksi',
                    value: null
                }, 
            ],   
            data: [],
            temp: [{
                'createdBy': '',
                'Products_id': '', 
                'name': '', 
                'itemQty': '', 
                'meassurement': ''
            }],
            temp2: [{
                'id': ''
            }],
            productRestockDetails: [],
            suppliers: [],
            details: [],
            res: [],
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
            formTabel: {
                qty : '',
                id : '',
                index : '',
                sup : '',
                id_res : '',
            },
            product : {},
            supplier : {},
            createdBy : {},
            isArrived : {},
            suppliers_id : {},
            get_in : {},
            typeInput: 'new', 
            errors : '', 
            updatedId : '',
        } 
    },
    methods:{ 
            getDataProduk(){ 
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
            getSupplier() {
                var uri = this.$apiUrl + 'suppliers/getall'
                this.$http.get(uri).then(response =>{
                    this.suppliers = [] 
                    response.data.data.forEach(element => {
                        this.suppliers.push({
                            id: element.idSupplier,
                            supplier: element.name  
                        })
                    }) 
                }) 
            },
            getDataRestock(){
                var uri = this.$apiUrl + 'productrestock/getall'
                this.$http.get(uri).then(response =>{
                    this.details = response.data.data
                })
            },
            setConfirm(id){
                var uri = this.$apiUrl + 'productrestock/confirm/' + id + '/' + this.$store.getters.loggedInEmployee
                this.$http.get(uri).then(response =>{ 
                    this.snackbar = true; 
                    this.text = response.data.message; 
                    this.color = 'green' 
                    this.deleteDialog = false;
                    this.getDataRestock()
                }).catch(error =>{ 
                    this.errors = error 
                    this.snackbar = true; 
                    this.text = 'Try Again'; 
                    this.color = 'red'; 
                }) 
            },
            editHandler(item){ 
                console.log(this.supplier)
                this.typeInput = 'edit'; 
                this.dialog = true; 
                this.form.productName = item.product.productName;
                this.form.productQuantity = '';
                this.form.productPrice = item.product.productPrice;
                this.form.meassurement = item.product.meassurement;
                this.form.minimumQty = item.product.minimumQty;  
                this.updatedId = item.product.id 
            },
            editTabel(item,index){
                console.log(item)
                this.typeInput = 'editTabel';
                this.dialogTab = true;
                this.formTabel.qty = item.itemQty;
                this.formTabel.id = item.id ;
                this.formTabel.index = index;
            },
            deleteTabel(index){
                this.productRestockDetails.splice(index,1)
            },
            setAwal(){
                this.getDataProduk();
                this.productRestockDetails = [];
                this.e6 = 1;
            },
            setEditTabel(){
                let edit = {
                    itemQty: this.formTabel.qty
                }
                Object.assign(this.productRestockDetails[this.formTabel.index], edit)
                this.closeForm();
            },
            setTabel(){
                let i = 0;
                let restock = {
                    created: this.$store.getters.loggedInEmployee,
                    id: this.updatedId,
                    name: this.form.productName,
                    qty: this.form.productQuantity,
                    meassurement: this.form.meassurement
                }
                for(i=0;i<this.temp.length;i++){
                    this.productRestockDetails.push({
                    'createdBy': restock.created,
                    'Products_id': restock.id, 
                    'name': restock.name, 
                    'itemQty': restock.qty, 
                    'meassurement': restock.meassurement})
                }
                for(i=0;i<this.temp2.length;i++){
                    this.postition.push({
                        'id': restock.id,
                    })
                }
                this.closeForm()
            },
            setFinal(){
                this.suppliers.forEach(element => {
                    if(element.supplier === this.formTabel.sup) {
                        this.suppliers_id = element.id
                    }
                })
                this.isArrived = 0;
                this.createdBy = this.$store.getters.loggedInEmployee;
                let restfin = {
                    Suppliers_id: this.suppliers_id,
                    isArrived: this.isArrived,
                    productRestockDetails: this.productRestockDetails,
                    createdBy: this.createdBy
                }

                var uri =this.$apiUrl + 'productrestock/insert' 
                this.$http.post(uri,this.$qs.stringify(restfin), {headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }}).then(response =>{ 
                        this.snackbar = true; //mengaktifkan snackbar 
                        this.color = 'green'; //memberi warna snackbar 
                        this.text = response.data.message; //memasukkan pesan ke snackbar 
                        this.load = false; 
                        this.dialog = false
                        this.formTabel.sup = ''
                        this.resetForm();
                        this.getDataRestock();
                    }).catch(error =>{ 
                        this.errors = error 
                        this.snackbar = true; 
                        this.text = 'Try Again'; 
                        this.color = 'red'; 
                        this.load = false; 
                    }) 
                this.e6 = 3;
            },
            setForm(){
                if (this.typeInput === 'new') { 
                    this.sendData() 
                } else if(this.typeInput === 'editTabel'){
                    this.setEditTabel()
                }
                else { 
                    console.log("dddd")
                    this.setTabel() 
                } 
            },
            closeForm() {
                this.resetForm()
                this.dialog = false
                this.dialogTab = false
                this.dialogSup = false
            },
            resetForm(){ 
                this.$refs.form.reset()
            }  
            }, 
            mounted(){ 
                this.getDataProduk();
                this.getSupplier();
                this.getDataRestock();
            }, 
        } 
</script>