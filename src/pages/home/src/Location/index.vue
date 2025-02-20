<template>
  <BasePanel>
    <div class="mask-container"></div>
    <div class="container">
      <div class="map-container" ref="container"></div>
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { BasePanel } from '@/components'
import { useLeaflet, params } from '@/hooks'
import { watch } from 'vue'

const { container, setMarkerPosition } = useLeaflet()
watch(
  () => [params.lat, params.lng],
  () => {
    setMarkerPosition([params.lat, params.lng])
  }
)
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 0;
  background-color: var(--color-menu-light-bg);
  .map-container {
    width: 100%;
    height: 100%;
    background-color: var(--color-menu-light-bg);
  }
}
</style>
