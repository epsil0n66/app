<template>
  <v-app>
    <div
      v-if="pageAlert"
      no-gutters
      class="d-flex align-center"
      style="height: 10vh; width: 100vw; background-color: #aaf7a3; position: fixed; z-index: 999; top: 0"
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
    <v-main>
      <div>
        <v-card
          flat
          style="margin-left: 8vw; margin-right: 8vw; background-color: transparent;"
        >
          <v-row
            no-gutters
          >
            <h1>Arobots</h1>
            <v-spacer />
            <v-btn
              v-for="button in buttons"
              :key="button.id"
              :style="[button.active ? {'color': 'primary'} : {'background': '#FFF'}]"
              height="48px"
              width="150px"
              style="border-radius:12px ;"
              :outlined="!button.active"
              color="primary"
              class="mb-4 mx-3"
              :class="{ 'white--text' : button.active }"
              @click="toggleQuery(button)"
            >
              {{ button.name }}
            </v-btn>
          </v-row>
          <RobotsTable
            :hide-footer="true"
            :robots-table-data="robotsTableData"
            :robots-path="'rented_robots'"
          />
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import RobotsTable from '~/components/securitiesTable.vue'
import config from '@/config'

export default {
  name: 'ArobotsFrontendAddedRobots',
  components: { RobotsTable },
  data () {
    return {
      pageAlert: false,
      pageAlertText: null,
      alertType: null,
      robotsTableData: [],
      url: null,
      buttons: [
        { name: 'Rent', active: true },
        { name: 'Active', active: false },
        { name: 'Archive', active: false }
      ]
    }
  },
  mounted () {
    this.$axios.get(`${config.apiUrl}/rents?page=1`).then((res) => {
      this.robotsTableData = res.data.map(el => el.robot)
    })
      .catch((e) => {
        if (e.response.status === 401) {
          this.$axios.get(`${config.apiUrl}/rents?page=1`).then((res) => {
            this.robotsTableData = res.data.map(el => el.robot)
          })
        }
      })
  },
  methods: {
    toggleQuery (button) {
      const index = this.buttons.indexOf(button)
      this.buttons.forEach((button) => { button.active = false })
      this.buttons[index].active = true
      const pages = 1
      let filterQuery = `page=${pages}&`
      if (index === 1) {
        filterQuery += 'active=true'
      }
      if (index === 2) {
        filterQuery += 'archived=true'
      }
      this.$axios.get(`${config.apiUrl}/rents?${filterQuery}`).then((res) => {
        if (res.data) {
          this.robotsTableData = res.data.map(el => el.robot)
        } else {
          this.robotsTableData = null
        }
      })
      console.log(filterQuery)
    }
  }
}
</script>

<style lang="scss" scoped>
.inputfile {
width: 0.1px;
height: 0.1px;
opacity: 0;
overflow: hidden;
position: absolute;
z-index: -1;
}
</style>
