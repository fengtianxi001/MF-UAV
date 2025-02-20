import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import autofit from 'autofit.js'
import '@arco-design/web-vue/dist/arco.less'
import 'animate.css'
import '@/assets/styles/reset.scss'
import 'leaflet/dist/leaflet.css'

const boostrap = async () => {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')

  const ScreenSize = {
    big: [2560, 1440],
    normal: [1500, 1000],
    small: [1280, 720],
  }['normal']

  autofit.init({
    el: '#app',
    dw: ScreenSize[0],
    dh: ScreenSize[1],
    resize: true,
    ignore: ['.map-container', '.base-uav-marker'],
  })
}

boostrap()
