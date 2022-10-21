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
      New password
    </v-card-text>
    <v-card
      elevation="0"
      class="mx-auto"
      color="primary"
      max-width="18vw"
    >
      <v-text-field
        v-model="newPasswordInput"
        style="border-radius:16px"
        height="68px"
        solo
        label="Password"
        placeholder="Password"
        password
        type="password"
      />
      <v-text-field
        v-model="repeatPasswordInput"
        style="border-radius:16px"
        height="68px"
        solo
        label="Password"
        placeholder="Password"
        password
        type="password"
      />
      <v-btn
        color="accent"
        width="100%"
        height="56px"
        style="border-radius:16px"
        class="mt-8"
        @click="createNewPassword"
      >
        Create new password
      </v-btn>
    </v-card>
  </v-card>
</template>
<script>
import config from '@/config'
export default {
  name: 'NewPassword',

  data () {
    return {
      newPasswordInput: null,
      repeatPasswordInput: null
    }
  },

  mounted () {

  },

  methods: {
    createNewPassword () {
      const data = {
        new_password: this.newPasswordInput,
        new_password_repeat: this.repeatPasswordInput
      }
      this.$axios.put(`${config.apiUrl}/user/change_password`, data)
    }
  }
}
</script>
