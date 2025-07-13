<script setup lang="ts">
const { for: forElm, class: className } = defineProps<{
  for?: string;
  class?: string;
}>();
</script>

<template>
  <label :class="`text-sm block ${className}`" :for="forElm"> <slot /> </label>
</template>
