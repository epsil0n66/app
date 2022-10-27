<template>
  <v-card
    elevation="0"
    class="mx-auto"
    color="primary"
  >
    <NuxtLink
      style="text-decoration: none; color: inherit;"
      to="/"
    >
      <v-card-text
        class="text-h5 p-4 text-center"
      >
        Back
      </v-card-text>
    </NuxtLink>
    <v-card-text
      class="text-h3 pt-12 pb-12 text-center"
    >
      Enter the Email to which your account was registered
    </v-card-text>
    <v-card
      elevation="0"
      class="mx-auto"
      color="primary"
      max-width="18vw"
    >
      <v-text-field
        v-model="recoveryEmailInput"
        style="border-radius:16px"
        height="68px"
        solo
        label="Email"
        placeholder="Email"
      />
      <v-btn
        color="accent"
        width="100%"
        height="56px"
        style="border-radius:16px"
        class="mt-8"
        @click="passwordRecovery"
      >
        Send
      </v-btn>
    </v-card>
  </v-card>
</template>
<script>
import config from '@/config'
export default {
  name: 'PasswordRecovery',

  data () {
    return {
      recoveryEmailInput: null
    }
  },

  mounted () {

  },

  methods: {
    passwordRecovery () {
      const data = {
        email: this.recoveryEmailInput
      }
      this.$axios.post(`${config.apiUrl}/user/password_recovery`, data)
    }
  }
}
</script>
