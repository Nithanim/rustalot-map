<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import * as L from "leaflet";
import layerAreaLabels from "./layerAreaLabels";
import {layerGroupPlayerPositions, setToTime} from "@/components/worldmap/layerPlayerPositions";
import { type TimeSelection } from "@/components/time/TimeSelection";

const props = defineProps<{
  timeSelection: TimeSelection
}>();

const targetElement = ref<HTMLDivElement>(null);

let map: L.Map;


onMounted(() => {
  map = L.map(targetElement.value, {
    crs: L.CRS.Simple,
    minZoom: -2,
    zoom: 0,
    maxZoom: 3,
    zoomSnap: 0.1,
    zoomDelta: 0.1,
    attributionControl: true,
  });

  L.imageOverlay(
    "/rustalotmap-2024.jpg",
    [
      [-1500, -1500],
      [1500, 1500],
    ],
    {
      attribution: "© Map by Rustalot Organizers",
    },
  ).addTo(map);


  {
    const mapCenter = [-98.2825399591045, 28.428833872468243];
    const w = 400, h = 400;
    map.fitBounds([
      [mapCenter[0] - w / 2, mapCenter[1] - h / 2],
      [mapCenter[0] + w / 2, mapCenter[1] + h / 2],
    ]);
  }

  L.control.layers({}, { Gebietsnamen: layerAreaLabels }).addTo(map);
  layerAreaLabels.addTo(map);

  map.on("click", function (e) {
    var coords = e.latlng;
    console.log([coords.lat, coords.lng]);
  });

  // var markers = new L.MarkerClusterGroup({maxClusterRadius: 50,spiderfyDistanceMultiplier:2.5});
  // map.addLayer(markers);

  map.addLayer(layerGroupPlayerPositions);
});


watch(() => props.timeSelection, v => {
  setToTime(v)
})

onUnmounted(() => map.remove());
</script>

<template>
  <div ref="targetElement" class="map"></div>
</template>

<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
  // border: #181818 2px solid;
  background-color: #294b64;
}
</style>
