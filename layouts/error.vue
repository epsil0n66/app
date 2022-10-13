<template>
  <v-app light>
    <v-main class="primary">
      <v-container class="d-flex pb-12 justify-center">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <NuxtLink
          style="text-decoration: none; color: inherit;"
          to="/"
        >
          <v-btn color="accent">
            Home page
          </v-btn>
        </NuxtLink>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
