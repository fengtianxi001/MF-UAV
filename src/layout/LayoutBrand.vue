<template>
  <div class="layout-brand">
    <div class="layout-brand-logo"></div>
    <div class="layout-brand-title">Uav-Monitor</div>
  </div>
</template>
<style lang="scss" scoped>
.layout-brand {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 100%;
  .layout-brand-logo {
    width: 30px;
    height: 30px;
    margin-right: 4px;
    background-image: url('@/assets/images/logo.png');
    background-size: cover;
  }
  .layout-brand-title {
    font-family: Dincoros;
    font-size: 24px;
    color: var(--color-neutral-8);
  }
}
</style>
