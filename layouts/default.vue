<template>
  <v-app light>
    <v-app-bar
      app
      color="white"
      elevation="1"
    >
      <v-col cols="1" />
      <img
        src="@/static/arobots.png"
        height="36px"
        style="cursor: pointer"
        @click="$router.push('/main')"
      >
      <v-col cols="1" />
      <v-col
        cols="6"
        justify="center"
      >
        <button
          v-for="(item, index) in navLinks"
          :key="index"
          color="black"
          class="mx-10"
          style="line-height:64px;"
          :style="[currentURL.includes(item.to) ? {'border-bottom': 'solid green'} : {'border-bottom': 'none'}]"
          @click="$router.push(item.to)"
        >
          {{ item.name }}
        </button>
      </v-col>
      <v-spacer />
      <v-col
        justify="end"
      >
        <v-row
          justify="center"
          align="center"
        >
          <img
            v-show="role === 'registered'"
            height="45px"
            width="45px"
            class="rounded-lg mr-6"
          >
          <v-menu>
            <template #activator="{ on, attrs }">
              <span
                v-bind="attrs"
                style="cursor:pointer;"
                v-on="on"
              >
                {{ role }}
              </span>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title
                  v-show="role === 'registered'"
                  style="cursor:pointer;"
                  @click="signOut"
                >
                  Sign out
                </v-list-item-title>
                <v-list-item-title
                  v-show="role === 'guest'"
                  style="cursor:pointer;"
                  @click="$router.push('/')"
                >
                  Sign in
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
      <v-col cols="1" />
    </v-app-bar>
    <v-main>
      <Nuxt />
      <div class="ellipse1" style="pointer-events: none" />
      <div class="ellipse2" style="pointer-events: none" />
    </v-main>
    <v-footer
      color="#1F1F1F"
    >
      <v-row
        class="mt-8"
      >
        <v-col
          cols="3"
          align="start"
          style="margin-left: 100px"
        >
          <p
            class="text-md-body-2 mb-1 white--text"
          >
            Arobots
          </p>
        </v-col>
        <v-spacer />
        <v-col
          align="center"
        >
          <p
            class="text-md-body-2 mb-1  white--text"
          >
            Trading robots
          </p>
        </v-col>
        <v-col
          class="pr-0"
        >
          <p
            class="text-md-body-2 mb-1 ml-7 white--text"
          >
            Referal
          </p>
        </v-col>
        <v-col
          class="pr-0"
        >
          <p
            class="text-md-body-2 mb-1 ml-2 white--text"
          >
            About
          </p>
        </v-col>
        <v-col
          class="pl-0"
        >
          <p
            class="text-md-body-2 mb-1 mr-3 white--text"
          >
            API
          </p>
        </v-col>
        <v-spacer />
        <v-col
          align="end"
        >
          <p
            class="text-md-body-2 mb-1 white--text"
          >
            Privacy policy
          </p>
        </v-col>
        <v-col
          style="margin-right: 100px"
          align="end"
        >
          <p
            class="text-md-body-2 mb-1 white--text"
          >
            Terms of use
          </p>
        </v-col>
      </v-row>
      <v-col cols="12" align="center">
        <v-divider
          color="grey"
          class="mr-16 ml-16"
        />
      </v-col>
      <v-col
        class="mb-4"
        style="margin-left:85px"
        align="start"
      >
        <p
          class="text-md-body-2 mb-1 white--text"
        >
          All right reserved &copy; Copyright {{ new Date().getFullYear() }}
        </p>
      </v-col>
      <v-col
        style="margin-right:85px"
        align="end"
      >
        <p
          class="text-md-caption mb-1 white--text"
        >
          Made by roobinium.io
        </p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import config from '@/config'
export default {
  name: 'ArobotsFrontendMain',

  data () {
    return {
      refresher: null,
      navLinks: [
        { name: 'Trading Robots', to: '/main' },
        { name: 'Referal', to: '/referal' },
        { name: 'About', to: '/about' },
        { name: 'API', to: '/api' }
      ],
      role: null,
      currentURL: null
    }
  },
  beforeCreate () {
    if (!this.$axios.defaults.headers.Authorization) {
      this.$axios.defaults.headers.Authorization = this.$store.getters.getToken
    }
  },
  beforeMount () {
    this.currentURL = document.URL
  },
  mounted () {
    this.role = this.$store.getters.getUserRole
    this.refreshToken()
    if (this.$store.getters.getUserRole === 'registered') {
      this.refreshToken()
      this.refresher = setInterval(() => {
        console.log('qwe')
        this.refreshToken()
      }, 600000)
    }
  },

  destroyed () {
    clearInterval(this.refresher)
  },
  methods: {
    signOut () {
      this.$store.dispatch('onSignOut')
      console.log(this.$store.getters.getUserRole)
      this.$router.push({
        path: '/'
      })
    },
    refreshToken () {
      this.$axios.post(`${config.apiUrl}/user/session/refresh`, { refresh_token: this.$store.getters.getRefreshToken })
        .then((response) => {
          console.log(response)
          this.$axios.defaults.headers.Authorization = `Bearer ${response.headers.authorization}`
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss">
* {
  font-family: 'Poppins', sans-serif;
}
.ellipse1 {
  position: absolute;
  width: 300px;
  height: 300px;
  left: -100px;
  top: 53px;

  background: rgba(26, 194, 0, 0.1);
  filter: blur(72px);
}
.ellipse2 {
  position: absolute;
  width: 236px;
  height: 236px;
  left: 1357px;
  top: 377px;

  background: rgba(26, 194, 0, 0.06);
  filter: blur(72px);
}

</style>
