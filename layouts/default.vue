<template>
  <v-app light>
    <v-main class="primary">
      <v-container class="d-flex pb-12 justify-center">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-container>
      <Nuxt />
    </v-main>
    <v-footer
      color="primary"
      :absolute="!fixed"
      app
    >
      <v-col
        class="text-center"
        cols="12"
      >
        &copy; {{ new Date().getFullYear() }} Arobots
        <span
          class="ml-5"
          style="cursor:pointer"
        >Privacy policy</span>
      </v-col>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Arobots',
      tab: null
    }
  }
}
</script>
