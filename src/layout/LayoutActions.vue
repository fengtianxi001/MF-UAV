<template>
  <div class="layout-actions">
    <div class="action-item" @click="methods.onTheme">
      <i v-show="!isDark" class="mf-icon mf-icon-moon"></i>
      <i v-show="isDark" class="mf-icon mf-icon-sun"></i>
    </div>
    <div class="action-item" @click="methods.onGithub">
      <i class="mf-icon mf-icon-github"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)

const methods = {
  onTheme(event: MouseEvent) {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )
    isDark.value = !isDark.value

    const transition = document.startViewTransition(() => {
      const root = document.documentElement
      root.classList.remove(isDark.value ? 'dark' : 'light')
      root.classList.add(isDark.value ? 'light' : 'dark')
      document.body.setAttribute('arco-theme', isDark.value ? 'dark' : 'light')
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value ? [...clipPath].reverse() : [...clipPath],
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      )
    })
  },
  onGithub() {
    window.open('https://github.com/fengtianxi001', '_blank')
  },
}
</script>
<style lang="scss" scoped>
.layout-actions {
  display: flex;
  flex-shrink: 0;
  gap: 10px;
  align-items: center;
  height: 100%;
  color: var(--color-neutral-8);
  .action-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--color-border);
    border-radius: 50%;
  }
}
</style>
<style>
/* stylelint-disable selector-pseudo-element-no-unknown */
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 999;
}
::view-transition-old(root) {
  z-index: 999;
  mix-blend-mode: normal;
  animation: none;
}
::view-transition-new(root) {
  z-index: 1;
  mix-blend-mode: normal;
  animation: none;
}
</style>
