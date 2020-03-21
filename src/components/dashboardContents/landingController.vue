<template>
  <section
    id="welcome"
    class="hide-overflow"
  >
    <v-layout>
      <v-flex
        hidden-sm-and-down
        md6
      >
        <v-img
          src="https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_1280.jpg"
          height="100vh"
        />
      </v-flex>

      <v-flex
        xs12
        md6
        align-content-space-between
        layout
        :pa-5="$vuetify.breakpoint.smAndDown"
        wrap
      >
        <base-bubble-1
          style="transform: rotate(360deg) translateY(200%)"
        />

        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs10
            md6
            class="mt-10"
          >
           <img src = "https://pngimage.net/wp-content/uploads/2018/05/anjing-kartun-png-1.png" style="height:180px;width:100px">
           
            <v-toolbar-title><h1>KOUVEE PETSHOP</h1></v-toolbar-title>
            <br>
            <base-text>
            <p style="text-align:justify">
               Kouvee's Petshop adalah toko yang menyediakan kebutuhan hewan kesayangan Anda!!......
            </p>
            </base-text>
            
            <base-btn class="mt-8" style="button-align:center">
                <v-btn rounded color=#808000 dark router to="/login">LOGIN</v-btn>
            </base-btn>
          </v-flex>
        </v-layout>

        <base-bubble-2
          style="transform: rotate(360deg) translate(-500px, -15%)"
        />
      </v-flex>
    </v-layout>
  </section>
</template>