<script setup lang="ts">
import { type Note, useNotes } from "@/composables/useNotes";
import { categories as CategoryList, type Category } from "@/utils/categories";
import { useClipboard } from "@/composables/useClipboard";

const { copyToClipboard } = useClipboard();
const { deleteNote } = useNotes();

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true,
  },
});

const categories = ref<Category[]>(CategoryList);
const category = computed(() => {
  return (
    categories.value.find(
      (cat) =>
        cat.id === props.note.category || cat.label === props.note.category
    ) || {
      id: "",
      label: "Uncategorized",
      color: "#ccc",
      icon: "note",
    }
  );
});

const emit = defineEmits(["edit", "refresh"]);
const editNote = () => {
  emit("edit");
};
const deletion = () => {
  deleteNote(props.note.id);
  emit("refresh");
  showPopup.value = false;
};

const handleCopy = () => {
  copyToClipboard(props.note.content || props.note.title);
};

const limitText = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const showPopup = ref(false);
const togglePopup = () => {
  showPopup.value = !showPopup.value;
};
</script>

<template>
  <div
    class="bg-gray-700/30 hover:bg-gray-700/25 rounded-xl p-4 sm:p-6 cursor-pointer border border-transparent hover:border-vue-green transition-colors"
  >
    <div class="flex flex-col">
      <div class="flex items-baseline justify-between">
        <div class="space-y-1.5">
          <div class="pointer-events-none" :style="{ color: category.color }">
            <Icon :name="category?.icon" size="1.5em" />
          </div>

          <div
            class="text-background/95 text-sm font-semibold"
            @click="editNote"
          >
            {{ limitText(props.note?.title, 25) || "Untitled" }}
          </div>
        </div>

        <!-- actions -->
        <div class="flex items-center space-x-2 text-background/75">
          <button
            @click="handleCopy"
            title="Copy to clipboard"
            class="hover:text-vue-green transition-colors cursor-pointer"
          >
            <Icon name="mdi:clipboard" size="22" />
          </button>
          <button
            @click="editNote"
            title="Edit note"
            class="hover:text-vue-green transition-colors cursor-pointer"
          >
            <Icon name="mdi:edit" size="22" />
          </button>
          <button
            @click="togglePopup"
            title="Delete note"
            class="hover:text-vue-green transition-colors cursor-pointer"
          >
            <Icon name="mdi:trash" size="22" />
          </button>
        </div>
      </div>

      <p
        class="mt-2 text-gray-500 text-sm font-light leading-relaxed"
        @click="editNote"
      >
        {{ limitText(props.note?.content, 50) || "No content available." }}
      </p>
    </div>
  </div>
  <DeleteComponent
    v-if="showPopup"
    @closeDelete="togglePopup"
    @deleteNote="deletion"
    :id="props.note.id"
  />
</template>
