<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { categories as CategoryList, type Category } from "@/utils/categories";

const props = defineProps<{
  modelValue?: string | null; // selected category id
  width?: string;
  heigth?: string;
  placeholder?: string;
  label?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const categories = ref<Category[]>(CategoryList);
const showDropdown = ref(false);
const search = ref("");
const selected = ref<Category | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

// if modelValue is provided, set the initial selected category
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const cat = categories.value.find((c) => c.id === val) || null;
      selected.value = cat;
      search.value = cat ? cat.label : "";
    } else {
      selected.value = null;
      search.value = "";
    }
  },
  { immediate: true }
);

const selectCategory = (category: Category) => {
  selected.value = category;
  search.value = category.label;
  emit("update:modelValue", category.id);
  showDropdown.value = false;
};

const filteredCategories = computed(() => {
  if (!search.value) return categories.value;
  return categories.value.filter((cat) =>
    cat.label.toLowerCase().includes(search.value.toLowerCase())
  );
});

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    showDropdown.value = false;
  }
};

const clear = () => {
  selected.value = null;
  search.value = "";
  emit("update:modelValue", null);
  showDropdown.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    class="relative"
    :style="{ width: props.width || '100%' }"
    ref="dropdownRef"
  >
    <label class="block text-sm font-medium text-gray-700 mb-1">{{
      props.label || "Category"
    }}</label>
    <div class="relative">
      <input
        type="text"
        v-model="search"
        @focus="showDropdown = true"
        class="w-full h-8 px-3 border border-gray-400 rounded-md focus:outline-none focus:border-vue-green text-sm transition-colors"
        :placeholder="props.placeholder || 'Choose a category'"
        required
      />
      <button v-if="selected" class="cursor-pointer absolute z-50 inset-y-0 right-3 text-gray-500" @click="clear">
        <Icon name="mdi:close" size="16" />
      </button>
    </div>

    <ul
      v-if="showDropdown"
      class="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto shadow-lg scroll-container"
    >
      <li
        v-for="category in filteredCategories"
        :key="category.id"
        @click="selectCategory(category)"
        class="px-3 py-2 hover:bg-vue-green/10 cursor-pointer text-sm flex items-center"
      >
        <span
          class="inline-flex items-center mr-2"
          :style="{ color: category.color }"
          ><Icon v-if="category.icon" :name="category.icon" size="18"
        /></span>
        <span>{{ category.label }}</span>
      </li>
      <li
        v-if="filteredCategories.length === 0"
        class="px-3 py-2 text-gray-400 text-sm"
      >
        No categories found
      </li>
    </ul>
  </div>
</template>
