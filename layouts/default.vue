<template>
  <v-app light>
    <v-app-bar
      app
      color="white"
      elevation="1"
    >
      <div
        class="d-none d-lg-block"
        style="width:10vw"
      />
      <img
        src="@/static/arobots.png"
        height="36px"
        style="cursor: pointer"
        @click="$router.push('/robots')"
      >
      <v-spacer />
      <button
        v-for="(item, index) in navLinks"
        :key="index"
        color="black"
        class="text-sm-body-2 text-lg-body-1"
        style="line-height:64px; margin: 0 2vw 0"
        :style="[currentURL.includes(item.to) ? {'border-bottom': 'solid green'} : {'border-bottom': 'none'}]"
        @click="$router.push(item.to)"
      >
        {{ item.name }}
      </button>
      <v-spacer />
      <v-col
        justify="end"
      >
        <v-row
          class="profileRow"
          justify="center"
          align="center"
        >
          <v-avatar
            v-show="role === 'registered'"
            size="36"
            color="primary"
            class="mr-2"
          >
            <span class="white--text">{{ nickname.slice(0, 2) }}</span>
          </v-avatar>
          <v-menu>
            <template #activator="{ on, attrs }">
              <span
                v-bind="attrs"
                style="cursor:pointer;"
                v-on="on"
              >
                {{ nickname }}
              </span>
            </template>
            <v-list>
              <v-list-item
                v-show="role === 'registered'"
              >
                <v-list-item-title
                  v-show="role === 'registered'"
                  style="cursor:pointer;"
                  @click="$router.push('/profile/addedrobots')"
                >
                  Added robots
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title
                  v-show="role === 'registered'"
                  style="cursor:pointer;"
                  @click="signOut"
                >
                  Sign out
                </v-list-item-title>
                <v-list-item-title
                  v-show="role !== 'registered'"
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
    </v-app-bar>
    <v-main
      style="background-image: url('_nuxt/static/background.png')"
    >
      <Nuxt />
      <!-- <div class="ellipse1" style="pointer-events: none" />
      <div class="ellipse2" style="pointer-events: none" /> -->
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
          style="margin-left: 5vw"
        >
          <p
            class="text-md-body-2 text-body-2 mb-1 white--text"
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
          style="margin-right: 5vw"
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
        style="margin-left:4vw"
        align="start"
      >
        <p
          class="text-md-body-2 mb-1 white--text"
        >
          All right reserved &copy; Copyright {{ new Date().getFullYear() }}
        </p>
      </v-col>
      <v-col
        style="margin-right:4vw"
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
export default {
  name: 'ArobotsFrontendMain',

  data () {
    return {
      refresher: null,
      navLinks: [
        { name: 'Trading Robots', to: '/robots' },
        { name: 'Referal', to: '/referal' },
        { name: 'About', to: '/about' },
        { name: 'API', to: '/api' }
      ],
      currentURL: null
    }
  },
  computed: {
    role () {
      return this.$store.getters.getUserRole
    },
    nickname () {
      if (this.$store.getters.getUserNickname) {
        return this.$store.getters.getUserNickname
      } else { return 'User' }
    }
  },
  watch: {
    role (newRole, oldRole) {
      console.log(newRole, oldRole)
    },
    nickname (newNickname, oldNickname) {
      console.log(newNickname, oldNickname)
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
    console.log(this.$store.getters.getUserNickname)
  },
  destroyed () {
  },
  methods: {
    signOut () {
      this.$store.dispatch('onSignOut')
      console.log(this.$store.getters.getUserRole)
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss">
* {
  font-family: 'Poppins', sans-serif;
}
.profileRow {
  flex-wrap: nowrap;
}
// .ellipse1 {
//   position: absolute;
//   width: 21vw;
//   height: 39vh;
//   left: -7.3vw;
//   top: 7.9vh;

//   background: rgba(26, 194, 0, 0.1);
//   filter: blur(72px);
// }
// .ellipse2 {
//   position: absolute;
//   width: 17.2vw;
//   height: 30.7vh;
//   left: 99.3vw;
//   top: 49vh;

//   background: rgba(26, 194, 0, 0.06);
//   filter: blur(72px);
// }

</style>
