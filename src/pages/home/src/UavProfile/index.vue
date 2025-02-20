<template>
  <BasePanel>
    <div class="container">
      <div class="detail">
        <div class="detail-info">
          <div class="detail-name">DJI Mavic pro</div>
          <div class="detail-desc">FHD high-Framerate Live Feed</div>
        </div>
        <div class="detail-avatar" />
      </div>
      <div class="content" ref="container"></div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { BasePanel } from '@/components'
import { useEcharts } from '@/hooks'
import { onMounted } from 'vue'

const { container, setOption } = useEcharts()

const generateOption = () => {
  return {
    radar: {
      indicator: [
        { name: '环境适应性', max: 6500 },
        { name: '飞行性能', max: 16000 },
        { name: '软件指标', max: 30000 },
        { name: '导航定位能力', max: 38000 },
        { name: '数据链路', max: 52000 },
        { name: '续航时间', max: 25000 },
      ],
      radius: '65%',
      name: {
        textStyle: {
          color: '#4e5969',
          fontSize: 10,
        },
      },
      splitNumber: 4,
      splitArea: {
        areaStyle: {
          color: [],
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '',
            areaStyle: {
              color: 'rgba(22, 93, 255, 0.15)',
            },
            itemStyle: {
              color: 'rgb(22, 93, 255)',
            },
            lineStyle: {
              width: 1, // 线条宽度
              type: '', // 线条样式
            },
            symbol: 'none',
          },
        ],
      },
    ],
  }
}
onMounted(() => {
  const option = generateOption()
  setOption(option)
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .detail {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--color-border);
    .detail-info {
      margin-right: 10px;
      .detail-name {
        font-family: Dincoros;
        font-size: 20px;
        font-weight: bold;
      }
      .detail-desc {
        margin-top: 6px;
        font-size: 10px;
        color: var(--color-text-2);
      }
    }
    .detail-avatar {
      position: absolute;
      right: 10px;
      width: 70px;
      height: 70px;
      background-image: url(@/assets/images/uav2.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      object-fit: cover;
    }
  }
  .content {
    flex: 1;
    width: 100%;
  }
}
</style>
