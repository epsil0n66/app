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
            <v-text-field
              v-model="loginEmailInput"
              style="border-radius:16px"
              height="68px"
              solo
              label="Email"
              placeholder="Email"
            />
            <v-text-field
              v-model="loginPasswordInput"
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
            <v-text-field
              v-model="loginEmailInput"
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
export default {
  name: 'IndexPage',
  data () {
    return {
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
      ]
    }
  }
}
</script>
