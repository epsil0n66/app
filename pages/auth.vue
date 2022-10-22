<template>
  <div />
</template>

<script>
export default {
  name: 'ArobotsFrontendAuth',
  layout: 'main',
  data () {
    return {
      email: null,
      registration_token: null
    }
  },

  mounted () {
    const url = document.URL
    this.email = decodeURI(url.slice(url.indexOf('=') + 1, url.indexOf('&')).replace('%40', '@'))
    this.registration_token = url.slice(url.indexOf('=') + 1).slice(url.slice(url.indexOf('=') + 1).indexOf('=') + 1)
    console.log(this.email)
    console.log(this.registration_token)
    this.$store.dispatch('onRegister', {
      email: this.email,
      registrationToken: this.registration_token
    })
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
