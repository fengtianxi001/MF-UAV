<template>
  <div class="base-panel" :style="style">
    <div class="base-panel-title" v-if="title">{{ title }}</div>
    <div class="base-panel-body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface PropsType {
  title?: string
  width?: number
  height?: number
}
const props = defineProps<PropsType>()

const style = computed(() => {
  return {
    gridArea: `span ${props.height} / span ${props.width}`,
  }
})
</script>
<style lang="scss" scoped>
.base-panel {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: var(--color-menu-light-bg);
  border: 1px solid var(--color-border);
  .base-panel-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 8px;
    font-size: 14px;

    // font-weight: bold;
    &::before {
      position: absolute;
      left: 10px;
      display: inline-block;
      width: 3px;
      height: 14px;
      content: '';
      background-color: rgb(var(--primary-6));
    }
  }
  .base-panel-body {
    flex: 1;
    overflow: hidden;

    // height: calc(100% - 28px);

    // background-color: var(--color-neutral-2);
  }
}
</style>
