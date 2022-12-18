<template>
  <v-main>
    <v-dialog
      v-model="guestRentWarningDialog"
      width="30vw"
      class="d-flex align-center justify-center"
    >
      <v-card>
        <v-row
          no-gutters
          dense
        >
          <v-spacer />
          <v-icon
            class="ma-3"
            color="grey"
            style="cursor:pointer;"
            @click="guestRentWarningDialog = false"
          >
            mdi-close-circle-outline
          </v-icon>
        </v-row>
        <v-col
          style="flex-direction: column"
          class="d-flex align-center"
          no-gutters
          dense
        >
          <img
            height="100px"
            width="100px"
            style="border-radius: 12px;"
            src="@/static/robotexample2.png"
          >
          <h1
            class="mb-3"
          >
            Rent {{ robotData.data.name }}
          </h1>
          <p class="text--secondary mb-8">
            To rent this robot, please register on ARobots
          </p>
          <v-btn
            class="white--text mb-8"
            color="primary"
            width="170px"
            height="48px"
            @click="$router.push('/')"
          >
            Sign in
          </v-btn>
        </v-col>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="rentKeyDialog"
      width="28vw"
      class="d-flex align-center justify-center"
    >
      <v-card>
        <v-row
          no-gutters
          dense
        >
          <v-spacer />
          <v-icon
            class="ma-3"
            color="grey"
            style="cursor:pointer;"
            @click="rentKeyDialog = false"
          >
            mdi-close-circle-outline
          </v-icon>
        </v-row>
        <div
          style="margin-left:2vw;margin-right:2vw"
        >
          <v-col
            class="pt-0"
            style="flex-direction: column"
            no-gutters
            dense
          >
            <h1
              class="mb-3"
            >
              Work on the exchange
            </h1>
            <p class="text--secondary mb-8">
              Enter the key and secret phrase for the exchange
            </p>
            <v-form ref="keyForm" model="keyFormValidation">
              <v-text-field
                v-model="keyFormData.key"
                style="border-radius: 12px"
                label="Key"
                :rules="[v => !!v || 'Key cannot be empty']"
                hide-details
                dense
                outlined
                class="ml-0 pb-4"
              />
              <v-text-field
                v-model="keyFormData.secretPhrase"
                style="border-radius: 12px"
                label="Secret phrase"
                :rules="[v => !!v || 'Secret phrase cannot be empty']"
                hide-details
                dense
                outlined
                class="ml-0 pb-4"
              />
            </v-form>
            <v-btn
              class="white--text mb-8 mt-4 text-md-body-2"
              color="primary"
              width="180px"
              height="48px"
              @click="rentRobot('deposit')"
            >
              Enter the exchange
            </v-btn>
          </v-col>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="rentDepositDialog"
      width="30vw"
      class="d-flex align-center justify-center"
    >
      <v-card>
        <v-row
          no-gutters
          dense
        >
          <v-spacer />
          <v-icon
            class="ma-3"
            color="grey"
            style="cursor:pointer;"
            @click="rentDepositDialog = false"
          >
            mdi-close-circle-outline
          </v-icon>
        </v-row>
        <div
          style="margin-left:2vw;margin-right:2vw"
        >
          <v-col
            style="flex-direction: column"
            no-gutters
            dense
          >
            <h1
              class="mb-3"
            >
              Work on the exchange
            </h1>
            <p class="text--secondary mb-8">
              Set the deposit amount
            </p>
            <v-form ref="depositForm" model="depositFormValidation">
              <v-select
                style="border-radius: 12px"
                outlined
                dense
                single-line
                label="Binance"
                :items="['Binance spot balance']"
              />
              <v-row>
                <v-col
                  cols="9"
                >
                  <v-slider
                    v-model="depositFormData.deposit"
                    :min="60"
                    :max="900"
                    step="60"
                    ticks="always"
                  />
                </v-col>
                <v-col
                  cols="3"
                >
                  <v-text-field
                    v-model="depositFormData.deposit"
                    label="200"
                    :rules="[v => !!v || 'Deposit cannot be empty']"
                    hide-details
                    dense
                    single-line
                    outlined
                    class="ml-0 pb-4 rounded-lg"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="9"
                >
                  <p class="text--secondary mb-8">
                    Stop renting if the balance becomes less than
                  </p>
                </v-col>
                <v-col
                  cols="3"
                >
                  <v-text-field
                    v-model="depositFormData.stopBalance"
                    label="10"
                    hide-details
                    dense
                    outlined
                    class="ml-0 pb-4 rounded-lg"
                  />
                </v-col>
              </v-row>
            </v-form>
            <v-btn
              class="white--text mb-8"
              color="primary"
              width="170px"
              height="48px"
            >
              Rent
            </v-btn>
          </v-col>
        </div>
      </v-card>
    </v-dialog>
    <span
      style="cursor: pointer;color: transparent; margin-left: 7.3vw;"
      class="text-body-1 px-0 pt-8 green--text"
      @click="$router.push('/robots')"
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
                <span><p style="font-weight:500">Trades:
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
                  {{ robotData.data.total_working_time.days }}D {{ robotData.data.total_working_time.hours }}H </p></span>
                <v-btn
                  class="white--text"
                  color="primary"
                  width="170px"
                  height="48px"
                  @click="rentRobot"
                >
                  Rent
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
                <p
                  class="mb-2"
                  style="font-weight:500;"
                >
                  Currently rents: <span class="mx-3" style="font-weight:400;">12 users</span>
                </p>
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
              <v-row
                class="mt-6 mb-3 justify-end align-end"
              />
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
  </v-main>
</template>

<script>
import Vue from 'vue'
import IconCrypto from 'vue-cryptocurrency-icons'
import config from '@/config'
import twLightCharts from '~/components/twLightCharts.vue'
Vue.use(IconCrypto)

export default {
  components: {
    twLightCharts
  },
  async asyncData ({ params, $axios }) {
    const robotData = await $axios.get(`${config.apiUrl}/robots/${params.robot}`)
    return { robotData }
  },
  data () {
    return {
      userRole: null,
      guestRentWarningDialog: null,
      rentKeyDialog: false,
      rentDepositDialog: false,
      keyFormData: {
        key: null,
        secretPhrase: null
      },
      depositFormData: {
        deposit: null,
        stopBalance: null
      },
      isFavorite: false
    }
  },
  mounted () {
    this.userRole = this.$store.getters.getUserRole
    this.isFavorite = this.robotData.data.favorite
    console.log(this.robotData)
    console.log(this.isFavorite)
  },
  methods: {
    rentRobot (item) {
      if (this.userRole !== 'registered') {
        this.guestRentWarningDialog = true
      } else
      if (this.userRole === 'registered') {
        if (item === 'deposit') {
          this.rentDepositDialog = true
          this.rentKeyDialog = false
        } else {
          this.rentKeyDialog = true
        }
      }
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
