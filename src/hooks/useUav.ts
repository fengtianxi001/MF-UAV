import { onMounted, reactive, ref, shallowRef } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

export const params = reactive({
  lat: 29.83,
  lng: 119.86,
  altitude: 2000,
  heading: 4.7,
  pitch: 0,
  roll: 0,
  correction: 1,
  speed: 700,
})

export function useUav() {
  const container = ref<HTMLElement>()
  const viewer = shallowRef<Cesium.Viewer>()
  const uav = shallowRef<Cesium.Entity>()

  const DIRECTION = {
    UP: 'w',
    DOWN: 's',
    LEFT: 'a',
    RIGHT: 'd',
    SPEED_UP: 'q',
    SPEED_DOWN: 'e',
  }

  const keyboardMap = {
    [DIRECTION.UP]: false,
    [DIRECTION.DOWN]: false,
    [DIRECTION.LEFT]: false,
    [DIRECTION.RIGHT]: false,
    [DIRECTION.SPEED_UP]: false,
    [DIRECTION.SPEED_DOWN]: false,
  }
  //初始化cesium
  const boostrapViewer = async () => {
    const terrainProvider = await Cesium.createWorldTerrainAsync()
    viewer.value = new Cesium.Viewer(container.value!, {
      infoBox: false,
      selectionIndicator: false,
      animation: false,
      baseLayerPicker: false,
      geocoder: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      homeButton: false,
      sceneModePicker: false,
      timeline: false,
      shadows: true,
      shouldAnimate: true,
      terrainProvider: terrainProvider,
    })
    viewer.value.scene.globe.depthTestAgainstTerrain = true
    // @ts-ignore 清除版权信息
    viewer.value.cesiumWidget.creditContainer.style.display = 'none'
  }

  const boostrapUav = (url: string) => {
    onLoadModel(url)
    onAddKeyboardListener()
    const renderer = () => {
      onAdjustParams()
      onAdjustAttitude()
      requestAnimationFrame(renderer)
    }
    renderer()
  }

  //加载无人机模型
  const onLoadModel = (url: string) => {
    const position = Cesium.Cartesian3.fromDegrees(120, 30, 2000)
    const entity = viewer.value!.entities.add({
      name: 'uav',
      position,
      model: {
        uri: url,
        runAnimations: true,
        // minimumPixelSize: 128,
        // maximumScale: 20000,
        // scale: 0.05,
      },
    })
    viewer.value!.trackedEntity = entity
    uav.value = entity
  }
  //开启按键监听
  const onAddKeyboardListener = () => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (Object.keys(keyboardMap).includes(e.key)) {
        keyboardMap[e.key] = true
      }
    })
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (Object.keys(keyboardMap).includes(e.key)) {
        keyboardMap[e.key] = false
      }
    })
  }
  //开启飞行参数调整
  const onAdjustParams = () => {
    if (keyboardMap[DIRECTION.SPEED_UP]) {
      params.speed += 100
    }
    if (keyboardMap[DIRECTION.SPEED_DOWN]) {
      if (params.speed >= 500) {
        params.speed -= 100
      }
    }
    //机体爬升
    if (keyboardMap[DIRECTION.UP] && params.pitch <= 0.3) {
      params.pitch += 0.005
      if (params.pitch > 0) {
        const { speed, pitch } = params
        const temp = (params.speed / 60 / 60 / 60) * 110
        //1经纬度约等于110km
        params.altitude += temp * Math.sin(pitch)
      }
    }
    //机体俯冲
    if (keyboardMap[DIRECTION.DOWN] && params.pitch >= -0.3) {
      params.pitch -= 0.006
      if (params.pitch < 0) {
        const { speed, pitch } = params
        //1经纬度约等于110km
        const temp = (params.speed / 60 / 60 / 60) * 110
        params.altitude += temp * Math.sin(pitch)
      }
    }
    //机体左转
    if (keyboardMap[DIRECTION.LEFT]) {
      params.heading -= 0.005
      if (params.roll > -0.785) {
        params.roll -= 0.005
      }
    }
    //机体右转
    if (keyboardMap[DIRECTION.RIGHT]) {
      params.heading += 0.005
      if (params.roll < 0.785) {
        params.roll += 0.005
      }
    }
    const { heading, pitch, roll } = params
    const { abs, cos } = Math
    params.correction = abs(cos(heading) * cos(pitch))
    if (abs(heading) < 0.001) params.heading = 0
    if (abs(roll) < 0.001) params.roll = 0
    if (abs(pitch) < 0.001) params.pitch = 0
    //方向自动回正
    // if (params.heading > 0) params.heading -= 0.0025
    // if (params.heading < 0) params.heading += 0.0025
    if (params.roll > 0) params.roll -= 0.003
    if (params.roll < 0) params.roll += 0.003
    if (params.pitch < 0) params.pitch += 0.005
    if (params.pitch > 0) params.pitch -= 0.003
  }
  //开启飞行姿态调整
  const onAdjustAttitude = () => {
    const temp = params.speed / 60 / 60 / 60 / 110
    params.lng += temp * Math.cos(params.heading)
    params.lat -= temp * Math.sin(params.heading)
    const { lng, lat, altitude, heading, pitch, roll } = params
    params.altitude += temp * Math.sin(pitch) * 110 * 1000 * 10
    const position = Cesium.Cartesian3.fromDegrees(lng, lat, altitude)
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    )
    uav.value.orientation = orientation
    uav.value.position = position

    // 设置相机视角

    // const offset = [-10, 0, 10]
    // // viewer.value.camera.lerp(0.5) // 0.5秒的插值过渡
    // viewer.value.trackedEntity = undefined
    // viewer.value.scene.preRender.addEventListener(() => {
    //   if (uav.value) {
    //     const modelMatrix = uav.value.computeModelMatrix(
    //       viewer.value.clock.currentTime
    //     )
    //     viewer.value.camera.lookAtTransform(
    //       modelMatrix,
    //       new Cesium.Cartesian3(...offset)
    //     )
    //   }
    // })
  }

  onMounted(async () => {
    await boostrapViewer()
    boostrapUav(`${import.meta.env.VITE_API_DOMAIN}/models/uav.glb`)
  })

  return {
    container,
    viewer,

    // boostrap,
    // cesiumBoostrap,
  }
}
