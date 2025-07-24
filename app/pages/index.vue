<script setup lang="ts">
const showForm = ref(false);
const toggleForm = () => {
  showForm.value = !showForm.value;
  getNotes();
};
const notesList = ref<Note[]>([]);

function getNotes() {
  return useNotes().notes.value;
}

useHead({
  title: "DevTools Notepad",
  meta: [
    {
      name: "description",
      content: "A simple and usefull notepad for developers.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});

onMounted(() => {
  notesList.value = getNotes();
  // console.log("Notes loaded:", notesList.value);
});
</script>

<template>
  <div class="flex flex-col py-4">
    <div class="flex items-start">
      <button
        @click="toggleForm"
        type="button"
        class="cursor-pointer bg-vue-green rounded-lg px-3 py-1 text-background-dark text-sm font-semibold hover:bg-vue-green/90 transition-colors"
      >
        + Add Note
      </button>
    </div>

    <div class="mt-4">
      <NoteList :listOfNotes="notesList" />
    </div>
  </div>
  <NoteForm v-if="showForm" @close="toggleForm" />
</template>
