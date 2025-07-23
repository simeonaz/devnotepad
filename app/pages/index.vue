<script setup lang="ts">
useHead({
  title: 'DevTools Notepad',
  meta: [
    { name: 'description', content: 'A simple and usefull notepad for developers.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
});
</script>

<template>
  <div class="flex flex-col py-4">
    <div class="flex items-start">
      <button
        type="button"
        class="cursor-pointer bg-vue-green rounded-lg px-3 py-1 text-background dark:text-background-dark text-sm font-semibold hover:bg-vue-green/90 transition-colors"
      >
        + Add
      </button>
    </div>
  </div>
</template>
