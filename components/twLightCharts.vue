<template>
  <div>
    <div
      :id="chartID"
      class="twchart"
    />
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'
export default {
  name: 'ArobotsFrontendTwLightCharts',
  data () {
    return {
      chartID: 'twChart'
    }
  },
  mounted () {
    const chart = createChart(this.chartID,
      {
        width: 600,
        height: 400,
        timeScale: {
          timeVisible: true,
          secondsVisible: false
        }
      })
    const instance = this.$axios.create()
    delete instance.defaults.headers.Authorization
    const candlestickSeries = chart.addCandlestickSeries()
    instance('https://www.binance.com/api/v3/uiKlines?symbol=ETHBUSD&interval=1m&limit=1000')
      .then((res) => {
        candlestickSeries.setData(res.data.map((a) => {
          return { time: a[0] / 1000, open: parseFloat(a[1]), high: parseFloat(a[2]), low: parseFloat(a[3]), close: parseFloat(a[4]) }
        }))
      })
    chart.timeScale().fitContent()
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1m')
    socket.onmessage = function (event) {
      const a = JSON.parse(event.data).k
      candlestickSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
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
  },
  methods: {
  }
}
</script>
<style>
.twchart {
float: right;
}
</style>
