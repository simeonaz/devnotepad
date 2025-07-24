<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import type { Category } from "@/utils/categories";

const props = defineProps<{
  categories: Category[];
  width?: string;
  placeholder?: string;
  modelValue?: Category | null;
}>();
const emit = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const search = ref(props.modelValue ? props.modelValue.label : "");
const selected = ref<Category | null>(props.modelValue ?? null);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    showDropdown.value = false;
  }
};

const selectCategory = (category: Category) => {
  selected.value = category;
  search.value = category.label;
  showDropdown.value = false;
  emit("update:modelValue", category);
};

const filteredCategories = computed(() => {
  if (!search.value) return props.categories;
  return props.categories.filter((cat) =>
    cat.label.toLowerCase().includes(search.value.toLowerCase())
  );
});

watch(
  () => props.modelValue,
  (val) => {
    selected.value = val ?? null;
    search.value = val ? val.label : "";
  }
);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="relative" :style="{ width: width || '100%' }" ref="dropdownRef">
    <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
    <input
      type="text"
      v-model="search"
      @focus="showDropdown = true"
      @click="toggleDropdown"
      class="w-full h-8 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-vue-green text-sm transition-colors"
      :placeholder="placeholder || 'Choose a category'"
    />
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

<style scoped>
.scroll-container {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}
.scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
