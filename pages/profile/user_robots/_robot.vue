<template>
  <v-main>
    <v-dialog
      v-model="editRobotDialog"
      width="50vw"
    >
      <v-form
        ref="editRobotForm"
        model="EditRobotFormValidation"
      >
        <v-card>
          <v-row
            no-gutters
            dense
          >
            <v-spacer />
            <v-icon
              class="ma-3"
              @click="editRobotDialog = false"
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
              Edit robot
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
                v-model="editRobotData.name"
                label="Robot name"
                :rules="[v => !!v || 'Name cannot be empty!']"
                hide-details
                dense
                outlined
                class="ml-0 pb-4 rounded-lg"
              />
            </v-col>
            <v-textarea
              v-model="editRobotData.description"
              rows="3"
              label="Description"
              required
              hide-details
              dense
              outlined
              class="ml-0 pb-4 rounded-lg"
            />
            <v-btn
              color="primary"
              height="48px"
              width="170px"
              class="white--text mb-4"
              @click="editRobot"
            >
              Edit robot
            </v-btn>
          </div>
        </v-card>
      </v-form>
    </v-dialog>
    <span
      style="cursor: pointer;color: transparent; margin-left: 7.3vw;"
      class="text-body-1 px-0 pt-8 green--text"
      @click="$router.push('/profile/user_robots')"
    >
      <v-icon
        style="cursor: pointer;"
        color="primary"
        class="mb-1"
      >
        mdi-chevron-left
      </v-icon>
      Back
    </span>
    <v-card
      flat
      style="margin-left: 7.3vw; margin-right: 7.3vw;"
    >
      <v-card>
        <div
          class="ma-6"
        >
          <v-row>
            <v-col
              cols="4"
            >
              <v-row>
                <img
                  style="border-radius: 12px"
                  class="ma-6"
                  width="100"
                  height="100"
                  src="@/static/robotexample2.png"
                >
                <v-col>
                  <h1>{{ robotData.data.name }}</h1>
                  <p class="text-md-body-1 mb-1 font-weight-thin">
                    {{ robotData.data.user_creator }}
                  </p>
                  <div
                    class="ma-0 px-2 py-1 pt-2 d-flex justify-center"
                    :style="[99 > 0 ? {'border': 'solid 1px green'} : { 'border': 'solid 1px red' }]"
                    style="border-radius: 16px;width: fit-content;"
                  >
                    <p class="text-md-body-1 mb-1 font-weight-thin">
                      Profit:
                    </p>
                    <v-icon
                      v-if="99 > 0"
                      class="ml-2"
                      color="green"
                    >
                      mdi-trending-up
                    </v-icon>
                    <v-icon
                      v-else
                      color="red"
                    >
                      mdi-trending-down
                    </v-icon>
                    <p
                      class="mb-0 ml-1 text-caption"
                      :style="[99 > 0 ? { 'color': 'green' } : { 'color': 'red' }]"
                    >
                      {{ 99 }}%
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-col>
                <p
                  style="font-weight:500"
                >
                  Trading strategy:
                </p>
                <p
                  class="text--secondary"
                >
                  This robot will help you earn money. He has been working for a long time and has made many successful deals.
                </p>
                <p
                  style="font-weight:500"
                >
                  Currency:
                  <IconCrypto
                    class="mr-1"
                    format="svg"
                    height="20px"
                    width="20px"
                    :coinname="robotData.data.currency.name.split('/')[0]"
                  />{{ robotData.data.currency.name.split('/')[0] }} /
                  <IconCrypto
                    class="mr-1"
                    format="svg"
                    height="20px"
                    width="20px"
                    :coinname="robotData.data.currency.name.split('/')[1]"
                  />{{ robotData.data.currency.name.split('/')[1] }}
                </p>
                <p
                  style="font-weight:500"
                >
                  Stock:
                  <IconCrypto
                    class="mr-1"
                    :coinname="robotData.data.exchange.name"
                    color="color"
                    format="svg"
                    height="20px"
                    width="20px"
                  />
                  {{ robotData.data.exchange.name }}
                </p>
                <span>
                  <p style="font-weight:500">
                    Trades:
                    <v-icon
                      color="green"
                    >
                      mdi-swap-horizontal
                    </v-icon>
                    {{ robotData.data.worked_orders }} Time:
                    <v-icon
                      color="green"
                    >
                      mdi-clock-time-three-outline
                    </v-icon>
                    {{ robotData.data.total_working_time.days }}D {{ robotData.data.total_working_time.hours }}H </p>
                </span>
                <p
                  style="font-weight:500"
                >
                  API key: {{ robotData.headers.authorization }}
                  <v-icon
                    class="ml-2"
                    color="green"
                    style="cursor:pointer"
                    @click="copy(robotData.headers.authorization)"
                  >
                    mdi-content-copy
                  </v-icon>
                </p>
                <v-btn
                  class="white--text"
                  color="primary"
                  width="170px"
                  height="48px"
                  @click="editRobotDialog = true"
                >
                  Edit
                </v-btn>
              </v-col>
            </v-col>
            <v-spacer />
            <v-col
              cols="12"
              sm="8"
            >
              <v-row
                class="mt-6 mb-3 justify-end align-end"
              >
                <v-icon
                  v-if="isFavorite"
                  class="ma-2"
                  color="green"
                  @click="favorite"
                >
                  mdi-star
                </v-icon>
                <v-icon
                  v-else
                  class="ma-2"
                  color="green"
                  @click="favorite"
                >
                  mdi-star-outline
                </v-icon>
                <div
                  class="ma-0 px-2 py-2 mx-6 d-flex justify-center align-start"
                  style="border-radius: 16px;width: fit-content"
                  :style="[robotData.data.online ? { 'border': 'solid 1px green' } : { 'border': 'solid 1px red' }]"
                >
                  <v-icon
                    class="mr-2"
                    :color="robotData.data.online ? 'green': 'red' "
                  >
                    mdi-circle
                  </v-icon>
                  <p
                    v-if="robotData.data.online"
                    class="ma-0 text-body-2"
                  >
                    Online
                  </p>
                  <p
                    v-else
                    class="ma-0 text-body-2"
                  >
                    Offline
                  </p>
                </div>
              </v-row>
              <twLightCharts />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="4"
            />
            <v-col
              cols="8"
            />
          </v-row>
        </div>
      </v-card>
    </v-card>
    <div
      flat
      style="margin-left: 7.3vw; margin-right: 7.3vw;"
    >
      <ordersTable
        :orders-table-data="orderData.data"
      />
    </div>
  </v-main>
</template>

<script>
import Vue from 'vue'
import IconCrypto from 'vue-cryptocurrency-icons'
import config from '@/config'
import ordersTable from '~/components/ordersTable.vue'
Vue.use(IconCrypto)

export default {
  components: {
    ordersTable
  },
  async asyncData ({ params, $axios }) {
    let robotData = await $axios.get(`${config.apiUrl}/user_robots/${params.robot}`)
      .catch(() => {
        console.log('error')
      })
    if (!robotData) {
      robotData = await $axios.get(`${config.apiUrl}/user_robots/${params.robot}`)
    }
    let orderData = await $axios.get(`${config.apiUrl}/orders?robot_id=${params.robot}`)
      .catch(() => {
        console.log('error')
      })
    if (!orderData) {
      orderData = await $axios.get(`${config.apiUrl}/orders?robot_id=${params.robot}`)
    }
    console.log(orderData.data)
    return { robotData, orderData }
  },
  data () {
    return {
      userRole: null,
      editRobotDialog: false,
      editRobotData: {
        name: null,
        description: null,
        imageId: null,
        file: null
      },
      key: null,
      url: null,
      isFavorite: false,
      ordersTableData: []
    }
  },
  mounted () {
    this.userRole = this.$store.getters.getUserRole
    console.log(this.robotData)
    this.isFavorite = this.robotData.data.favorite
  },
  methods: {
    editRobot () {
      if (this.$refs.editRobotForm.validate() === true) {
        const data = {
          name: this.editRobotData.name
        }
        if (this.editRobotData.description) {
          data.description = this.editRobotData.description
        }
        if (this.editRobotData.file) {
          const formData = new FormData()
          formData.append('file', this.editRobotData.file)
        }
        console.log(data)
      }
    },
    onFileChange (e) {
      this.editRobotData.file = e.target.files[0]
      this.url = URL.createObjectURL(this.editRobotData.file)
      console.log(this.url)
    },
    copy (item) {
      navigator.clipboard.writeText(item)
    },
    favorite () {
      if (this.isFavorite === false) {
        this.$axios.post(`${config.apiUrl}/favorites`, { robot_id: this.robotData.data.id })
          .then(() => {
            this.isFavorite = !this.isFavorite
          })
      } else {
        this.$axios.delete(`${config.apiUrl}/favorites/${this.robotData.data.id}`)
          .then(() => {
            this.isFavorite = !this.isFavorite
          })
      }
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
