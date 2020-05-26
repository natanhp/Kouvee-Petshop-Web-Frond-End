<template>
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Produk Terlaris</h2>

                <v-layout row wrap style="margin:10px">
                    <v-flex xs6> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3" 
                        @click="printProduk()"
                        >
                        <v-icon size="18" class="mr-2">mdi-book</v-icon>
                            Print
                        </v-btn>
                    </v-flex>
                    <v-flex xs>
                        <v-text-field
                            :append-icon="markerProduct ? 'mdi-check' : 'mdi-close'"
                            clear-icon="mdi-close-circle"
                            clearable
                            filled
                            @click:append="getDataProduct()"
                            @click:clear="clearMessageProduct()"
                            label="Tahun Yang Diinginkan"
                            v-model="formProduct.year"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table 
                    :headers="headersProduct" 
                    :items="tablePro"
                    :loading="loadProduct" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.bulan }}</td>
                                <td>{{ item.nama}}</td>
                                <td>{{ item.jumlah}}</td>
                            </tr> 
                        </tbody> 
                    </template> 
                </v-data-table>
                
            </v-container> 
        </v-card>

        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Layanan Terlaris</h2>

                <v-layout row wrap style="margin:10px">
                    <v-flex xs6> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3" 
                        @click="printService()"
                        >
                        <v-icon size="18" class="mr-2">mdi-book</v-icon>
                            Print Layanan Terlaris
                        </v-btn>
                    </v-flex>
                    <v-flex xs>
                        <v-text-field
                            :append-icon="markerProduct ? 'mdi-check' : 'mdi-close'"
                            clear-icon="mdi-close-circle"
                            clearable
                            filled
                            @click:append="getDataService()"
                            @click:clear="clearMessageService()"
                            label="Tahun Yang Diinginkan"
                            v-model="formService.year"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table 
                    :headers="headersService" 
                    :items="tableSer"
                    :loading="loadService" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.bulan }}</td>
                                <td>{{ item.nama}}</td>
                                <td>{{ item.jumlah}}</td>
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

    </v-container> 
</template>
<script>
import jspdf from 'jspdf'
import 'jspdf-autotable'
    export default {
        data() {
            return {
                snackbar: false, 
                color: null, 
                text: '',
                table:[{
                    'bulan' : '',
                    'nama' : '',
                    'jumlah' : ''
                }],
                

                // Product
                markerProduct: true,
                headersProduct:[
                    {
                        text : 'No',
                    },
                    {
                        text : 'Bulan',
                    },
                    {
                        text : 'Nama Product',
                    },
                    {
                        text : 'Jumlah',
                    },
                ],
                loadProduct: '',
                products: {},
                formProduct:{
                    year : '',
                },
                tablePro : [],

                // Service
                markerService: true,
                headersService:[
                    {
                        text : 'No',
                    },
                    {
                        text : 'Bulan',
                    },
                    {
                        text : 'Nama Layanan',
                    },
                    {
                        text : 'Jumlah',
                    },
                ],
                loadService: '',
                services: {},
                formService:{
                    year : '',
                },
                tableSer : [],

            }
        },
        methods: {
            getDataProduct(){
                var uri = this.$apiUrl + 'report/bestsellingproduct/' + this.formProduct.year
                this.$http.get(uri).then(response =>{
                    this.products = response.data
                    this.setTableProduct();
                })
            },
            getDataService(){
                var uri = this.$apiUrl + 'report/bestsellingservice/' + this.formService.year
                this.$http.get(uri).then(response =>{
                    this.services = response.data
                    this.setTableService();
                })
            },
            clearMessageProduct(){
                console.log(this.tablePro)
                this.tablePro = [];
                this.formProduct.year = '';
            },
            clearMessageService(){
                console.log(this.tableSer)
                this.tableSer = [];
                this.formService.year = '';
            },
            setTableProduct(){
                let temp = {
                    jan : this.products.January,
                    feb : this.products.February,
                    mar : this.products.March,
                    apr : this.products.April,
                    may : this.products.May,
                    jun : this.products.June,
                    jul : this.products.July,
                    aug : this.products.August,
                    sep : this.products.September,
                    oct : this.products.October,
                    nov : this.products.November,
                    des : this.products.December,
                }
                for(let i = 0; i<this.table.length ; i++){
                    this.tablePro.push({
                        'bulan' : 'Januari',
                        'nama' : temp.jan.product,
                        'jumlah' : temp.jan.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'Febuari',
                        'nama' : temp.feb.product,
                        'jumlah' : temp.feb.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'Maret',
                        'nama' : temp.mar.product,
                        'jumlah' : temp.mar.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'April',
                        'nama' : temp.apr.product,
                        'jumlah' : temp.apr.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'Mei',
                        'nama' : temp.may.product,
                        'jumlah' : temp.may.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'Juni',
                        'nama' : temp.jun.product,
                        'jumlah' : temp.jun.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'Juli',
                        'nama' : temp.jul.product,
                        'jumlah' : temp.jul.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'Agustus',
                        'nama' : temp.aug.product,
                        'jumlah' : temp.aug.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'September',
                        'nama' : temp.sep.product,
                        'jumlah' : temp.sep.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'Oktober',
                        'nama' : temp.oct.product,
                        'jumlah' : temp.oct.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'November',
                        'nama' : temp.nov.product,
                        'jumlah' : temp.nov.count,
                    }),
                    this.tablePro.push({
                        'bulan' : 'Desember',
                        'nama' : temp.des.product,
                        'jumlah' : temp.des.count,
                    })
                }
            },
            setTableService(){
                let temp = {
                    jan : this.services.January,
                    feb : this.services.February,
                    mar : this.services.March,
                    apr : this.services.April,
                    may : this.services.May,
                    jun : this.services.June,
                    jul : this.services.July,
                    aug : this.services.August,
                    sep : this.services.September,
                    oct : this.services.October,
                    nov : this.services.November,
                    des : this.services.December,
                }
                for(let i = 0; i<this.table.length ; i++){
                    this.tableSer.push({
                        'bulan' : 'Januari',
                        'nama' : temp.jan.service,
                        'jumlah' : temp.jan.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'Febuari',
                        'nama' : temp.feb.service,
                        'jumlah' : temp.feb.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'Maret',
                        'nama' : temp.mar.service,
                        'jumlah' : temp.mar.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'April',
                        'nama' : temp.apr.service,
                        'jumlah' : temp.apr.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'May',
                        'nama' : temp.may.service,
                        'jumlah' : temp.may.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'Juni',
                        'nama' : temp.jun.service,
                        'jumlah' : temp.jun.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'Juli',
                        'nama' : temp.jul.service,
                        'jumlah' : temp.jul.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'Agustus',
                        'nama' : temp.aug.service,
                        'jumlah' : temp.aug.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'September',
                        'nama' : temp.sep.service,
                        'jumlah' : temp.sep.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'Oktober',
                        'nama' : temp.oct.service,
                        'jumlah' : temp.oct.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'November',
                        'nama' : temp.nov.service,
                        'jumlah' : temp.nov.count,
                    }),
                    this.tableSer.push({
                        'bulan' : 'Desember',
                        'nama' : temp.des.service,
                        'jumlah' : temp.des.count,
                    })
                }
            }
        },
    }
</script>