<template>
  <div class="params-container">
    <div class="param-item" v-for="item in sources">
      <div class="param-label">{{ item.label }}</div>
      <div class="param-value">
        <span class="value-number">{{ item.value }}</span>
        <span class="value-unit">{{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { params } from '@/hooks'
import { computed } from 'vue'

const sources = computed(() => [
  { label: '高度', value: params.altitude.toFixed(2), unit: '米' },
  { label: '经度', value: params.lat.toFixed(2), unit: '' },
  { label: '纬度', value: params.lng.toFixed(2), unit: '' },
  {
    label: '俯仰角',
    value: (params.pitch * (180 / Math.PI)).toFixed(2),
    unit: '度',
  },
  {
    label: '偏航角',
    value: (params.heading * (180 / Math.PI)).toFixed(2),
    unit: '度',
  },
  {
    label: '滚转角',
    value: (params.roll * (180 / Math.PI)).toFixed(2),
    unit: '弧度',
  },
  { label: '速度', value: params.speed.toFixed(2), unit: 'km/h' },
  { label: '温度', value: '25', unit: '°C' },
  { label: '电池电量', value: '75%', unit: '' },
])
</script>
<style lang="scss" scoped>
.params-container {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid var(--color-border);
  .param-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 20px;
    text-align: center;
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    &:nth-child(3n) {
      border-right: none;
    }
    &:nth-child(n + 7) {
      border-bottom: none;
    }
    .param-label {
      font-size: 12px;
      color: var(--color-neutral-6);
    }
    .param-value {
      margin-top: 4px;
      font-size: 16px;
      .value-number {
        font-family: Dincoros;
      }
      .value-unit {
        margin-left: 6px;
        font-size: 12px;
        color: var(--color-neutral-6);
      }
    }
  }
}
</style>
