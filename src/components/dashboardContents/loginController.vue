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
                                                        v-model="form.email" label="Email" type="text" color="teal accent-3" prepend-icon="email" outlined height=50>
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
                email : null,
                password : null,
            },

            user: new FormData,
            user2: new FormData,
            users:[],
        }
    },
    methods :
    {
        loginUser(){
            var url = this.$apiUrl + '/auth'
            var urldata = this.$apiUrl + '/User/info'
            var urlemail = this.$apiUrl + '/User/userlogin'
            this.user = new FormData()
            this.user2 = new FormData()
            this.user.append('email', this.form.email)
            this.user.append('password', this.form.password)
            this.user2.append('email', this.form.email)
            this.$http.post(urlemail,this.user).then(response => {
                if(response.data.message === "Berhasil")
                {
                    this.$http.post(url,this.user).then(response =>{
                        if(response.data.token)
                        {
                            this.$http.post(urldata,this.user2).then(response2 =>{
                                localStorage.setItem("Role", response2.data.role)
                                localStorage.setItem("Email", response2.data.email)
                            })
                            localStorage.setItem("Token", response.data.token)
                            this.$router.push({name : 'home'})
                        }
                        else
                        {
                            alert('Hiya Hiya Hiya Salah wkwk... Coba Lagi :p')
                        }
                    })
                }
                else
                {
                    alert("Email not Verified!");
                }
            })

            
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