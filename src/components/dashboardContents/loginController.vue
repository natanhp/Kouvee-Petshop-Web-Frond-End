<template>
  <v-app>
      <v-content>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="8">
                    <v-card class="elevation-12">
                        <v-window v-model="step">
                            <v-window-item :value="1">
                                <v-row>
                                   
                                    <v-col cols="12" md="8">
                                 
                                            <v-card-text class="mt-12">
                                                <base-heading><h1 class="text-center display-2 teal--text text--accent-3">Login Kouvee</h1></base-heading>
                                             <v-col>                                    
                                                <div class="form">                               
                                                    <v-text-field 
                                                        v-model="form.username" label="Email" type="text" color="teal accent-3" prepend-icon="email" outlined height=50>
                                                    </v-text-field>

                                                    <v-text-field 
                                                        v-model="form.password" label="Password" type="password" color="teal accent-3" prepend-icon="lock" outlined height=50>
                                                    </v-text-field>
                                               </div>
                                            <div class="text-center mt=3">
                                                 <v-btn @click="loginUser()" rounded block class="elevation-0" color='teal-accent-3' height=50 weight=80 dark>LOGIN </v-btn>
                                            </div>    
                                            </v-col>  
                                            
                                            </v-card-text>
                                            
                                    </v-col>
                                    <v-col cols="12" md="8\4" class="teal accent-3">
                                                <v-card-text class="white-text mt-12">
                                                    <h1 class="text-center display-1">Hello, Gaes!!</h1>
                                                    <h5 class="text-center">Enjoy With Us!</h5>
                                                </v-card-text>
                                    </v-col>
                                </v-row>

                            </v-window-item>
                        </v-window>
                      
                    </v-card>
                </v-col>
            </v-row>
          </v-container>
      </v-content>
  </v-app>
</template>

<script>
export default {
    data () {
        return {
            checkbox: false,
            form : {
                username : '',
                password : '',
            },

            user: '',
            users:[],
        }
    },
    methods :
    {
        loginUser(){
            // this.user = new FormData()
            // this.user.append("username", this.form.username)
            // this.user.append("password", this.form.password)
            // this.$http.post(this.$apiUrl + 'login',this.user).then(response => {
            //     console.log(response)
            // })  
            let username = this.form.username 
            let password = this.form.password
            this.$store.dispatch('login', { username, password })
            this.user = new FormData()
            this.user.append("username", this.form.username)
            this.user.append("password", this.form.password)
            this.$http.post(this.$apiUrl + 'login',this.user)
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err))
            let role = this.$store.getters.employeeRole
        },
    },
}
</script>

<style>
    .header{
        margin-left: 30px;
        margin-top: 30px;
    }

    .form{
        margin-top: 35px;
        margin-left: 35px;
        margin-bottom: 35px;
        margin-right: 20px;
    }

    #title{
        font-family: 'Times New Roman', Times, serif;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 55px;
    }

    #tagline{
        font-family: 'Times New Roman', Times, serif;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 50px;
    }

</style>