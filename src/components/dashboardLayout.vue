<template>
    <div>
        <v-navigation-drawer v-model = "drawer" class = "grey darken-3" white app clipped fixed temporary>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">MENU OWNER</v-list-item-title>
                    <!-- <v-list-item-subtitle>Vue Consume REST API</v-list-item-subtitle> -->
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
                    <v-btn block router to="/login">Logout</v-btn>
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
                    title: 'Data Pegawai', 
                    icon: 'mdi-human-male',
                    route: '/employee'
                },
                    
                {
                    title: 'Data Ukuran Hewan',
                    icon: 'mdi-dog-side',
                    route: '/petsize'
                },
                {
                    title: 'Data Tipe Hewan',
                    icon: 'mdi-dog-side',
                    route: '/pettype'
                },
                {
                    title: 'Data Produk',
                    icon: 'mdi-package-variant',
                    route: '/product'
                },
                {
                    title: 'Data Layanan',
                    icon:'mdi-pot',
                    route: '/service'
                },
                {
                    title: 'Data Pemasok',
                    icon: 'mdi-truck-fast',
                    route: '/supplier'
                }
                
             
            ],
        }
    },
}
</script>