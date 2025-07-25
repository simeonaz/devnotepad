<script setup lang="ts">
import { categories as CategoryList, type Category } from "@/utils/categories";
import { useNotes } from "@/composables/useNotes";
const { addNote } = useNotes();

const showForm = ref(false);
const isLoading = ref(false);
const selected = ref("");
const categories = ref<Category[]>(CategoryList);
const note = ref<Note>({
  id: "",
  title: "",
  content: "",
  category: "",
  createdAt: new Date().toISOString(),
});

const props = defineProps<{
  noteToEdit: Note | null;
}>();

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

const setEdit = () => {
  if (props.noteToEdit) {
    note.value = { ...props.noteToEdit };
    selected.value =
      categories.value.find((cat) => cat.id === props.noteToEdit?.category)
        ?.label || "";
  }
};

const saveNote = async () => {
  if (!note.value.title || !note.value.category) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 700));
  isLoading.value = true;

  if (props.noteToEdit) {
    // Update existing note
    note.value.createdAt = new Date().toISOString();
    useNotes().updateNote(note.value);
  } else {
    // Add new note
    await new Promise((resolve) => setTimeout(resolve, 700));
    addNote(note.value);
  }

  isLoading.value = false;
  close();
};

onMounted(() => {
  setTimeout(() => {
    showForm.value = true;
  }, 100);

  setEdit();
});

onBeforeMount(() => {
  showForm.value = false;
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-vue-green/7 flex items-center justify-center"
    @keydown.esc="close"
  >
    <form
      v-if="showForm"
      @submit.prevent="saveNote"
      class="w-[80vw] md:w-[50vw] lg:w-[40vw] bg-background rounded-xl p-6 shadow-lg transition-opacity duration-300 ease-in-out overflow-y-auto max-h-[95vh] scroll-container"
    >
      <div class="flex flex-col space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-background-dark">
            Add a new note
          </h2>

          <button
            @click="close"
            type="button"
            class="text-black hover:text-gray-500 transition-colors duration-75 cursor-pointer"
          >
            <Icon name="mdi:close" size="20" />
          </button>
        </div>

        <CategorySelect v-model="note.category" />

        <div class="flex flex-col space-y-1">
          <label for="title" class="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter note title"
            v-model="note.title"
            required
            class="flex items-center w-full h-8 px-2 sm:px-4 rounded-md border border-gray-400 focus:outline-none focus:border-vue-green sm:text-sm transition-colors"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="content" class="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            v-model="note.content"
            rows="4"
            placeholder="Write your note here..."
            class="w-full p-2 sm:p-4 rounded-md border border-gray-400 focus:outline-none focus:border-vue-green sm:text-sm transition-colors"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="cursor-pointer bg-vue-green h-8 flex items-center justify-center rounded-lg px-3 py-1 text-background-dark text-sm font-semibold hover:bg-vue-green/90 transition-colors relative"
        >
          <span v-if="isLoading" class="loader mr-2"></span>
          <span v-if="!isLoading">Save Note</span>
          <span v-else>Saving...</span>
        </button>
      </div>
    </form>
  </div>
</template>
