<script setup lang="ts">
import {computed, onMounted} from "vue";
import dayjs, {Dayjs} from "dayjs";
import {selectionItems} from "@/components/time/TimeSelection";

const props = defineProps<{
  selection: SelectionItem
}>()
const emits = defineEmits<{
  (name: 'selection', value: SelectionItem): void
}>();




const selected = computed({
  get: () => props.selection,
  set: (v) => emits('selection', v)
})


const d = dayjs()


onMounted(() => {
})

</script>

<template>
  <select v-model="selected">
    <option v-for="(item, index) in selectionItems" :value="item">{{ item.name }}, {{item.start.format('DD.MM.')}}</option>
  </select>
</template>

<style lang="scss" scoped>

</style>
