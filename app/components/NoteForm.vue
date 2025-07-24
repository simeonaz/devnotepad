<script setup lang="ts">
import { categories as CategoryList, type Category } from "@/utils/categories";

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

const showForm = ref(false);
const showDropdown = ref(false);
const search = ref("");
const selected = ref("");
const categories = ref<Category[]>(CategoryList);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    showDropdown.value = false;
  }
};

const selectCategory = (category: string) => {
  selected.value = category;
  search.value = category;
  showDropdown.value = false;
};

const filteredCategories = computed(() => {
  if (!search.value) return categories.value;
  return categories.value.filter((cat) =>
    cat.label.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(() => {
  setTimeout(() => {
    showForm.value = true;
  }, 100);

  document.addEventListener("click", handleClickOutside);
});

onBeforeMount(() => {
  showForm.value = false;
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-vue-green/7 flex items-center justify-center"
    @keydown.esc="close"
  >
    <form
      v-if="showForm"
      class="w-[80vw] md:w-[50vw] lg:w-[40vw] bg-background-dark dark:bg-background rounded-xl p-6 shadow-lg transition-opacity duration-300 ease-in-out overflow-y-auto max-h-[95vh] scroll-container"
    >
      <div class="flex flex-col space-y-4">
        <div class="flex items-center justify-between">
          <h2
            class="text-lg font-semibold text-background dark:text-background-dark"
          >
            Add a new note
          </h2>

          <button
            @click="close"
            type="button"
            class="text-background dark:text-black hover:text-gray-500 transition-colors duration-75 cursor-pointer"
          >
            <Icon name="mdi:close" size="20" />
          </button>
        </div>

        <div class="relative w-full" ref="dropdownRef">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Category</label
          >

          <input
            type="text"
            v-model="search"
            @click="toggleDropdown"
            class="w-full h-8 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-vue-green text-sm"
            placeholder="Choose a category"
          />

          <ul
            v-if="showDropdown"
            class="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto shadow-lg scroll-container"
          >
            <li
              v-for="category in filteredCategories"
              :key="category.id"
              @click="selectCategory(category.label)"
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

        <div class="flex flex-col space-y-1">
          <label for="title" class="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            class="flex items-center w-full h-8 px-2 sm:px-4 rounded-md border border-gray-400 focus:outline-none focus:border-vue-green sm:text-sm transition-colors"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="content" class="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows="4"
            class="w-full p-2 sm:p-4 rounded-md border border-background dark:border-gray-400 focus:outline-none focus:border-vue-green sm:text-sm transition-colors"
          ></textarea>
        </div>

        <button
          type="button"
          class="cursor-pointer bg-vue-green h-8 flex items-center justify-center rounded-lg px-3 py-1 text-background dark:text-background-dark text-sm font-semibold hover:bg-vue-green/90 transition-colors"
        >
          Save Note
        </button>
      </div>
    </form>
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
