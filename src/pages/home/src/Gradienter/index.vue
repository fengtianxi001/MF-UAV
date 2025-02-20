<template>
  <BasePanel>
    <div class="container">
      <div class="gradienter-main">
        <div class="gradienter-outer-ring"></div>
        <div class="gradienter-inner-ring"></div>
        <div class="gradienter-tick-panel">
          <div
            class="gradienter-tick-line"
            v-for="index in 60"
            :key="index"
            :style="generateTickStyle(index)"
          ></div>
          <div
            class="gradienter-tick-number"
            v-for="index in 12"
            :key="index"
            :style="generateNumberStyle(index)"
          >
            {{ (Math.abs(6 - index) - 3) * 30 }}
          </div>
        </div>
        <div class="gradienter-line-panel">
          <div class="line-item" v-for="item in 3">
            <span class="line-item-tip">{{ (item - 2) * 15 * -1 }}</span>
            <span class="line-item-line"></span>
            <span class="line-item-tip">{{ (item - 2) * 15 * -1 }}</span>
          </div>
        </div>
        <div class="gradienter-value" :style="valueStyle"></div>
      </div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { BasePanel } from '@/components'
import { params } from '@/hooks/useUav'
import { computed } from 'vue'

const generateTickStyle = (i: number) => {
  let obj: any = {}
  if (i % 5 === 0) {
    obj = {
      height: '15px',
      transform: `rotate(${i * 6}deg) translateY(-75px)`,
    }
  } else {
    obj = {
      height: '5px',
      transform: `rotate(${i * 6}deg) translateY(-80px)`,
    }
  }
  if (15 < i && i < 45) {
    obj.display = 'none'
  }
  return obj
}

const generateNumberStyle = (i: number) => {
  let obj: any = {
    transform: `rotate(${i * 30}deg) translateY(-56px)`,
  }
  if (3 < i && i < 9) {
    obj.display = 'none'
  }
  return obj
}

const valueStyle = computed(() => {
  const xangle = (params.roll * (180 / Math.PI)).toFixed(0)
  const yangle = (-1 * (params.pitch * (180 / Math.PI))).toFixed(0)

  return {
    transform: `rotate(${xangle}deg) translateY(${yangle}px)`,
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
  overflow: hidden;
  .gradienter-main {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    aspect-ratio: 1/1;
    overflow: hidden;
    background-color: var(--color-neutral-2);
    border-radius: 50%;
    .gradienter-outer-ring {
      width: 130px;
      aspect-ratio: 1/1;
      background-color: var(--color-neutral-5);
      border-radius: 50%;
    }
    .gradienter-inner-ring {
      position: absolute;
      width: 100px;
      aspect-ratio: 1/1;
      background-color: var(--color-neutral-2);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 80%;
      border-radius: 50%;
    }
    .gradienter-tick-panel {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 170px;
      aspect-ratio: 1/1;
      .gradienter-tick-line {
        position: absolute;
        width: 1px;
        background: var(--color-neutral-4);
      }
      .gradienter-tick-number {
        position: absolute;
        font-size: 11px;
        color: var(--color-neutral-2);
      }
    }
    .gradienter-line-panel {
      position: absolute;
      display: flex;
      flex-direction: column;
      grid-gap: 15px;
      align-items: center;
      justify-content: center;
      .line-item {
        display: flex;
        align-items: center;
        .line-item-tip {
          font-size: 10px;
        }
        .line-item-line {
          display: inline-block;
          width: 30px;
          height: 1px;
          margin: 0 4px;
          background-color: var(--color-neutral-5);
        }
      }
    }
    .gradienter-value {
      position: absolute;
      top: 50%;
      width: 100%;
      height: 100%;
      background-color: rgba(22, 93, 255, 15%);
      border-top: 1px solid rgba(22, 93, 255, 100%);
      transform-origin: top center;
      &::after {
        position: absolute;
        top: -5px;
        left: 50%;
        width: 1px;
        height: 10px;
        content: '';
        background-color: rgba(22, 93, 255, 100%);
      }
    }
  }
}
</style>
