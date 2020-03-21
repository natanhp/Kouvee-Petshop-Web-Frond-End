<template>
    <div>
        <v-navigation-drawer v-model = "drawer" class = "grey darken-3" white app clipped fixed temporary>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">MENU CUSTOMER SERVICE</v-list-item-title>
                  
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title><v-btn text router v-bind:to="item.route">{{item.title}}</v-btn></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block>Logout</v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar white app fixed clipped-left height="70px" color="grey darken-3">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <VSpacer />
            <img src = "../assets/logo.jpg" style="height:45px;width:45px">

            <v-toolbar-title style="font-size: 21px;" class="white--text ml-2">KOUVEE'S PETSHOP</v-toolbar-title>
        </v-app-bar>

        <VContent>
            <router-view />
        </VContent>
    </div>
</template>

<script>
export default {
    data(){
        return {
            drawer: null,
            items: [
                { 
                    title: 'Data Hewan', 
                    icon: 'mdi-gog-side',
                    route: '/employee'
                },
                    
                {
                    title: 'Data Layanan',
                    icon: 'mdi-dog-side',
                    route: '/petsize'
                },
                {
                    title: 'Data Produk',
                    icon: 'mdi-package-variant',
                    route: '/product'
                },
                
             
            ],
        }
    },
}
</script>