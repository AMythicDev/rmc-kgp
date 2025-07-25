<script setup lang="ts">
const props = defineProps<{
  name: string;
  code: string;
  dept: string;
}>();
</script>

<template>
  <div
    class="bg-white dark:bg-zinc-800 flex p-4 shadow-sm rounded-md items-center"
  >
    <div
      class="border-r border-r-gray-400 dark:border-r-zinc-500 pr-2 flex flex-col justify-center"
    >
      <span class="font-extrabold"> {{ props.code }} </span>
    </div>
    <div class="pl-4 flex-1">
      <p class="text-lg font-semibold mb-1">{{ props.name }}</p>
      <p>
        <span class="mr-2">Offered by:</span>
        <span>{{ props.dept }}</span>
      </p>
    </div>
    <Button>
      <NuxtLink
        :to="`/course/${code}`"
        class="flex justify-center items-center px-4"
      >
        View
        <Icon name="lucide:chevron-right" />
      </NuxtLink>
    </Button>
  </div>
</template>
