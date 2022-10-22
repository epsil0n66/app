<template>
  <v-container
    class="primary"
    style="max-width: 30%;"
  >
    <v-tabs
      v-model="tab"
      background-color="primary"
      color="primary"
      style="width:190px;"
      class="mx-auto"
    >
      <v-tab>Sign in</v-tab>
      <v-tab>Sign up</v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tab"
    >
      <v-tab-item
        transition="false"
      >
        <v-card
          class="mx-auto"
          color="primary"
        >
          <v-card-text
            class="text-h3 pt-12 text-center"
          >
            Log in to your account
          </v-card-text>
          <v-row
            justify="center"
            no-gutters
          >
            <v-btn
              v-for="(item, index) in socialMediaButtons"
              :key="index"
              fab
              depressed
              color="primary darken-2"
              class="mx-2"
            >
              {{ item.text }}
            </v-btn>
          </v-row>
          <v-card-text
            class="text-h6 pt-6 text-center"
          >
            or
          </v-card-text>
          <v-card
            elevation="0"
            class="mx-auto"
            color="primary"
            max-width="18vw"
          >
            <v-form
              ref="loginForm"
              model="loginFormValidation"
            >
              <v-text-field
                v-model="loginEmailInput"
                :rules="emailRules"
                style="border-radius:16px"
                height="68px"
                solo
                label="Email"
                placeholder="Email"
              />
              <v-text-field
                v-model="loginPasswordInput"
                :rules="passwordRules"
                style="border-radius:16px"
                height="68px"
                solo
                label="Password"
                placeholder="Password"
                password
                type="password"
              />
            </v-form>
            <v-btn
              color="accent"
              width="100%"
              height="56px"
              style="border-radius:16px"
              class="mt-8"
              @click="login"
            >
              Log in
            </v-btn>
            <NuxtLink
              style="text-decoration: none; color: inherit;"
              to="/password_recovery"
            >
              <v-card-text
                class="text-center"
                style="cursor:pointer"
              >
                Forgot password?
              </v-card-text>
            </NuxtLink>
          </v-card>
          <h3>Your role: {{ demoUserRole }}</h3>
          <h3>Your access token: {{ demoToken }}</h3>
          <h3>Your refresh token: {{ demoRefreshToken }}</h3>
        </v-card>
      </v-tab-item>
      <v-tab-item
        transition="false"
      >
        <v-card
          class="mx-auto"
          color="primary"
        >
          <v-card-text
            class="text-h3 pt-12 text-center"
          >
            Welcome to ARobots
          </v-card-text>
          <v-row
            justify="center"
            no-gutters
          >
            <v-btn
              v-for="(item, index) in socialMediaButtons"
              :key="index"
              fab
              depressed
              color="primary darken-2"
              class="mx-2"
            >
              {{ item.text }}
            </v-btn>
          </v-row>
          <v-card-text
            class="text-h6 pt-6 text-center"
          >
            or
          </v-card-text>
          <v-card
            elevation="0"
            class="mx-auto"
            color="primary"
            max-width="18vw"
          >
            <v-form
              ref="signupForm"
              v-model="signupFormValidation"
            >
              <v-text-field
                v-model="signupEmailInput"
                :rules="emailRules"
                style="border-radius:16px"
                height="68px"
                solo
                label="Email"
                placeholder="Email"
              />
            </v-form>
            <v-btn
              color="accent"
              width="100%"
              height="56px"
              style="border-radius:16px"
              class="mt-8"
              @click="signup"
            >
              Create account
            </v-btn>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import config from '@/config'
export default {
  name: 'IndexPage',
  data () {
    return {
      demoToken: null,
      demoRefreshToken: null,
      demoUserRole: null,
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
      tab: null,
      socialMediaButtons: [
        { text: 'GGL' },
        { text: 'FB' },
        { text: 'APL' }
      ],
      loginEmailInput: null,
      loginPasswordInput: null,
      signupEmailInput: null,
      loginFormValidation: false,
      signupFormValidation: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /.{8,}/.test(v) || 'Password must be more than 8 characters',
        v => /^(.{1,128})$/.test(v) || 'Password must be less than 128 characters',
        v => /\d/.test(v) || 'Password must contain at least one digit',
        v => /^\S*$/.test(v) || 'No spaces are allowed'
      ]
    }
  },
  beforeCreate () {
    if (this.$store.getters.getUserRole === 'registered') {
      this.$router.push({
        path: '/main'
      })
    }
  },
  mounted () {
    this.demoUserRole = this.$store.getters.getUserRole
    this.demoToken = this.$store.getters.getToken
    this.demoRefreshToken = this.$store.getters.getRefreshToken
  },
  methods: {
    login () {
      // const data = {
      //   email: this.loginEmailInput,
      //   password: this.loginPasswordInput
      // }
      if (this.$refs.loginForm.validate() === true) {
        this.$store.dispatch('onLogin', {
          email: this.loginEmailInput,
          password: this.loginPasswordInput
        })
        console.log(this.$store.getters.getUserRole)
        // this.$axios.post(`${config.apiUrl}/user/session`, data)
        //   .then((response) => {
        //     console.log(response.headers.authorization)
        //   })
      }
    },
    signup () {
      const data = {
        email: this.signupEmailInput
      }
      if (this.$refs.signupForm.validate() === true) {
        this.$axios.post(`${config.apiUrl}/user/email`, data)
      }
    }
  }
}
</script>
