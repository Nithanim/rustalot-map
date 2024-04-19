<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import WorldMap from "@/components/worldmap/WorldMap.vue";
import TimeSlider from "@/components/time/TimeChooserFloater.vue";
</script>

<template>
  <WorldMap class="world-map"></WorldMap>
  <TimeSlider></TimeSlider>
</template>

<style lang="scss" scoped>

.world-map {
  display: block;
  width: 100%;
  height: 100%;
}

</style>
