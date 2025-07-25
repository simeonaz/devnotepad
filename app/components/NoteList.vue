<script setup lang="ts">
import { type Note, useNotes } from "@/composables/useNotes";
const { deleteNote } = useNotes();
const selectedCategoryId = ref("");

const props = defineProps({
  listOfNotes: {
    type: Object as PropType<Note[]>,
    required: true,
  },
});

const emit = defineEmits(["refresh", "edit"]);

const refreshNotes = () => {
  emit("refresh");
};

const editOneNote = (note: Note) => {
  emit("edit", note);
};

const deleteOneNote = (noteId: string) => {
  deleteNote(noteId);
  refreshNotes();
};

const filteredNotes = computed(() => {
  if (!selectedCategoryId.value)
    return props.listOfNotes;
  return props.listOfNotes.filter(
    (note) => note.category === selectedCategoryId.value
  );
});

onMounted(() => {
  // console.log("NoteList mounted with notes:", props.listOfNotes);
});
</script>

<template>
  <div class="mt-6">
    <div class="flex w-full md:w-[45vw] lg:w-[30vw]">
      <CategorySelect v-model="selectedCategoryId" placeholder="All" />
    </div>
  </div>
  <div class="mt-12 w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <NoteCard
      v-for="note in filteredNotes"
      :key="note.id"
      :note="note"
      @edit="editOneNote(note)"
      @delete="deleteOneNote(note.id)"
    />
    <div
      v-if="filteredNotes.length === 0"
      class="col-span-full text-center text-gray-500 flex items-center justify-center h-32"
    >
      No notes available. Please add a note.
    </div>
  </div>
</template>
