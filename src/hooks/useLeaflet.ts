import * as L from 'leaflet'
import { ref, onMounted, shallowRef } from 'vue'
import { BaseUavMarker } from '@/components'
import { componentRender } from '@/utils'
export function useLeaflet() {
  const container = ref<HTMLElement>()
  const map = shallowRef<L.Map>()
  const tile = shallowRef<L.TileLayer>()
  const marker = shallowRef<L.Marker>()
  const boostrap = () => {
    map.value = L.map(container.value!, {
      attributionControl: false,
      zoomControl: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
    }).setView([0, 0], 13)
    tile.value = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
    map.value.addLayer(tile.value)
  }

  const addMarker = (coordinate: any) => {
    const html = componentRender(BaseUavMarker, {})
    const icon = L.divIcon({
      html,
      iconSize: [6, 6],
      iconAnchor: [3, 3],
    })
    marker.value = L.marker(coordinate, { icon })
    marker.value.addTo(map.value!)
  }

  const setMarkerPosition = (latlng: any) => {
    marker.value!.setLatLng(latlng)
    map.value?.panTo(latlng)
    // map.value!.flyTo(latlng)
  }
  onMounted(() => {
    boostrap()
    addMarker([0, 0])
    console.log(marker.value)
  })
  return {
    container,
    marker,
    setMarkerPosition,
    // addMarker,
  }
}

export default useLeaflet
