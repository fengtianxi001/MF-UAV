<template>
  <Menu
    mode="horizontal"
    class="layout-menu"
    v-model:selectedKeys="selectedKeys"
  >
    <MenuItem
      v-for="{ path, meta } in routes"
      :key="path"
      @click="onHandle(path)"
    >
      {{ meta.title }}
    </MenuItem>
  </Menu>
</template>
<script setup lang="ts">
import { routes, router } from '@/router'
import { computed } from 'vue'
import { Menu, MenuItem } from '@arco-design/web-vue'

const selectedKeys = computed(() =>
  router.currentRoute.value.matched.map((item) => item.path)
)
const onHandle = (path: string) => {
  router.push(path)
}
</script>
<style lang="scss" scoped>
.layout-menu {
  width: 800px;
}
</style>
