<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Dayjs } from "dayjs";

const props = defineProps<{
  start: Dayjs;
  end: Dayjs;
  selected: Dayjs;
}>();

const emits = defineEmits<{
  (name: "update:selected", value: Dayjs): void;
}>();

const sliderInput = ref(0);

const diffMinutes = computed(() => props.end.diff(props.start) / 1000 / 60);

const interpolated = computed(() => {
  return props.start.add(sliderInput.value, "minutes");
});

watch(
  () => props.selected,
  (v) => {
    if (v.isBefore(props.start) || v.isAfter(props.end)) {
      sliderInput.value = props.start;
    } else {
      sliderInput.value = v.diff(props.start) / 1000 / 60;
    }
  },
);

watch(interpolated, (v) => emits("update:selected", v));
</script>

<template>
  <div>
    <span>{{ start.format("HH:mm") }}</span>
    <input type="range" v-model="sliderInput" min="0" :max="diffMinutes" />
    <span class="time-display">{{ interpolated.format("HH:mm") }}</span>
    <span>/</span>
    <span>{{ end.format("HH:mm") }}</span>
  </div>
</template>

<style lang="scss" scoped>
.time-display {
  display: inline-block;
  width: 4.2ch; // Since no monospace font, fake "correct" "fixed" with by approximation
  text-transform: full-width;
}

input[type="range"] {
  width: 20em;
}
</style>
