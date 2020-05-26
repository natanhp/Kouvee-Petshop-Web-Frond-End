<template>
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pengadaan Tahunan</h2>

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
                            @click:clear="clearMessageYear()"
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
                                <td>{{ item.bulan }}</td>
                                <td>Rp.{{ item.outcome }}</td>
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
                <h2 class="text-md-center">Pengadaan Bulanan</h2>

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
                            @click:clear="clearMessageMonth()"
                            label="Tahun Yang Diinginkan"
                            v-model="formMonth.year"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table 
                    :headers="headersMonth" 
                    :items="tableMonth"
                    :loading="loadMonth" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>Rp.{{ item.sub_total}}</td>
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table>

                <v-flex>
                    <p class="text-end"> Rp.{{totalMonth}} </p>
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

                // Year
                markerYear : true,
                loadYear : false,
                headersYear : [
                    {
                        text: 'No'
                    },
                    {
                        text: 'Bulan'
                    },
                    {
                        text: 'Jumlah Pengeluaran'
                    },
                ],
                formYear : {
                    year : ''
                },
                restockYears : {},
                tableYear : [],
                tempYear :[{
                    'bulan' : '',
                    'outcome' : ''
                }],
                totalYear: 0,
                
                // Month
                items:[
                    '',
                    'Januari','Febuari','Maret','April','Mei','Juni',
                    'Juli','Agustus','September','Oktober','November','Desember'
                ],
                headersMonth : [
                    {
                        text: 'No'
                    },
                    {
                        text: 'Nama Produk'
                    },
                    {
                        text: 'Jumlah Pengeluaran'
                    },
                ],
                loadMonth : false,
                markerMonth : true,
                formMonth: {
                    month : '',
                    year : ''
                },
                restockMonths : [],
                tableMonth : [],
                totalMonth : 0,
            }
        },
        methods: {
            getDataYear(){
                var uri = this.$apiUrl + 'report/yearlyrestockproduct/' + this.formYear.year
                this.$http.get(uri).then(response =>{
                    this.restockYears = response.data
                    this.setTableYear();
                })
            },
            getDataMonth(){
                let month = this.items.indexOf(this.formMonth.month)
                var uri = this.$apiUrl + 'report/monthlyrestockproduct/' + this.formMonth.year + '/' + month
                this.$http.get(uri).then(response =>{
                    this.restockMonths = response.data
                    this.setTableMonth();
                })
            },
            clearMessageYear(){
                this.totalYear = 0
                this.tableYear = []
                this.formYear.year = ''
            },
            clearMessageMonth(){
                this.tableMonth = []
                this.totalMonth = 0
                this.formMonth.month = ''
                this.formMonth.year = ''
            },
            setTableYear(){
                let temp = {
                    jan : this.restockYears.report.January,
                    feb : this.restockYears.report.February,
                    mar : this.restockYears.report.March,
                    apr : this.restockYears.report.April,
                    may : this.restockYears.report.May,
                    jun : this.restockYears.report.June,
                    jul : this.restockYears.report.July,
                    aug : this.restockYears.report.August,
                    sep : this.restockYears.report.September,
                    oct : this.restockYears.report.October,
                    nov : this.restockYears.report.November,
                    des : this.restockYears.report.December,
                }

                this.totalYear = this.restockYears.total

                for(let i = 0; i<this.tempYear.length ; i++){
                    this.tableYear.push({
                        'bulan' : 'Januari',
                        'outcome' : temp.jan.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Febuari',
                        'outcome' : temp.feb.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Maret',
                        'outcome' : temp.mar.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'April',
                        'outcome' : temp.apr.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Mei',
                        'outcome' : temp.may.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Juni',
                        'outcome' : temp.jun.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Juli',
                        'outcome' : temp.jul.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Agustus',
                        'outcome' : temp.aug.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'September',
                        'outcome' : temp.sep.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Oktober',
                        'outcome' : temp.oct.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'November',
                        'outcome' : temp.nov.outcome,
                    }),
                    this.tableYear.push({
                        'bulan' : 'Desember',
                        'outcome' : temp.des.outcome,
                    })
                }
            },
            setTableMonth(){
                this.tableMonth = this.restockMonths.products
                this.totalMonth = this.restockMonths.total
            },
        },
    }
</script>