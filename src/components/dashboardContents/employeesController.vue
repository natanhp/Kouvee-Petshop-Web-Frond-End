<template> 
    <v-container> 
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Pegawai</h2> 
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
                            Tambah Pegawai
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
                    :items="users" 
                    :search="keyword" 
                    :loading="load" 
                > 
                    <template v-slot:body="{ items }"> 
                        <tbody> 
                            <tr v-for="(item,index) in items" :key="item.id"> 
                                <td>{{ index + 1 }}</td> 
                                <td>{{ item.name }}</td> 
                                <td>{{ item.role }}</td> 
                                <td>{{ item.address}}</td> 
                                <td>{{ item.dateBirth }}</td> 
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
                    <span class="headline">Data Pegawai</span> 
                </v-card-title> 
                <v-card-text> 
                    <v-container> 
                        <v-row> 
                            <v-col cols="12"> 
                                <v-text-field label="Nama*" v-model="form.name" required></v-text-field> 
                            </v-col> 

                            <v-col cols="12"> 
                                <v-select :items="roleItems" v-model="form.role" label="Role*" required></v-select>
                            </v-col> 

                            <v-col cols="12">
                                <v-text-field label="Alamat*" v-model="form.address" required></v-text-field>
                            </v-col>     

                            <v-col cols="12"> 
                                <v-menu
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="form.dateBirth"
                                        label="Tanggal Lahir*"
                                        prepend-icon="event"
                                        readonly
                                        required
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form.dateBirth"></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12"> 
                                <v-text-field label="Nomor Telepon*" v-model="form.phoneNumber" required></v-text-field> 
                            </v-col> 

                            <v-col cols="12"> 
                                <v-text-field label="Username*" v-model="form.username" required></v-text-field> 
                            </v-col> 

                            <v-col cols="12"> 
                                <v-text-field v-if="typeInput == 'new'" label="Password*" v-model="form.password" type="password" required></v-text-field> 
                                <v-text-field v-else label="Password" v-model="form.password" type="password"></v-text-field> 
                            </v-col> 

                        </v-row> 
                    </v-container>
                    <small>*Diharuskan untuk mengisi data</small> 
                </v-card-text> 
                <v-card-actions> 
                    <v-spacer></v-spacer> 
                    <v-btn color="blue darken-1" text @click="closeCreateDialog()">Batal</v-btn> 
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
            calendarDialog: false,
            keyword: '', 
            headers: [ 
                { 
                    text: 'ID', 
                    value: 'id', 
                }, 
                { 
                    text: 'Nama', 
                    value: 'name' 
                },
                { 
                    text: 'Role', 
                    value: 'role' 
                },  
                { 
                    text: 'Alamat', 
                    value: 'address' 
                }, 
                { 
                    text: 'Tanggal Lahir', 
                    value: 'dateBirth' 
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


            users: [], 
            snackbar: false, 
            color: null, 
            text: '', 
            load: false,
            form: { 
                name : '', 
                role : '',
                address : '', 
                dateBirth : '',
                phoneNumber : '',
                username: '',
                password: '' 
            }, 
            user : [], 
            typeInput: 'new', 
            errors : '', 
            updatedId : '',
            roleItems: [
                'Owner',
                'CS',
                'Kasir'
            ],
            employeeHasedPassword: '',
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
            var uri = this.$apiUrl + 'employees/getall' 
            this.$http.get(uri).then(response =>{ 
                this.users=response.data.data
            }) 
        }, 
        sendData(){ 
            this.user = new FormData
            this.user.append('name', this.form.name); 
            this.user.append('role', this.form.role);
            this.user.append('address', this.form.address);
            this.user.append('dateBirth', this.form.dateBirth); 
            this.user.append('phoneNumber', this.form.phoneNumber);
            this.user.append('username', this.form.username);
            this.user.append('password', this.form.password);
            this.user.append('createdBy', this.$store.getters.loggedInEmployee)

            var uri =this.$apiUrl + 'employees/insert' 
            this.load = true 
            this.$http.post(uri,this.user).then(response =>{ 
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
            let id = this.updatedId
            let passwordHashed = this.employeeHasedPassword
            
            var user = {
                id: id,
                name: this.form.name,
                role: this.form.role,
                address: this.form.address,
                dateBirth: this.form.dateBirth,
                phoneNumber: this.form.phoneNumber,
                username:this.form.username,
                updatedBy: this.$store.getters.loggedInEmployee
            }

            if (this.form.password === '' || this.form.password === undefined){
                user['password'] = passwordHashed;
                console.log(user.password)
            } else {
                user['password'] = this.form.password
                console.log(this.form.password)
            }
            
            var uri = this.$apiUrl + 'employees/update'; 
            this.load = true 
            this.$http.put(uri,this.$qs.stringify(user), {headers: {
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
            this.typeInput = 'edit'; 
        }) 
        }, 
        editHandler(item){ 
            this.typeInput = 'edit' 
            this.dialog = true
            this.form.name = item.name 
            this.form.role = item.role
            this.form.address = item.address 
            this.form.dateBirth = item.dateBirth
            this.form.phoneNumber = item.phoneNumber
            this.form.username = item.username
            this.updatedId = item.id
            this.employeeHasedPassword = item.password
        }, 
        deleteData(deleteId){
            var uri = this.$apiUrl + 'employees/delete/' + deleteId + '/' + this.$store.getters.loggedInEmployee;
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
                name : '', 
                role : '',
                address : '', 
                dateBirth : '',
                phoneNumber : '' 
            } 
        },
        closeCreateDialog() {
            this.resetForm()
            this.dialog = false
            this.typeInput = 'new'
        } 
        }, 
        mounted(){ 
            this.getData(); 
        }, 
    } 
</script>