<template>
  <v-app>
    <v-app-bar app>
      <v-col cols="1" />
      <img src="@/static/arobots.png" height="36px">
      <v-col cols="1" />
      <v-col
        cols="6"
        justify="center"
      >
        <v-btn
          v-for="(item, index) in navLinks"
          :key="index"
          text
          color="black"
          class="mx-10"
        >
          {{ item.name }}
        </v-btn>
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
            src="@/static/arobots.png"
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
                UserName
              </span>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title
                  style="cursor:pointer;"
                  @click="logout"
                >
                  Log out
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
      <v-col cols="1" />
    </v-app-bar>
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <h1 @click="$router.push('/')">
          Arobots
        </h1>
        <h3>Your role: {{ demoUserRole }}</h3>
        <h3>Your access token: {{ demoToken }}</h3>
        <h3>Your refresh token: {{ demoRefreshToken }}</h3>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'ArobotsFrontendMain',
  layout: 'main',
  data () {
    return {
      demoToken: null,
      demoRefreshToken: null,
      demoUserRole: null,
      navLinks: [
        { name: 'Trading Robots' },
        { name: 'Referal' },
        { name: 'About' },
        { name: 'API' }
      ],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  beforeCreate () {
    if (this.$store.getters.getUserRole === 'guest') {
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted () {
    this.demoUserRole = this.$store.getters.getUserRole
    this.demoToken = this.$store.getters.getToken
    this.demoRefreshToken = this.$store.getters.getRefreshToken
  },

  methods: {
    logout () {
      this.$store.dispatch('onLogout')
      console.log(this.$store.getters.getUserRole)
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style>
thead::after
{
    content: "";
    display: block;
    height: 8px;
    width: 100%;
    background: white;
}
.v-data-table > .v-data-table__wrapper > table {
    border-spacing: 0 8px;
}
tbody {
    background-color: #eee;
}
tr {
    line-height: 56px;
}
td:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
td:last-child {
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
}
th {
    background-color: rgb(255, 255, 255);
}
th:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
th:last-child {
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
}

</style>
