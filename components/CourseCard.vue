<script setup lang="ts">
const props = defineProps<{
  name: string;
  code: string;
  dept: string;
  rating: double;
}>();
</script>

<template>
  <div class="bg-white flex p-4 shadow-sm rounded-md items-center">
    <div class="border-r border-r-gray-400 pr-2 flex flex-col justify-center">
      <NuxtRating
        read-only
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
    <button
      class="bg-indigo-400 hover:bg-indigo-400/90 h-10 rounded-md px-3 text-white"
    >
      <NuxtLink :to="`/course/${code}`" class="h-full flex items-center">
        View
        <Icon name="lucide:chevron-right" />
      </NuxtLink>
    </button>
  </div>
</template>
