<template>
  <BasePanel>
    <div class="container">
      <Params />
      <Altimeter />
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import Params from './params.vue'
import Altimeter from './altimeter.vue'
import { BasePanel } from '@/components'
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
}
</style>
