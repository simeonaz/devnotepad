<script setup>
const showPopup = ref(false);

onMounted(() => {
  setTimeout(() => {
    showPopup.value = true;
  }, 100);
});

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["closeDelete", "deleteNote"]);
const close = () => {
  emit("closeDelete");
};

const deleteNote = () => {
  emit("deleteNote", props.id);
  close();
};

onBeforeMount(() => {
  showPopup.value = false;
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-vue-green/7 flex items-center justify-center"
    @keydown.esc="close"
  >
    <div
      class="w-[80vw] md:w-[50vw] lg:w-[40vw] bg-background rounded-xl p-6 shadow-lg transition-opacity duration-300 ease-in-out overflow-y-auto max-h-[95vh] scroll-container"
    >
      <div class="flex flex-col space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-background-dark">
            Confirm Delete Note
          </h2>

          <button
            @click="close"
            type="button"
            class="text-black hover:text-gray-500 transition-colors duration-75 cursor-pointer"
          >
            <Icon name="mdi:close" size="20" />
          </button>
        </div>
        <p class="text-gray-500">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div class="flex justify-end space-x-2">
          <button
            @click="close"
            class="cursor-pointer px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="deleteNote"
            class="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
