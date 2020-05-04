<template>
  <v-app>
      <v-content>
          <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="8">
                    <v-card class="elevation-12">
                            <v-card-text class="mt-12">
                                <h1 class="text-center display-3">Login Kouvee</h1>
                                <v-col>                                    
                                    <div class="form">                               
                                        <v-text-field 
                                            v-model="form.username" label="Username" type="text" color="black" prepend-icon="email" outlined height=50>
                                        </v-text-field>
                                        <v-text-field 
                                            v-model="form.password" label="Password" type="password" color="black" prepend-icon="lock" outlined height=50>
                                        </v-text-field>
                                    </div>
                                    <div class="text-center mt=3">
                                            <v-btn @click="loginUser()" rounded block class="elevation-0" color='teal-accent-3' height=50 weight=80 dark>LOGIN</v-btn>
                                    </div>    
                                </v-col>        
                                <v-btn router to="/" rounded block class="elevation-0" color='red' height=30 weight=20 dark>TO HOME</v-btn>   
                            </v-card-text>     
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
            let username = this.form.username 
            let password = this.form.password
            this.$store.dispatch('login', { username, password }).then(response => {
                if(response.data.data[0].role==="Owner") {
                    this.$router.push('/employee')
                } else if(response.data.data[0].role==="CS") {
                    this.$router.push('/customer')
                }
            })
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

    .title{
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