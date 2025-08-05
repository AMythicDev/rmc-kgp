<script setup lang="ts">
const {
  type = 'text',
  error = null,
  class: className,
  ...props
} = defineProps<{
  placeholder?: string;
  id: string;
  type?: string;
  class?: string;
  error?: string | null;
}>();

const model = defineModel();
</script>

<template>
  <input
    :class="`bg-gray-100 dark:bg-zinc-700 transition-colors px-2 py-1 block w-full border-2 ${error != null ? 'border-red-400 mb-0.5' : 'border-gray-400 dark:border-zinc-600 mb-4'} focus:border-indigo-400 outline-none ${className}`"
    :placeholder="props.placeholder"
    :id="props.id"
    :type="type"
    v-model="model"
  />
  <span v-if="error" class="flex items-top text-red-400 mb-1 gap-1">
    <Icon name="lucide:circle-x" />
    <div class="mt-[-0.15rem]">
      <div v-html="error" />
    </div>
  </span>
</template>
