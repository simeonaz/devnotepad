<script setup lang="ts">
import { type Note } from "@/composables/useNotes";

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true,
  },
});
</script>

<template>
  <div class="border border-gray-400 rounded-xl bg-white p-4"></div>
</template>
