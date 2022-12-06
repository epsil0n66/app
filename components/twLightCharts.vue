<template>
  <div>
    <v-menu
      max-height="300px"
    >
      <template #activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
          {{ activeButton }}
        </v-btn>
      </template>
      <v-list
        v-for="item in intervalMenu"
        :key="item.id"
        link
      >
        <v-list-item
          @click="applyInterval(item)"
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
          v-bind="attrs"
          v-on="on"
        >
          {{ activeSeriesButton }}
        </v-btn>
      </template>
      <v-list
        v-for="item in seriesMenu"
        :key="item.id"
        link
      >
        <v-list-item
          @click="applySeries(item)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div
      :id="chartID"
      class="twchart"
    />
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'
let chart
let instance
let candlestickSeries
let barSeries
let lineSeries

export default {
  name: 'ArobotsFrontendTwLightCharts',
  data () {
    return {
      chartID: 'twChart',
      intervalMenu: [],
      activeButton: '1 m',
      activeSeriesButton: 'Candlestick',
      seriesMenu: [
        { name: 'Candlestick' },
        { name: 'Bar' },
        { name: 'Line' }
      ]
    }
  },
  mounted () {
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
    instance = this.$axios.create()
    delete instance.defaults.headers.Authorization
    candlestickSeries = chart.addCandlestickSeries()
    barSeries = chart.addBarSeries()
    lineSeries = chart.addLineSeries()
    instance('http://arobots.evospb.ru/api/timeframes')
      .then((res) => {
        this.intervalMenu = res.data
      })
    this.applyInterval({ time: '1', name: 'm' })
    chart.timeScale().fitContent()
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1m')
    socket.onmessage = function (event) {
      const a = JSON.parse(event.data).k
      candlestickSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
      barSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
      lineSeries.update({ time: a.t / 1000, value: parseFloat(a.c) })
    }
    const maxPriceLine = {
      price: 1280,
      color: 'red',
      lineWidth: 2,
      lineStyle: 2, // LineStyle.Dashed
      axisLabelVisible: true,
      title: 'Price'
    }
    candlestickSeries.createPriceLine(maxPriceLine)
    barSeries.createPriceLine(maxPriceLine)
    lineSeries.createPriceLine(maxPriceLine)
    const markers = [
      {
        time: Date.now() / 1000,
        position: 'aboveBar',
        color: 'green',
        shape: 'circle',
        text: 'Marker'
      }
    ]
    candlestickSeries.setMarkers(markers)
    barSeries.setMarkers(markers)
    lineSeries.setMarkers(markers)
  },
  methods: {
    applyInterval (interval) {
      console.log(`${interval.time}${interval.name}`)
      instance(`https://www.binance.com/api/v3/uiKlines?symbol=ETHBUSD&interval=${interval.time}${interval.name}&limit=1000`)
        .then((res) => {
          const chartData = res.data.map((a) => {
            return { time: a[0] / 1000, open: parseFloat(a[1]), high: parseFloat(a[2]), low: parseFloat(a[3]), close: parseFloat(a[4]) }
          })
          const lineData = res.data.map((a) => {
            return { time: a[0] / 1000, value: parseFloat(a[4]) }
          })
          candlestickSeries.setData(chartData)
          barSeries.setData(chartData)
          lineSeries.setData(lineData)
        })
      this.activeButton = interval.time + interval.name
    },
    applySeries (series) {
      console.log(series)
      this.activeSeriesButton = series.name
    }
  }
}
</script>
<style>
.twchart {
float: right;
}
</style>
