<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as L from "leaflet";
import areaData from "@/components/areaData";

const props = defineProps<{}>();

const targetElement = ref<HTMLDivElement>(null);

onMounted(() => {
  const map = L.map(targetElement.value, {
    crs: L.CRS.Simple,
    minZoom: -2,
    zoom: 0,
    maxZoom: 3,
    zoomSnap: 0.1,
    zoomDelta: 0.1,
    attributionControl: true,
  });

  var bounds = [
    [-1500, -1500],
    [1500, 1500],
  ];
  L.imageOverlay("/rustalotmap-2024.jpg", bounds, {
    attribution: "© Map by Rustalot Organizers",
  }).addTo(map);
  map.fitBounds(bounds);

  const areas = L.layerGroup(
    areaData.map((b) => {
      var poly = L.polygon(b.coords, {
        color: b.color || "#fcc77f",
        weight: 2,
        fill: false,
      });
      poly
        .bindTooltip(b.name, { permanent: true, direction: "center" })
        .openTooltip();
      return poly;
    }),
  );

  L.control.layers({}, { 'Gebietsnamen': areas }).addTo(map);
  areas.addTo(map)

  map.on("click", function (e) {
    var coords = e.latlng;
    console.log([coords.lat, coords.lng]);
  });

  // var markers = new L.MarkerClusterGroup({maxClusterRadius: 50,spiderfyDistanceMultiplier:2.5});
  // map.addLayer(markers);
});
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
