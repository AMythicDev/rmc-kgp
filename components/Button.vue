<script setup lang="ts">
const { class: className } = defineProps<{
  class?: string;
}>();
</script>

<template>
  <button
    :class="`bg-indigo-400 hover:bg-indigo-400/90 h-10 rounded-md text-white cursor-pointer ${className}`"
  >
    <slot />
  </button>
</template>
