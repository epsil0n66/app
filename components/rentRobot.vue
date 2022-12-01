<template>
  <div>
    <div
      v-if="pageAlert"
      no-gutters
      class="d-flex align-center"
      style="height: 10vh; width: 100vw; background-color: #aaf7a3; position: fixed; z-index: 10; top: 0; left: 0;"
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
            Rent
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
                v-model="keyFormData.passphrase"
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
              @click="addKey"
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
                :items="['1', '2', '3']"
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
                    v-model="depositFormData.stop_out"
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
              @click="rentRobot"
            >
              Rent
            </v-btn>
          </v-col>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import config from '@/config'
export default {
  name: 'ArobotsFrontendRentRobot',
  data () {
    return {
      guestRentWarningDialog: null,
      rentKeyDialog: false,
      rentDepositDialog: false,
      keyFormData: {
        exchangeID: null,
        key: null,
        passphrase: null
      },
      depositFormData: {
        robotID: null,
        deposit: null,
        stop_out: null
      },
      pageAlert: false,
      pageAlertText: null
    }
  },
  mounted () {
  },
  methods: {
    checkKey (robotID, exchangeID) {
      this.keyFormData.exchangeID = exchangeID
      this.depositFormData.robotID = robotID
      this.$axios(`${config.apiUrl}/user/profile/exchange_secret?robot_id=${this.depositFormData.robotID}`)
        .then((res) => {
          console.log(res.data)
          this.rentDepositDialog = true
        })
        .catch((e) => {
          if (e.response.status === 422) {
            this.rentKeyDialog = true
          }
        })
    },
    addKey () {
      if (this.$refs.keyForm.validate() === true) {
        const data = {
          exchange_id: this.keyFormData.exchangeID,
          key: this.keyFormData.key,
          passphrase: this.keyFormData.passphrase
        }
        this.$axios.post(`${config.apiUrl}/user/profile/exchange_secret`, data)
          .then((res) => {
            console.log(res.data)
            this.rentKeyDialog = false
            this.rentDepositDialog = true
          })
          .catch((e) => {
            console.log(e.response.data)
            this.pageAlertText = e.response.data.errors.title
            this.alertType = 'error'
            this.pageAlert = true
            setTimeout(() => {
              this.pageAlert = false
            }, 5000)
          })
      }
    },
    rentRobot () {
      if (this.$refs.depositForm.validate() === true) {
        const data = {
          robot_id: this.depositFormData.robotID,
          deposit: this.depositFormData.deposit,
          stop_out: this.depositFormData.stop_out
        }
        this.$axios.post(`${config.apiUrl}/rents`, data)
          .then((res) => {
            console.log(res.data)
            this.rentDepositDialog = false
            this.alertType = 'success'
            this.pageAlertText = 'Robot rented successfully'
            this.pageAlert = true
          })
          .catch((e) => {
            console.log(e.response)
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
}
</script>
