<template>
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Log Customer Service dan Kasir</h2>

                <v-switch 
                v-model="changeCus" 
                label="LOG Customer" 
                value="LOG"
                color = "green accent-3"
                />
                <v-flex xs6 class="text-right" v-if="changeCus"> 
                    <v-text-field 
                        v-model="keywordLogCus"
                        append-icon="mdi-search"
                        label="Search" 
                        hide-details 
                    ></v-text-field>
                </v-flex>
                <v-data-table v-if="changeCus"
                :headers="HeadLog" 
                :items="logsCus" 
                :search="keywordLogCus" 
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

                <v-switch 
                v-model="changePet" 
                label="LOG Hewan Peliharaan" 
                value="LOG"
                color = "green accent-3"
                />
                <v-flex xs6 class="text-right" v-if="changePet"> 
                    <v-text-field 
                        v-model="keywordLogPet"
                        append-icon="mdi-search"
                        label="Search" 
                        hide-details 
                    ></v-text-field>
                </v-flex>
                <v-data-table v-if="changePet"
                :headers="HeadLog" 
                :items="logsPet" 
                :search="keywordLogPet" 
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

                <v-switch 
                v-model="changeProTran" 
                label="LOG Produk Transaksi" 
                value="LOG"
                color = "green accent-3"
                />
                <v-flex xs6 class="text-right" v-if="changeProTran"> 
                    <v-text-field 
                        v-model="keywordLogProTran"
                        append-icon="mdi-search"
                        label="Search" 
                        hide-details 
                    ></v-text-field>
                </v-flex>
                <v-data-table v-if="changeProTran"
                :headers="HeadLogTran" 
                :items="logsProTran" 
                :search="keywordLogProTran" 
                :loading="load" >
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.ProductTransaction_id }}</td>
                                <td>{{ item.creator.name }}</td>
                                <td>{{ item.createdAt }}</td>
                                <td>{{ item.updater.name }}</td>
                                <td>{{ item.updatedAt }}</td>
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table>

                <v-switch 
                v-model="changeSerTran" 
                label="LOG Layanan Transaksi" 
                value="LOG"
                color = "green accent-3"
                />
                <v-flex xs6 class="text-right" v-if="changeSerTran"> 
                    <v-text-field 
                        v-model="keywordLogSerTran"
                        append-icon="mdi-search"
                        label="Search" 
                        hide-details 
                    ></v-text-field>
                </v-flex>
                <v-data-table v-if="changeSerTran"
                :headers="HeadLogTran" 
                :items="logsSerTran" 
                :search="keywordLogSerTran" 
                :loading="load" >
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="index"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.id }}</td>
                                <td>{{ item.creator.name }}</td>
                                <td>{{ item.createdAt }}</td>
                                <td>{{ item.updater.name }}</td>
                                <td>{{ item.updatedAt }}</td>
                            </tr> 
                        </tbody> 
                    </template>
                </v-data-table>
                
            </v-container> 
        </v-card>

    </v-container> 
</template>
<script>
import jspdf from 'jspdf'
import 'jspdf-autotable'
    export default {
        data() {
            return {
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
                HeadLogTran:[
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
                ],
                load : true,

                // Customer
                logsCus:[],
                changeCus: false,
                keywordLogCus: '',

                // Pet
                logsPet:[],
                changePet: false,
                keywordLogPet: '',

                // Produk
                logsProTran:[],
                changeProTran: false,
                keywordLogProTran: '',

                // Service
                logsSerTran:[],
                changeSerTran: false,
                keywordLogSerTran: '',
            }
        },
        methods: {
            getLogCustomer(){ 
                var uri = this.$apiUrl + 'log/customer' 
                this.$http.get(uri).then(response =>{ 
                    this.logsCus=response.data.data
                }) 
            },
            getLogPet(){ 
                var uri = this.$apiUrl + 'log/pet' 
                this.$http.get(uri).then(response =>{ 
                    this.logsPet=response.data.data
                }) 
            },
            getLogProTran(){ 
                var uri = this.$apiUrl + 'log/producttransactiondetail' 
                this.$http.get(uri).then(response =>{ 
                    this.logsProTran=response.data.data
                }) 
            },
            getLogSerTran(){ 
                var uri = this.$apiUrl + 'log/servicetransaction' 
                this.$http.get(uri).then(response =>{ 
                    this.logsSerTran=response.data.data
                }) 
            },
        },
        mounted(){ 
            this.getLogCustomer();
            this.getLogPet();
            this.getLogProTran();
            this.getLogSerTran();
        }, 
    }
</script>