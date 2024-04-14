<script setup lang="ts">
import { onMounted, ref } from "vue";
import TimeDaySelector from "./TimeDaySelector.vue";
import TimeSlider from "./TimeSlider.vue";
import {selectionItems} from "@/components/time/TimeSelection";

const props = defineProps<{}>();

const selected = ref<SelectionItem>(selectionItems[0]);

onMounted(() => {});
</script>

<template>
  <div class="floating-parent">
    <div class="floating-child">
      <div class="main">
        <TimeDaySelector v-model:selection="selected"></TimeDaySelector>
        <TimeSlider v-if="selected" :start="selected.start" :end="selected.end"></TimeSlider>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating-parent {
  position: absolute;
  z-index: 1000; // leaflet is <1000
  left: 0;
  right: 0;
  bottom: 1em;

  > .floating-child {
    display: flex;
    justify-content: center;

    > .main {
      display: flex;
      gap: 0.5em;
      padding: 0.5em 1em;
      background-color: #fcc77f;
      border-radius: 1em;
    }
  }
}
</style>
