<script setup lang="ts">
const showForm = ref(false);
const notesList = ref<Note[]>([]);
const noteToEdit = ref<Note | null>(null);

const toggleForm = () => {
  showForm.value = !showForm.value;
  getNotes();
};

const getNotes = () => {
  return (notesList.value = useNotes().notes.value);
};

const startEdition = (note: Note) => {
  noteToEdit.value = note;
  showForm.value = true;
  // console.log("Start editing note:", note);
};

const closeForm = () => {
  showForm.value = false;
  noteToEdit.value = null;
  getNotes();
};

useHead({
  title: "Dev Notepad",
  meta: [
    {
      name: "description",
      content: "A simple and usefull notepad for developers.",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});

onMounted(() => {
  getNotes();
});
</script>

<template>
  <div class="flex flex-col py-6">
    <div class="flex items-start">
      <button
        @click="toggleForm"
        type="button"
        class="cursor-pointer bg-vue-green rounded-lg px-3 py-1 text-background-dark text-sm font-semibold hover:bg-vue-green/90 transition-colors"
      >
        + Add Note
      </button>
    </div>

    <div class="">
      <NoteList
        :listOfNotes="notesList"
        @refresh="getNotes"
        @edit="startEdition"
      />
    </div>
  </div>
  <NoteForm v-if="showForm" :noteToEdit="noteToEdit" @close="closeForm" />
  <AddButton @click="toggleForm" />
</template>
