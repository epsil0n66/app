<template>
  <div
    style="float:right"
  >
    <v-col
      style="width:600px"
    >
      <v-row>
        <v-menu
          max-height="300px"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              class="ma-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ currentInterval.time + currentInterval.name }}
            </v-btn>
          </template>
          <v-list
            v-for="item in intervalMenu"
            :key="item.id"
            link
          >
            <v-list-item
              @click="(currentInterval = item)"
            >
              <v-list-item-title>{{ item.time }} {{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          max-height="300px"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              class="ma-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ currentSeries.name }}
            </v-btn>
          </template>
          <v-list
            v-for="item in seriesMenu"
            :key="item.id"
            link
          >
            <v-list-item
              @click="(currentSeries = item)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          class="ma-2"
          @click="enterFullscreen"
        >
          Enter fullscreen
        </v-btn>
        <v-btn
          class="ma-2"
          @click="takeScreenshot"
        >
          Take screenshot
        </v-btn>
      </v-row>
      <div
        :id="chartID"
        style="padding-top:24px"
        class="twchart"
      />
    </v-col>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'
let chart
let instance
let candlestickSeries
let barSeries
let lineSeries
let timeScale

export default {
  name: 'ArobotsFrontendTwLightCharts',
  data () {
    return {
      chartID: 'twChart',
      intervalMenu: [],
      currentInterval: { time: '1', name: 'm' },
      seriesMenu: [
        { name: 'Candlestick', id: 0 },
        { name: 'Bar', id: 1 },
        { name: 'Line', id: 2 }
      ],
      currentSeries: { name: 'Candlestick', id: 0 },
      chartData: null,
      lineData: null,
      timer: null
    }
  },
  watch: {
    currentInterval () {
      this.loadData().then(() => {
        this.applySeries()
      })
    },
    currentSeries () {
      this.applySeries()
    }
  },
  mounted () {
    instance = this.$axios.create()
    delete instance.defaults.headers.Authorization
    instance('http://arobots.evospb.ru/api/timeframes')
      .then((res) => {
        this.intervalMenu = res.data
      })
    this.loadData().then(() => {
      this.applySeries()
      this.watchForUpdate()
    })
    function fullscreenchanged () {
    // document.fullscreenElement will point to the element that
    // is in fullscreen mode if there is one. If not, the value
    // of the property is null.
      if (document.fullscreenElement) {
        console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`)
      } else {
        chart.applyOptions({ width: 600, height: 400 })
        console.log('Leaving fullscreen mode.')
      }
    };
    const chartEl = document.getElementById('twChart')
    chartEl.addEventListener('fullscreenchange', fullscreenchanged)
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1m')
    socket.onmessage = function (event) {
      const a = JSON.parse(event.data).k
      if (candlestickSeries) {
        candlestickSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
      }
      if (barSeries) {
        barSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
      }
      if (lineSeries) {
        lineSeries.update({ time: a.t / 1000, value: parseFloat(a.c) })
      }
    }
    const maxPriceLine = {
      price: 1280,
      color: 'red',
      lineWidth: 2,
      lineStyle: 2, // LineStyle.Dashed
      axisLabelVisible: true,
      title: 'Price'
    }
    const markers = [
      {
        time: Date.now() / 1000,
        position: 'aboveBar',
        color: 'green',
        shape: 'circle',
        text: 'Marker'
      }
    ]
    if (candlestickSeries) {
      candlestickSeries.createPriceLine(maxPriceLine)
      candlestickSeries.setMarkers(markers)
    } else if (barSeries) {
      barSeries.createPriceLine(maxPriceLine)
      barSeries.setMarkers(markers)
    } else if (lineSeries) {
      lineSeries.createPriceLine(maxPriceLine)
      lineSeries.setMarkers(markers)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    applySeries () {
      if (chart) {
        chart.remove()
      }
      chart = createChart(this.chartID,
        {
          rightPriceScale: { visible: true },
          leftPriceScale: { visible: true },
          width: 600,
          height: 400,
          crosshair: { mode: 0 },
          timeScale: {
            timeVisible: true,
            secondsVisible: false
          }
        })
      if (document.fullscreenElement) {
        // If the document is not in full screen mode
        // make the video full screen
        chart.applyOptions({ width: 1800, height: 900 })
      }
      timeScale = chart.timeScale()
      switch (this.currentSeries.id) {
        case (0):
          candlestickSeries = chart.addCandlestickSeries()
          candlestickSeries.setData(this.chartData)
          barSeries = undefined
          lineSeries = undefined
          break
        case (1):
          barSeries = chart.addBarSeries()
          barSeries.setData(this.chartData)
          candlestickSeries = undefined
          lineSeries = undefined
          break
        case (2):
          lineSeries = chart.addLineSeries()
          lineSeries.setData(this.lineData)
          candlestickSeries = undefined
          barSeries = undefined
      }
    },
    async loadData () {
      await instance(`https://www.binance.com/api/v3/uiKlines?symbol=ETHBUSD&interval=${this.currentInterval.time}${this.currentInterval.name}&limit=1000`)
        .then((res) => {
          this.chartData = res.data.map((a) => {
            return { time: a[0] / 1000, open: parseFloat(a[1]), high: parseFloat(a[2]), low: parseFloat(a[3]), close: parseFloat(a[4]) }
          })
          console.log(res)
          this.lineData = res.data.map((a) => {
            return { time: a[0] / 1000, value: parseFloat(a[4]) }
          })
        })
    },
    updateData (time) {
      instance(`https://www.binance.com/api/v3/uiKlines?symbol=ETHBUSD&interval=${this.currentInterval.time}${this.currentInterval.name}&limit=1000&endTime=${time}`)
        .then((res) => {
          const chartData = res.data.map((a) => {
            return { time: a[0] / 1000, open: parseFloat(a[1]), high: parseFloat(a[2]), low: parseFloat(a[3]), close: parseFloat(a[4]) }
          })
          chartData.pop()
          this.chartData = chartData.concat(this.chartData)
          const lineData = res.data.map((a) => {
            return { time: a[0] / 1000, value: parseFloat(a[4]) }
          })
          lineData.pop()
          this.lineData = lineData.concat(this.lineData)
          console.log(this.chartData)
          this.watchForUpdate()
          this.applySeries()
        })
    },
    watchForUpdate () {
      timeScale = chart.timeScale()
      this.timer = setInterval(async () => {
        const logicalRange = timeScale.getVisibleLogicalRange()
        if (logicalRange !== null) {
          if (candlestickSeries) {
            const barsInfo = candlestickSeries.barsInLogicalRange(logicalRange)
            if (barsInfo !== null && barsInfo.barsBefore < 10) {
              await this.updateData(this.chartData[0].time * 1000)
              clearInterval(this.timer)
            }
          } else if (barSeries) {
            const barsInfo = barSeries.barsInLogicalRange(logicalRange)
            if (barsInfo !== null && barsInfo.barsBefore < 10) {
              await this.updateData(this.chartData[0].time * 1000)
              clearInterval(this.timer)
            }
          } else if (lineSeries) {
            const barsInfo = lineSeries.barsInLogicalRange(logicalRange)
            if (barsInfo !== null && barsInfo.barsBefore < 10) {
              await this.updateData(this.chartData[0].time * 1000)
              clearInterval(this.timer)
            }
          }
        }
      }, 50)
    },
    takeScreenshot () {
      chart.takeScreenshot().toBlob((blob) => {
        navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })])
      })
    },
    enterFullscreen () {
      const chartEl = document.getElementById('twChart')
      if (!document.fullscreenElement) {
        // If the document is not in full screen mode
        // make the video full screen
        chartEl.requestFullscreen()
        chart.applyOptions({ width: 1800, height: 900 })
      } else {
        // Otherwise exit the full screen
        if (document.exitFullscreen) {
          document.exitFullscreen()
          chart.applyOptions({ width: 600, height: 400 })
        }
        console.log('wer')
      }
    }
  }
}
</script>
<style>
.twchart {
float: right;
}
</style>
