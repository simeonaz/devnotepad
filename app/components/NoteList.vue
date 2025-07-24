<script setup lang="ts">
import { type Note } from "@/composables/useNotes";

const props = defineProps({
  listOfNotes: {
    type: Object as PropType<Note[]>,
    required: true,
  },
});

onMounted(() => {
  console.log("NoteList mounted with notes:", props.listOfNotes);
});
</script>

<template>
  <div class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <NoteCard v-for="note in listOfNotes" :key="note.id" :note="note" />
    <div
      v-if="listOfNotes.length === 0"
      class="col-span-full text-center text-gray-500 flex items-center justify-center h-32"
    >
      No notes available. Please add a note.
    </div>
  </div>
</template>
