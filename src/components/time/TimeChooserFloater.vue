<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import TimeDaySelector from "./TimeDaySelector.vue";
import TimeSlider from "./TimeSlider.vue";
import { type TimeSelection, selectionItems } from "@/components/time/TimeSelection";
import type {Dayjs} from "dayjs";

const props = defineProps<{}>();

const selectedDay = ref<TimeSelection>(selectionItems[0]);
const selectedTime = ref(selectedDay.value.start)

const emits = defineEmits<{
  (name: "selectedDay", value: TimeSelection): void;
  (name: "selectedTime", value: Dayjs): void;
}>();

watch(selectedDay, (v) => emits("selectedDay", v), {
  immediate: true,
});

watch(selectedTime, (v) => emits("selectedTime", v), {
  immediate: true,
});

onMounted(() => {});
</script>

<template>
  <div class="floating-parent">
    <div class="floating-child">
      <div class="main">
        <TimeDaySelector v-model:selection="selectedDay"></TimeDaySelector>
        <TimeSlider
          v-if="selectedDay"
          :start="selectedDay.start"
          :end="selectedDay.end"
          v-model:selected="selectedTime"
        ></TimeSlider>
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
