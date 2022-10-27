<template>
  <v-card
    color="primary"
    elevation="10"
    width="400px"
    style="margin-left: 100px; margin-bottom: 66px; margin-top: 66px;"
  >
    <div
      style="padding-top:40px"
      v-if="visibleRecoveryPage == false"
    >
      <v-card
        color="primary"
        elevation="0"
        class="mx-auto"
        max-width="320px"
      >
        <v-tabs
          v-model="tab"
          hide-slider
          fixed-tabs
          centered
        >
          <v-tab>Sign in</v-tab>
          <v-tab>Sign up</v-tab>
        </v-tabs>
      </v-card>
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
            <v-card
              elevation="0"
              class="mx-auto"
              color="primary"
              max-width="320px"
            >
              <v-card-text
                class="text-h5 px-0 pt-8 font-weight-bold black--text"
              >
                Log in to your account
              </v-card-text>
              <v-form
                ref="loginForm"
                model="loginFormValidation"
              >
                <v-text-field
                  v-model="loginEmailInput"
                  :rules="emailRules"
                  style="border-radius:16px"
                  solo
                  dense
                  label="Email"
                  placeholder="Email"
                />
                <v-text-field
                  v-model="loginPasswordInput"
                  :rules="passwordRules"
                  style="border-radius:16px"
                  solo
                  dense
                  label="Password"
                  placeholder="Password"
                  password
                  type="password"
                />
              </v-form>
              <v-container
                class="ma-0 pa-0"
              >
                <v-row
                  no-gutters
                >
                  <v-col
                    cols="6"
                  >
                    <v-btn
                      color="green"
                      width="170px"
                      height="48px"
                      style="border-radius:16px"
                      @click="login"
                    >
                      <p
                        class="text-center pa-0 ma-0 text-body-2 white--text"
                      >
                        Sign in
                      </p>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="6"
                    align-self="center"
                  >
                    <p
                      class="pa-0 ma-0 ml-11 text-body-2 green--text"
                      style="cursor:pointer;"
                      @click="visibleRecoveryPage = true"
                    >
                      Forgot password?
                    </p>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-text
                class="text-h6 pt-6 text-center text-body-2"
              >
                or use
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
                  small
                  class="mx-2 mb-10"
                >
                  {{ item.text }}
                </v-btn>
              </v-row>
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
            <v-card
              elevation="0"
              class="mx-auto"
              color="primary"
              max-width="320px"
            >
              <v-card-text
                class="text-h5 px-0 pt-8 font-weight-bold black--text"
              >
                Welcome to ARobots
              </v-card-text>
              <v-form
                ref="signupForm"
                v-model="signupFormValidation"
              >
                <v-text-field
                  v-model="signupEmailInput"
                  :rules="emailRules"
                  style="border-radius:16px"
                  dense
                  solo
                  label="Email"
                  placeholder="Email"
                />
              </v-form>
              <v-btn
                color="green"
                width="100%"
                height="48px"
                style="border-radius:16px"
                class="mt-8"
                @click="signup"
              >
                <p
                  class="text-center pa-0 ma-0 text-body-2 white--text"
                >
                  Create account
                </p>
              </v-btn>
              <v-card-text
                class="text-h6 pt-6 text-center text-body-2"
              >
                or use
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
                  small
                  class="mx-2 mb-10"
                >
                  {{ item.text }}
                </v-btn>
              </v-row>
            </v-card>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div
      v-if="visibleRecoveryPage == true"
    >
      <v-card
        class="mx-auto"
        color="primary"
      >
        <v-card
          elevation="0"
          class="mx-auto"
          color="primary"
          max-width="320px"
        >
          <v-card-text
            style="cursor: pointer;"
            @click="visibleRecoveryPage = false"
            class="text-body-1 px-0 pt-8 green--text"
          >
            <v-icon
              style="cursor: pointer;"
              color="green"
              class="mb-1"
              @click="visibleRecoveryPage = false"
            >
              mdi-chevron-left
            </v-icon>
            Back
          </v-card-text>
          <v-card-text
            class="text-h5 px-0 pt-8 font-weight-bold black--text"
          >
            Enter the Email to which your account was registered
          </v-card-text>
          <v-form
            ref="signupForm"
            v-model="signupFormValidation"
          >
            <v-text-field
              v-model="recoveryEmailInput"
              :rules="emailRules"
              style="border-radius:16px"
              dense
              solo
              label="Email"
              placeholder="Email"
            />
          </v-form>
          <v-btn
            color="green"
            width="100%"
            height="48px"
            style="border-radius:16px"
            class="mt-4 mb-10"
            @click="passwordRecovery"
          >
            <p
              class="text-center pa-0 ma-0 text-body-2 white--text"
            >
              Send
            </p>
          </v-btn>
        </v-card>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import config from '@/config'
export default {
  name: 'IndexPage',
  layout: 'main',
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
      recoveryEmailInput: null,
      loginFormValidation: false,
      signupFormValidation: false,
      visibleRecoveryPage: false,
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
    async login () {
      // const data = {
      //   email: this.loginEmailInput,
      //   password: this.loginPasswordInput
      // }
      if (this.$refs.loginForm.validate() === true) {
        try {
          await this.$store.dispatch('onLogin', {
            email: this.loginEmailInput,
            password: this.loginPasswordInput
          })
        } catch (e) {
          console.log(e)
        }
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
    },
    passwordRecovery () {
      const data = {
        email: this.recoveryEmailInput
      }
      this.$axios.post(`${config.apiUrl}/user/password_recovery`, data)
    }
  }
}
</script>
<style>
.v-slide-group__content {
  border-radius: 9px;
  border: solid 1px green
}
.v-tab--active {
  margin: 3px;
  border-radius: 9px;
  background-color: green;
}
</style>
