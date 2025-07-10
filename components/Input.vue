<script setup lang="ts">
const {
  type = "text",
  error = null,
  ...props
} = defineProps<{
  placeholder: string;
  id: string;
  type?: string;
  error?: string | null;
}>();

const model = defineModel();
</script>

<template>
  <input
    :class="`bg-gray-100 transition-colors px-2 py-1 block w-full border-2 ${error != null ? 'border-red-400' : 'border-gray-400 mb-4'} focus:border-indigo-400 outline-none`"
    :placeholder="props.placeholder"
    :id="props.id"
    :type="type"
    v-model="model"
  />
  <span v-if="error" class="flex items-center text-red-400 mb-1 gap-1">
    <Icon name="lucide:circle-x" /> {{ error }}</span
  >
</template>
