<template>
    <div>
        <v-navigation-drawer v-if="this.$store.getters.isLoggedIn" v-model = "drawer" class = "grey darken-3" white app clipped fixed temporary>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">MENU</v-list-item-title>
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
                    <v-btn block @click="logout()">Logout</v-btn>
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
                    title: 'Data Pegawai (Owner)', 
                    icon: 'mdi-human-male',
                    route: '/employee'
                },
                {
                    title: 'Data Ukuran Hewan (Owner)',
                    icon: 'mdi-dog-side',
                    route: '/petsize'
                },
                {
                    title: 'Data Tipe Hewan (Owner)',
                    icon: 'mdi-dog-side',
                    route: '/pettype'
                },
                {
                    title: 'Data Produk (Owner)',
                    icon: 'mdi-package-variant',
                    route: '/product'
                },
                {
                    title: 'Data Layanan (Owner)',
                    icon:'mdi-pot',
                    route: '/service'
                },
                {
                    title: 'Data Pemasok (Owner)',
                    icon: 'mdi-truck-fast',
                    route: '/supplier'
                },
                {
                    title: 'Detail Layanan (Owner)',
                    icon: 'mdi-book-open',
                    route: '/servicedetail'
                },
                {
                    title: 'Data Hewan (CS)',
                    icon: 'mdi-dog',
                    route: '/pet'
                },
                {
                    title: 'Data Pelanggan (CS)',
                    icon: 'mdi-human',
                    route: '/customer'
                },
            ],
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout')
            this.$router.push('/login')
        }
    }
}
</script>