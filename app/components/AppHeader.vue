<script setup>
const links = [
  {
    title: "GitHub",
    icon: "mdi:github",
    link: "https://github.com/simeonaz/devtools-notepad",
  },
  {
    title: "X",
    icon: "hugeicons:new-twitter",
    link: "https://x.com/SimeonAzogbonon",
  },
];
</script>

<template>
  <header
    class="h-[64px] sticky top-0 z-50 border-b bg-background/95 dark:bg-background-dark/80 border-gray-200 dark:border-gray-800"
  >
    <div
      class="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl h-full flex items-center justify-between"
    >
      <h1
        class="text-lg md:text-xl font-semibold tracking-normal flex items-center space-x-1"
      >
        <span class="text-background-dark dark:text-background">📝DevTools</span>
        <span class="text-vue-green">NotePad</span>
      </h1>

      <div class="flex items-center gap-x-3.5 lg:gap-x-4">
        <ThemeToggleButton />
        <a
          v-for="(link, i) in links"
          :href="link.link"
          rel="noopener noreferrer"
          target="_blank"
          class="text-background dark:bg-background-dark"
          :title="link.title"
          ><Icon :name="link.icon" size="20"
        /></a>
      </div>
    </div>
  </header>
</template>
