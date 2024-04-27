<script setup lang="ts">
import WorldMap from "@/components/worldmap/WorldMap.vue";
import TimeChooserFloater from "@/components/time/TimeChooserFloater.vue";

import {ref} from "vue";
import dayjs from "dayjs";

const timeSelection = ref(dayjs());

</script>

<template>
  <WorldMap :timeSelection="timeSelection" class="world-map"></WorldMap>
  <TimeChooserFloater @selectedTime="v => timeSelection = v"></TimeChooserFloater>
</template>

<style lang="scss" scoped>

.world-map {
  display: block;
  width: 100%;
  height: 100%;
}

</style>
