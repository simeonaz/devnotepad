<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
    @click="toggleDark()"
    type="button"
    class="text-background-dark dark:text-background cursor-pointer"
  >
    <Icon
      :name="isDark ? 'mdi:white-balance-sunny' : 'mdi:moon-waning-crescent'"
      size="20"
    />
  </button>
</template>
