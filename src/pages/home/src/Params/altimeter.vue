<template>
  <div class="altimeter" ref="container"></div>
</template>
<script setup lang="ts">
import { useEcharts, params } from '@/hooks'
import { onMounted, watch } from 'vue'
import dayjs from 'dayjs'
const { container, setOption } = useEcharts()

let source: any[] = []

const generateOption = (arr: any[]) => {
  return {
    grid: {
      left: '60',
      right: '20',
      top: '15',
      bottom: '25',
    },
    xAxis: {
      type: 'category',
      data: arr.map((item) => item.label),
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#555',
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgb(229, 230, 235)',
          width: 1,
        },
      },
    },
    yAxis: {
      name: '飞机高度(米)',
      nameLocation: 'middle',
      nameGap: 36,
      type: 'value',
      axisLabel: {
        show: true,
        fontSize: 10,
        color: '#555',
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#f2f3f5',
          width: 1,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        data: arr.map((item) => item.value),
        type: 'line',
        // smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 1,
        },
        areaStyle: {
          color: 'rgba(22, 93, 255, 0.15)',
        },
        itemStyle: {
          color: 'rgb(22, 93, 255)',
        },
        markLine: {
          symbol: ['none', 'none'],
          label: {
            show: true,
            position: 'middle',
            formatter: '高度警戒线',
            fontSize: 10,
            color: '#e24f48aa',
          },
          lineStyle: {
            type: 'dashed',
            color: '#e24f48aa',
          },
          data: [
            {
              yAxis: 300,
            },
          ],
        },
      },
    ],
  }
}

const max = 1000 * 2
onMounted(() => {
  setInterval(() => {
    if (source.length > max) {
      source.splice(0, source.length - max)
    }
    source.push({
      label: dayjs().format('HH:mm:ss'),
      value: params.altitude,
    })
    const option = generateOption(source)
    setOption(option)
  }, 1000)
})
</script>
<style lang="scss" scoped>
.altimeter {
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  border: 1px solid var(--color-border);
}
</style>
