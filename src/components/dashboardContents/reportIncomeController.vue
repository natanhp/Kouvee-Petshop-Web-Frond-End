<template>
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pendapatan Tahunan</h2>

                <v-layout row wrap style="margin:10px">
                    <v-flex xs6> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        >
                        <v-icon size="18" class="mr-2">mdi-book</v-icon>
                            Print
                        </v-btn>
                    </v-flex>
                    <v-flex xs>
                        <v-text-field
                            :append-icon="markerYear ? 'mdi-check' : 'mdi-close'"
                            clear-icon="mdi-close-circle"
                            clearable
                            filled
                            @click:append="getDataYear()"
                            @click:clear="clearYear()"
                            label="Tahun Yang Diinginkan"
                            v-model="formYear.year"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table 
                    :headers="headersYear" 
                    :items="tableYear"
                    :loading="loadYear" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td>
                                <td>Rp.{{ item.bulan }}</td>
                                <td>Rp.{{ item.service}}</td>
                                <td>Rp.{{ item.product}}</td>
                                <td>Rp.{{ item.subTotal}}</td>
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table>

                <v-flex>
                    <p class="text-end"> Rp.{{totalYear}} </p>
                </v-flex>
                
            </v-container>
        </v-card>

        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pendapatan Bulanan</h2>

                <v-layout row wrap style="margin:10px">
                    <v-flex> 
                        <v-btn
                        depressed 
                        dark 
                        rounded 
                        style="text-transform: none !important;" 
                        color = "green accent-3"
                        >
                        <v-icon size="18" class="mr-2">mdi-book</v-icon>
                            Print
                        </v-btn>
                    </v-flex>
                    <v-flex >
                        <v-select
                            filled
                            :items="items"
                            label = 'Bulan'
                            v-model="formMonth.month"
                        >
                        </v-select>
                    </v-flex>
                    <v-flex >
                        <v-text-field
                            :append-icon="markerMonth ? 'mdi-check' : 'mdi-close'"
                            clear-icon="mdi-close-circle"
                            clearable
                            filled
                            @click:append="getDataMonth()"
                            @click:clear="clearMonth()"
                            label="Tahun Yang Diinginkan"
                            v-model="formMonth.year"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table 
                    :headers="headersPro" 
                    :items="tabelMonthPro"
                    :loading="loadPro" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>Rp.{{ item.subTotal}}</td>
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table>

                <v-flex>
                    <p class="text-end"> Rp.{{totalPro}} </p>
                </v-flex>

                <v-data-table 
                    :headers="headersSer" 
                    :items="tabelMonthSer"
                    :loading="loadSer" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>Rp.{{ item.subTotal}}</td>
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table>

                <v-flex>
                    <p class="text-end"> Rp.{{totalSer}} </p>
                </v-flex>
                
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

                // Tahunan
                years : {},
                tableYear : [],
                tempYear :[{
                    'bulan' : '',
                    'service' : '',
                    'product' : '',
                    'subTotal' : ''
                }],
                loadYear : false,
                markerYear : true,
                totalYear : 0,
                formYear:{
                    year : '',
                },
                headersYear :[
                    {
                        text : 'No'
                    },
                    {
                        text : 'Bulan'
                    },
                    {
                        text : 'Service'
                    },
                    {
                        text : 'Product'
                    },
                    {
                        text : 'Sub Total'
                    },

                ],


                // Produk & Layanan Bulan
                markerMonth : true,
                months : {},
                tabelMonthPro : [],
                tabelMonthSer : [],
                headersPro : [
                    {
                        text : 'No'
                    },
                    {
                        text : 'Nama Produk'
                    },
                    {
                        text : 'Harga'
                    },
                ],
                headersSer : [
                    {
                        text : 'No'
                    },
                    {
                        text : 'Nama Layanan'
                    },
                    {
                        text : 'Harga'
                    },
                ],
                tempMonth : [{
                    'nama' : '',
                    'subTotal' : '',
                }],
                items:[
                    '',
                    'Januari','Febuari','Maret','April','Mei','Juni',
                    'Juli','Agustus','September','Oktober','November','Desember'
                ],
                formMonth : {
                    year : '',
                    month : '',
                },
                loadPro : false,
                loadSer : false,
                totalPro : 0,
                totalSer : 0,
            }
        },
        methods: {
            getDataYear(){
                var uri = this.$apiUrl + 'report/yearlyincome/' + this.formYear.year
                this.$http.get(uri).then(response =>{
                    this.years = response.data
                    this.setTableYear()
                })
            },
            getDataMonth(){
                let month = this.items.indexOf(this.formMonth.month)
                
                var uri = this.$apiUrl + 'report/monthlyincome/' + this.formMonth.year + '/' + month
                this.$http.get(uri).then(response =>{
                    this.months = response.data
                    console.log(this.months)
                    this.setTableMonth();
                })
            },
            clearYear(){
                this.tableYear = [],
                this.formYear = ''
            },
            clearMonth(){
                this.tabelMonthPro = [],
                this.tabelMonthSer = [],
                this.formMonth.month = '',
                this.formMonth.year = '',
                this.totalPro = 0,
                this.totalSer = 0
            },
            setTableYear(){
                let temp = {
                    jan : this.years.report.January,
                    feb : this.years.report.February,
                    mar : this.years.report.March,
                    apr : this.years.report.April,
                    may : this.years.report.May,
                    jun : this.years.report.June,
                    jul : this.years.report.July,
                    aug : this.years.report.August,
                    sep : this.years.report.September,
                    oct : this.years.report.October,
                    nov : this.years.report.November,
                    des : this.years.report.December,
                }
                
                this.totalYear = this.years.total;

                for(let i = 0; i<this.tempYear.length ; i++){
                    this.tableYear.push({
                        'bulan' : 'Januari',
                        'service' : temp.jan.service,
                        'product' : temp.jan.product,
                        'subTotal' : temp.jan.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Febuari',
                        'service' : temp.feb.service,
                        'product' : temp.feb.product,
                        'subTotal' : temp.feb.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Maret',
                        'service' : temp.mar.service,
                        'product' : temp.mar.product,
                        'subTotal' : temp.mar.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'April',
                        'service' : temp.apr.service,
                        'product' : temp.apr.product,
                        'subTotal' : temp.apr.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Mei',
                        'service' : temp.may.service,
                        'product' : temp.may.product,
                        'subTotal' : temp.may.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Juni',
                        'service' : temp.jun.service,
                        'product' : temp.jun.product,
                        'subTotal' : temp.jun.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Juli',
                        'service' : temp.jul.service,
                        'product' : temp.jul.product,
                        'subTotal' : temp.jul.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Agustus',
                        'service' : temp.aug.service,
                        'product' : temp.aug.product,
                        'subTotal' : temp.aug.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'September',
                        'service' : temp.sep.service,
                        'product' : temp.sep.product,
                        'subTotal' : temp.sep.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Oktober',
                        'service' : temp.oct.service,
                        'product' : temp.oct.product,
                        'subTotal' : temp.oct.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'November',
                        'service' : temp.nov.service,
                        'product' : temp.nov.product,
                        'subTotal' : temp.nov.sub_total,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Desember',
                        'service' : temp.des.service,
                        'product' : temp.des.product,
                        'subTotal' : temp.des.sub_total,
                    })
                }
            },
            setTableMonth(){
                let lengthPro = Object.keys(this.months.products)
                let lengthSer = Object.keys(this.months.services)

                this.totalPro = this.months.products.product_total
                this.totalSer = this.months.services.service_total
                
                for(let i = 0; i<lengthPro.length-1 ; i++){
                    this.tabelMonthPro.push({
                        'name' : this.months.products[i].name,
                        'subTotal' : this.months.products[i].sub_total
                    })
                }

                for(let i = 0; i<lengthSer.length-1 ; i++){
                    this.tabelMonthSer.push({
                        'name' : this.months.services[i].name,
                        'subTotal' : this.months.services[i].sub_total
                    })
                }
            },
        },
    }
</script>