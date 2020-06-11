<template>
    <div>
        <v-navigation-drawer  v-model = "drawer" white app clipped fixed temporary>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title v-if="this.$store.getters.employeeRole === 'Owner'" class="title">MENU OWNER</v-list-item-title>
                    <v-list-item-title v-if="this.$store.getters.employeeRole === 'CS'" class="title">MENU CS</v-list-item-title>
                     <v-list-item-title v-if="this.$store.getters.employeeRole === 'Kasir'" class="title">MENU KASIR</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            
            <v-divider></v-divider>
            <v-list v-if="this.$store.getters.employeeRole === 'Owner'">
                <v-list-item v-for="item in itemOwners" :key="item.title" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title><v-btn text router v-bind:to="item.route">{{item.title}}</v-btn></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-if="this.$store.getters.employeeRole === 'CS'">
                <v-list-item v-for="item in itemCSs" :key="item.title" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title><v-btn text router v-bind:to="item.route">{{item.title}}</v-btn></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
             <v-list v-if="this.$store.getters.employeeRole === 'Kasir'">
                <v-list-item v-for="item in itemKasirs" :key="item.title" link>
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

        <v-app-bar v-if="this.$store.getters.isLoggedIn" white app fixed clipped-left height="70px" color="grey darken-4">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>

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
            drawer: false,
            itemOwners: [
                { 
                    title: 'Data Pegawai', 
                    icon: 'mdi-human-male',
                    route: '/employee',
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
                },
                {
                    title: 'Detail Layanan',
                    icon: 'mdi-book-open',
                    route: '/servicedetail'
                },
                {
                    title: 'Restock Produk',
                    icon: 'mdi-forklift',
                    route: '/restock'
                },
                {
                    title: 'Laporan Terlaris',
                    icon: 'mdi-book',
                    route: '/reportBestSeller'
                },
                {
                    title: 'Laporan Pendapatan',
                    icon: 'mdi-book',
                    route: '/reportIncome'
                },
                {
                    title: 'Laporan Pengadaan',
                    icon: 'mdi-book',
                    route: '/reportProcurement'
                },
                {
                    title: 'Log CS dan Kasir',
                    icon: 'mdi-book',
                    route: '/logCSandKS'
                },
            ],
            itemCSs: [
                {
                    title: 'Data Pelanggan',
                    icon: 'mdi-human',
                    route: '/customer'
                },
                {
                    title: 'Data Hewan',
                    icon: 'mdi-dog',
                    route: '/pet'
                },
                {
                    title: 'Transaksi Produk',
                    icon: 'mdi-cart',
                    route: '/transProduct'
                },
                {
                    title: 'Transaksi Service',
                    icon: 'mdi-cart',
                    route: '/transService'
                },
            ],
            itemKasirs: [
                {
                    title: 'Transaksi Produk',
                    icon: 'mdi-cart',
                    route: '/transProductKS'
                },
                {
                    title: 'Transaksi Service',
                    icon: 'mdi-cart',
                    route: '/transServiceKS'
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