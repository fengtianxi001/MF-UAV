<template>
  <div class="container">
    <BasePanel :width="20" :height="18">
      <div style="width: 100%; height: 100%" ref="container"></div>
    </BasePanel>
    <UavProfile :width="4" :height="9" />
    <PlayerProfile :width="4" :height="9" />
    <Location :width="4" :height="6" />
    <Params :width="12" :height="6" />
    <Gradienter :width="4" :height="6" />
    <Compass :width="4" :height="6" />
  </div>
</template>
<script setup lang="ts">
import { BasePanel } from '@/components'
import {
  UavProfile,
  PlayerProfile,
  Compass,
  Params,
  Gradienter,
  Location,
} from './src'
import { onMounted, nextTick } from 'vue'
import { useUav } from '@/hooks/useUav'

const { container, loadModel, cesiumBoostrap } = useUav()

onMounted(() => {
  // alert(1)
})
</script>
<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  grid-template-columns: repeat(24, 1fr);
  grid-auto-flow: row dense;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
}
</style>
