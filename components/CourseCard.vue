<script setup lang="ts">
const props = defineProps<{
  name: string;
  code: string;
  dept: string;
  rating: number;
}>();
</script>

<template>
  <div
    class="bg-white dark:bg-zinc-800 flex p-4 shadow-sm rounded-md items-center"
  >
    <div
      class="border-r border-r-gray-400 dark:border-r-zinc-500 pr-2 flex flex-col justify-center"
    >
      <NuxtRating
        active-color="#7c86ff"
        rating-size="20"
        :rating-value="props.rating"
      />
      <p class="text-center text-sm">{{ props.rating }} / 5</p>
    </div>
    <div class="pl-4 flex-1">
      <p class="text-lg font-semibold mb-1">{{ props.name }}</p>
      <p>
        <span class="mr-2">Course Code:</span>
        <span>{{ props.code }}</span>
      </p>
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
