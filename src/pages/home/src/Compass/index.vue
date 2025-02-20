<template>
  <BasePanel>
    <div class="container">
      <div class="compass-pointer"></div>
      <div class="compass-main">
        <div class="compass-outer-ring"></div>
        <div class="compass-inner-ring"></div>
        <div class="compass-tick-panel" :style="valueStyle">
          <div
            class="compass-tick-line"
            v-for="index in 60"
            :key="index"
            :style="generateTickStyle(index)"
          ></div>
          <div
            class="compass-tick-number"
            v-for="(item, index) in tickNumbers"
            :key="item"
            :style="generateNumberStyle(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { BasePanel } from '@/components'
import { params } from '@/hooks'
import { computed } from 'vue'

const tickNumbers = [
  '北',
  '30',
  '60',
  '东',
  '120',
  '150',
  '南',
  '210',
  '240',
  '西',
  '300',
  '330',
]

const generateTickStyle = (i: number) => {
  if (i % 5 === 0) {
    return {
      height: '15px',
      transform: `rotate(${i * 6}deg) translateY(-75px)`,
      background: 'var(--color-neutral-4)',
    }
  } else {
    return {
      transform: `rotate(${i * 6}deg) translateY(-80px)`,
    }
  }
}

const generateNumberStyle = (i: number) => {
  if ([0 /*3, 6, 9*/].includes(i)) {
    return {
      color: 'rgb(var(--primary-6))',
      transform: `rotate(${i * 30}deg) translateY(-52px)`,
    }
  } else {
    return {
      transform: `rotate(${i * 30}deg) translateY(-52px)`,
    }
  }
}

const valueStyle = computed(() => {
  const ange = (params.heading * (180 / Math.PI)).toFixed(0)
  return {
    transform: `rotate(${ange}deg)`,
  }
})
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .compass-pointer {
    position: absolute;
    top: 5px;
    z-index: 1;
    width: 0;
    height: 0;
    border-color: rgb(var(--primary-6)) transparent transparent;
    border-style: solid;
    border-width: 10px 10px 0;
  }
  .compass-main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    aspect-ratio: 1/1;
    margin-top: 10px;
    overflow: hidden;
    background-color: var(--color-neutral-2);
    border-radius: 50%;
    .compass-outer-ring {
      width: 130px;
      aspect-ratio: 1/1;
      background-color: var(--color-neutral-5);
      border-radius: 50%;
    }
    .compass-inner-ring {
      position: absolute;
      width: 80px;
      aspect-ratio: 1/1;

      // background-color: var(--color-menu-light-bg);
      background-color: var(--color-neutral-2);
      background-image: url(@/assets/images/world.svg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 80%;
      border-radius: 50%;
    }
    .compass-tick-panel {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 170px;
      aspect-ratio: 1/1;
      .compass-tick-line {
        position: absolute;
        width: 1px;
        height: 4px;
        background: var(--color-neutral-4);
      }
      .compass-tick-number {
        position: absolute;
        font-size: 11px;
        color: var(--color-neutral-2);
      }
    }
  }
}
</style>
