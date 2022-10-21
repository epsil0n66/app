<template>
  <v-app light>
    <v-main class="primary">
      <Nuxt />
    </v-main>
    <v-footer
      color="accent"
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
  name: 'ArobotsFrontendMain',

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
