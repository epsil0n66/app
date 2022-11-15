<template>
  <v-app>
    <div
      v-if="pageAlert"
      no-gutters
      class="d-flex align-center"
      style="height: 10vh; width: 100vw; background-color: #aaf7a3; position: fixed; z-index: 99999999; top: 0"
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
          style="margin-left: 8vw; margin-right: 8vw;"
        >
          <v-row
            no-gutters
          >
            <h1>Arobots</h1>
            <v-spacer />
            <v-btn
              height="48px"
              width="150px"
              class="white--text mb-4"
              color="primary"
              @click="addRobotDialog = true"
            >
              Add robot
            </v-btn>
          </v-row>
          <RobotsTable
            :hide-footer="true"
            :robots-table-data="robotsTableData"
          />
        </v-card>
        <v-dialog
          v-model="addRobotDialog"
          width="50vw"
        >
          <v-form
            ref="addRobotForm"
            model="AddRobotFormValidation"
          >
            <v-card>
              <v-row
                no-gutters
                dense
              >
                <v-spacer />
                <v-icon
                  class="ma-3"
                  @click="addRobotDialog = false"
                >
                  mdi-close-circle-outline
                </v-icon>
              </v-row>
              <div
                style="margin-left:3vw;margin-right:3vw"
              >
                <h1
                  class="mb-8"
                >
                  Add robot
                </h1>
                <v-container
                  no-gutters
                >
                  <v-row
                    no-gutters
                  >
                    <img
                      style="border-radius: 12px"
                      class="mb-4"
                      width="100"
                      height="100"
                      :src="url ? url : require(`@/static/robotexample.png`)"
                    >
                    <v-col
                      class="ml-4"
                    >
                      <h3
                        class="mb-2"
                      >
                        Avatar
                      </h3>
                      <input
                        id="file"
                        type="file"
                        class="inputfile"
                        @change="onFileChange"
                      >
                      <label
                        for="file"
                      >
                        <p
                          class="mb-1"
                          style="color:#4CAF50; cursor: pointer;"
                        >
                          <v-icon
                            color="green"
                          >
                            mdi-upload
                          </v-icon>
                          Upload
                        </p>
                      </label>
                      <p
                        class="text-caption mb-1"
                      >
                        Format .png or .jpg
                      </p>
                      <p
                        class="text-caption mb-1"
                      >
                        Max. size 5 MB
                      </p>
                    </v-col>
                  </v-row>
                </v-container>

                <v-col
                  class="pa-0"
                  cols="6"
                >
                  <v-text-field
                    v-model="addRobotData.name"
                    label="Robot name"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    hide-details
                    dense
                    outlined
                    class="ml-0 pb-4 rounded-lg"
                  />
                </v-col>
                <v-textarea
                  v-model="addRobotData.description"
                  rows="3"
                  label="Description"
                  required
                  hide-details
                  dense
                  outlined
                  class="ml-0 pb-4 rounded-lg"
                />
                <v-row
                  no-gutters
                  class="pa-0 pb-4"
                >
                  <v-col
                    no-gutters
                    cols="12"
                    md="4"
                  >
                    <v-select
                      v-model="addRobotData.exchange"
                      label="Exchange"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      return-object
                      required
                      item-text="name"
                      hide-details
                      dense
                      outlined
                      single-line
                      class="mx-2 rounded-lg"
                      :items="addRobotData.exchangeItems"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-autocomplete
                      v-model="addRobotData.currency"
                      label="Currency"
                      return-object
                      required
                      :rules="[v => !!v || 'You must agree to continue!']"
                      item-text="name"
                      hide-details
                      dense
                      outlined
                      single-line
                      class="mx-2 rounded-lg"
                      :items="addRobotData.currencyItems"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-select
                      v-model="addRobotData.timeframe"
                      label="Timeframe"
                      return-object
                      :rules="[v => !!v || 'You must agree to continue!']"
                      required
                      hide-details
                      dense
                      outlined
                      single-line
                      class="mx-2 rounded-lg"
                      :items="addRobotData.timeframeItems"
                    >
                      <template #selection="data">
                        {{ data.item.time }}{{ data.item.name }}
                      </template>
                      <template #item="data">
                        {{ data.item.time }}{{ data.item.name }}
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-checkbox
                    v-model="addRobotData.sell"
                    :rules="checkboxRules"
                    color="primary"
                    label="side Sell"
                  >
                    Sell
                  </v-checkbox>
                  <v-checkbox
                    v-model="addRobotData.buy"
                    :rules="checkboxRules"
                    color="primary"
                    class="pl-8"
                    label="side Buy"
                  >
                    Buy
                  </v-checkbox>
                </v-row>
                <v-btn
                  color="primary"
                  height="48px"
                  width="170px"
                  class="white--text mb-4"
                  @click="addRobot"
                >
                  Add robot
                </v-btn>
              </div>
            </v-card>
          </v-form>
        </v-dialog>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import RobotsTable from '~/components/robotsTable.vue'
import config from '@/config'

export default {
  name: 'ArobotsFrontendAddedRobots',
  components: { RobotsTable },
  data () {
    return {
      pageAlert: false,
      pageAlertText: null,
      addRobotDialog: false,
      alertType: null,
      addRobotData: {
        name: null,
        description: null,
        exchange: null,
        exchangeItems: [],
        currency: null,
        currencyItems: [],
        timeframe: null,
        timeframeItems: [],
        sell: false,
        buy: false,
        imageId: null,
        file: null
      },
      robotsTableData: [],
      url: null
    }
  },
  computed: {
    checkboxRules () {
      return [
        (this.addRobotData.buy || this.addRobotData.sell) === true || 'At least one item should be selected'
      ]
    }
  },
  mounted () {
    this.$axios.get(`${config.apiUrl}/currencies`).then((res) => {
      this.addRobotData.currencyItems = res.data
    })
    this.$axios.get(`${config.apiUrl}/exchanges`).then((res) => {
      this.addRobotData.exchangeItems = res.data
    })
    this.$axios.get(`${config.apiUrl}/timeframes`).then((res) => {
      this.addRobotData.timeframeItems = res.data
    })
    this.$axios.get(`${config.apiUrl}/user_robots`).then((res) => {
      this.robotsTableData = res.data
    })
      .catch(() => {
        this.$axios.get(`${config.apiUrl}/user_robots`).then((res) => {
          this.robotsTableData = res.data
        })
      })
  },
  methods: {
    addRobot () {
      if (this.$refs.addRobotForm.validate() === true) {
        const data = {
          name: this.addRobotData.name,
          exchange_id: this.addRobotData.exchange.id,
          currency_id: this.addRobotData.currency.id,
          timeframe_id: this.addRobotData.timeframe.id,
          sell: this.addRobotData.sell,
          buy: this.addRobotData.buy
        }
        if (this.addRobotData.description) {
          data.description = this.addRobotData.description
        }
        if (this.addRobotData.file) {
          const formData = new FormData()
          formData.append('file', this.addRobotData.file)
          this.$axios.post(`${config.apiUrl}/images`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res) => {
            this.addRobotData.imageId = res.data.id
            data.image_id = parseInt(res.data.id)
            console.log(data)
            this.$axios.post(`${config.apiUrl}/robots`, data)
          })
            .catch(() => {
              setTimeout(() => {
                this.$axios.post(`${config.apiUrl}/images`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then((res) => {
                  this.addRobotData.imageId = res.data.id
                  data.image_id = res.data.id
                  console.log(data)
                  this.$axios.post(`${config.apiUrl}/robots`, data)
                    .catch((e) => {
                      this.pageAlert = true
                      this.alertType = 'error'
                      this.pageAlertText = e.response.data.errors.title
                      setTimeout(() => {
                        this.pageAlert = false
                      }, 5000)
                    })
                })
              }, 300)
              return false
            })
          return
        }
        console.log(data)
        this.$axios.post(`${config.apiUrl}/robots`, data)
          .then(() => {
            this.pageAlert = true
            this.alertType = 'success'
            this.pageAlertText = 'Robot created succesfully'
            this.addRobotDialog = false
            setTimeout(() => {
              this.pageAlert = false
            }, 5000)
          })
          .catch((e) => {
            setTimeout(() => {
              console.log(e.status)
              this.$axios.post(`${config.apiUrl}/robots`, data)
                .catch((e) => {
                  this.pageAlert = true
                  this.alertType = 'error'
                  this.pageAlertText = e.response.data.errors.title
                  setTimeout(() => {
                    this.pageAlert = false
                  }, 5000)
                })
            }, 300)
          })
      }
    },
    onFileChange (e) {
      this.addRobotData.file = e.target.files[0]
      this.url = URL.createObjectURL(this.addRobotData.file)
      console.log(this.url)
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
