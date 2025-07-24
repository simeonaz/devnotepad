<script setup lang="ts">
// TODO - Limit the number of characters in the note title and content
import { type Note } from "@/composables/useNotes";
import { categories as CategoryList, type Category } from "@/utils/categories";

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

const emit = defineEmits(["edit", "delete"]);
const editNote = () => {
  emit("edit");
};
const deleteNote = () => {
  emit("delete");
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

          <div class="text-background/95 text-sm font-semibold">
            {{ props.note?.title || "Untitled" }}
          </div>
        </div>

        <!-- actions -->
        <div class="flex items-center space-x-2 text-white">
          <button
            @click="editNote()"
            class="hover:text-vue-green transition-colors cursor-pointer"
          >
            <Icon name="mdi:edit" size="20" />
          </button>
          <button
            @click="deleteNote()"
            class="hover:text-vue-green transition-colors cursor-pointer"
          >
            <Icon name="mdi:trash" size="20" />
          </button>
        </div>
      </div>

      <p class="mt-2 text-gray-500 text-sm font-light leading-relaxed">
        {{ props.note?.content || "No content available." }}
      </p>
    </div>
  </div>
</template>
