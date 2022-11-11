<template>
  <div>
    <div
      v-if="pageAlert"
      no-gutters
      class="d-flex align-center"
      style="height: 10vh; width: 100vw; background-color: #aaf7a3; position: fixed; z-index: 10; top: 0"
      :style="[alertType === 'error' ? { 'background-color': '#f94449' } : { 'background-color': '#aaf7a3' }]"
    >
      <v-icon
        v-if="alertType != 'error'"
        color="#1AC200"
        class="mr-2"
        style="margin-left:10%;"
      >
        mdi-check-circle-outline
      </v-icon>
      <v-icon
        v-if="alertType === 'error'"
        color="white"
        class="mr-2"
        style="margin-left:10%;"
      >
        mdi-alert
      </v-icon>
      <p
        v-if="alertType != 'error'"
        class="ma-0"
        style="color:#1AC200;"
      >
        Thanks!
      </p>
      <p
        :class="[alertType === 'error' ? 'white--text' : '']"
        class="pl-6 ma-0"
      >
        {{ pageAlertText }}
      </p>
      <v-spacer />
      <v-icon
        color="white"
        float="right"
        style="cursor:pointer; margin-right: 10vw;"
        @click="pageAlert = false"
      >
        mdi-close-circle-outline
      </v-icon>
    </div>
    <v-card
      elevation="3"
      width="400px"
      style="margin-left: 7.3vw; margin-bottom: 8.5vh; margin-top: 8.5vh; z-index: 1"
    >
      <div
        v-if="visibleRecoveryPage == false"
        style="padding-top:40px"
      >
        <v-card
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
            <v-tab
              class="text-none"
            >
              Sign in
            </v-tab>
            <v-tab
              class="text-none"
            >
              Sign up
            </v-tab>
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
            >
              <v-card
                elevation="0"
                class="mx-auto"
                max-width="320px"
              >
                <v-card-text
                  class="text-h5 px-0 pt-8  black--text"
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
                    style="border-radius:12px"
                    outlined
                    single-line
                    dense
                    label="Email"
                    placeholder="Email"
                  />
                  <v-text-field
                    v-model="loginPasswordInput"
                    :rules="passwordRules"
                    style="border-radius:12px"
                    outlined
                    single-line
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
                        color="primary"
                        width="170px"
                        height="48px"
                        style="border-radius:12px"
                        @click="login"
                      >
                        <p
                          class="text-center pa-0 ma-0 text-body-2 white--text text-none"
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
                  <v-alert
                    class="mt-6"
                    rounded-lg
                    :value="alert"
                    :type="alertType"
                  >
                    {{ alertText }}
                    <v-btn
                      fab
                      height="24px"
                      width="24px"
                      color="white"
                      x-small
                      style="float: right;"
                      @click="alert = !alert"
                    >
                      <v-icon
                        color="red"
                      >
                        mdi-close
                      </v-icon>
                    </v-btn>
                  </v-alert>
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
            </v-card>
          </v-tab-item>
          <v-tab-item
            transition="false"
          >
            <v-card
              class="mx-auto"
            >
              <v-card
                elevation="0"
                class="mx-auto"
                max-width="320px"
              >
                <v-card-text
                  class="text-h5 px-0 pt-8  black--text"
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
                    style="border-radius:12px"
                    dense
                    outlined
                    single-line
                    label="Email"
                    placeholder="Email"
                  />
                  <v-checkbox
                    v-model="termsCheckbox"
                    required
                    class="mt-0"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    color="primary"
                  >
                    <template #label>
                      <div>
                        I agree with the
                        <a
                          target="_blank"
                          href="/terms"
                          style="color:black;margin: 0;padding: 0;"
                          @click.stop
                        >
                          Term of use
                        </a>
                      </div>
                    </template>
                  </v-checkbox>
                </v-form>
                <v-btn
                  color="primary"
                  width="100%"
                  height="48px"
                  class="mt-2"
                  style="border-radius:12px"
                  @click="signup"
                >
                  <p
                    class="text-center pa-0 ma-0 text-body-2 white--text text-none"
                  >
                    Create account
                  </p>
                </v-btn>
                <v-alert
                  class="mt-6"
                  rounded-lg
                  :value="alertSignUp"
                  :type="alertType"
                >
                  {{ alertSignUpText }}
                  <v-btn
                    fab
                    height="24px"
                    width="24px"
                    color="white"
                    x-small
                    style="float: right;"
                    @click="alertSignUp = !alertSignUp"
                  >
                    <v-icon
                      color="red"
                    >
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-alert>
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
        >
          <v-card
            elevation="0"
            class="mx-auto pb-4"
            max-width="320px"
          >
            <v-card-text
              style="cursor: pointer;"
              class="text-body-1 px-0 pt-8 green--text"
              @click="visibleRecoveryPage = false"
            >
              <v-icon
                style="cursor: pointer;"
                color="primary"
                class="mb-1"
                @click="visibleRecoveryPage = false; alertRecovery = false"
              >
                mdi-chevron-left
              </v-icon>
              Back
            </v-card-text>
            <v-card-text
              class="text-h5 px-0 pt-8  black--text"
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
                style="border-radius:12px"
                dense
                outlined
                single-line
                label="Email"
                placeholder="Email"
              />
            </v-form>
            <v-btn
              color="primary"
              width="100%"
              height="48px"
              style="border-radius:12px"
              class="mt-4 mb-6"
              @click="passwordRecovery"
            >
              <p
                class="text-center pa-0 ma-0 text-body-2 white--text text-none "
              >
                Send
              </p>
            </v-btn>
            <v-alert
              class="mb-5"
              rounded-lg
              :value="alertRecovery"
              :type="alertType"
            >
              {{ alertRecoveryText }}
              <v-btn
                fab
                height="24px"
                width="24px"
                color="white"
                x-small
                style="float: right;"
                @click="alertRecovery = !alertRecovery"
              >
                <v-icon
                  color="red"
                >
                  mdi-close
                </v-icon>
              </v-btn>
            </v-alert>
          </v-card>
        </v-card>
      </div>
    </v-card>
  </div>
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
      pageAlert: false,
      pageAlertText: null,
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
      termsCheckbox: false,
      visibleRecoveryPage: false,
      alert: false,
      alertSignUp: false,
      alertRecovery: false,
      alertText: null,
      alertSignUpText: null,
      alertRecoveryText: null,
      alertType: null,
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
      if (this.$refs.loginForm.validate() === true) {
        try {
          await this.$store.dispatch('onSignIn', {
            email: this.loginEmailInput,
            password: this.loginPasswordInput
          })
            .then(() => {
              this.alertType = 'success'
            })
        } catch (e) {
          this.pageAlertText = e.response.data.errors.title
          this.alertType = 'error'
          this.pageAlert = true
          setTimeout(() => {
            this.pageAlert = false
          }, 5000)
        }
      }
    },
    signup () {
      const data = {
        email: this.signupEmailInput
      }
      if (this.$refs.signupForm.validate() === true) {
        this.$axios.post(`${config.apiUrl}/user/email`, data)
          .then(() => {
            this.alertType = 'success'
            this.pageAlertText = 'Confirmation link has been sent to your email'
            this.pageAlert = true
          })
          .catch((e) => {
            this.pageAlertText = e.response.data.errors.title
            this.alertType = 'error'
            this.pageAlert = true
            setTimeout(() => {
              this.pageAlert = false
            }, 5000)
          })
      }
    },
    passwordRecovery () {
      const data = {
        email: this.recoveryEmailInput
      }
      this.$axios.post(`${config.apiUrl}/user/password_recovery`, data)
        .then(() => {
          this.alertType = 'success'
          this.pageAlertText = 'Link to create a new password has been sent to your email'
          this.pageAlert = true
        })
        .catch((e) => {
          console.log(this.alertRecovery)
          this.pageAlertText = e.response.data.errors.title
          this.alertType = 'error'
          this.pageAlert = true
          setTimeout(() => {
            this.pageAlert = false
          }, 5000)
        })
    }
  }
}
</script>
<style>
.v-sheet.v-card {
  border-radius: 12px;
}
.btn {
    text-transform: unset !important;
}
.v-application .text-h5 {
  font-weight: 600;
}
.v-slide-group__content {
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 9px;
  border: solid 1px #1AC200
}
.v-tab.v-tab {
  color: white;
}
.v-tab--active {
  margin: 3px;
  border-radius: 9px;
  background-color: #1AC200;
}
</style>
