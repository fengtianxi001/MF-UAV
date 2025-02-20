<template>
  <div class="base-uav-marker">
    <!-- <div class="marker-icon"></div> -->
    <div class="marker-dot"></div>
  </div>
</template>
<script setup lang="ts">
// interface PropsType {}
// const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
@keyframes breathe {
  0% {
    transform: scale(0.3);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.3);
  }
}
.base-uav-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 6px;
  height: 6px;
  .marker-dot {
    // position: relative;
    // bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6px;
    height: 6px;

    // margin: 5px;
    background: #2655ff;
    border-radius: 50%;
    &::after {
      position: absolute;
      width: 20px;
      height: 20px;
      content: '';
      background: rgba(38, 85, 255, 16%);
      border-radius: 50%;
      animation: breathe 2s ease-in-out infinite;
      will-change: transform;
    }
  }
}
</style>
