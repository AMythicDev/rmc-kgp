<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

const rating = useState(() => 0);
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col !w-3/4 p-6 bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-md space-y-2 bg-black"
  >
    <form class="flex flex-col gap-5 h-[90%]">
      <div class="flex justify-between mb-6">
        <h1 class="text-2xl font-semibold">Add Your Review</h1>
        <Icon name="lucide:x" size="1.5em" />
      </div>
      <div class="flex justify-between">
        <div>
          <Label class="!text-base">Enter name of your professor(s)</Label>
          <Label class="text-gray-400 dark:text-zinc-500"
            >Separate by comma(,) if multiple</Label
          >
        </div>
        <Input class="h-10 !w-96 !mb-0" />
      </div>

      <div class="flex justify-between items-center">
        <Label class="!text-base"
          >How would you rate the overall grading of the course</Label
        >
        <NuxtRating active-color="#7c86ff" rating-size="20" :rating-step="1" :rating-value="rating" :read-only="false" @rating-selected="(n) => console.log(n)" />
      </div>

      <div class="flex justify-between items-center">
        <div>
          <Label class="!text-base"
            >On a scale of 1-10, how would you rate the overall workload of the
            course</Label
          >
          <Label class="text-gray-400 dark:text-zinc-500"
            >1 is extremely light, 10 is extremely loaded</Label
          >
        </div>
        <select
          class="border border-gray-400 dark:border-zinc-600 p-2 outline-none"
        >
          <option class="dark:bg-zinc-700">1</option>
          <option class="dark:bg-zinc-700">2</option>
          <option class="dark:bg-zinc-700">3</option>
          <option class="dark:bg-zinc-700">4</option>
          <option class="dark:bg-zinc-700">5</option>
          <option class="dark:bg-zinc-700">6</option>
          <option class="dark:bg-zinc-700">7</option>
          <option class="dark:bg-zinc-700">8</option>
          <option class="dark:bg-zinc-700">9</option>
          <option class="dark:bg-zinc-700">10</option>
        </select>
      </div>

      <div class="flex flex-col flex-1">
        <Label class="!text-base">Write your review</Label>
        <Label class="text-gray-400 dark:text-zinc-500"
          >This include any feedback and suggestions that you want to share with
          your juniors</Label
        >
        <div class="flex justify-center">
        <textarea class="border-2 border-gray-400 dark:border-zinc-600 bg-gray-200 dark:bg-zinc-700 w-3/4 h-72 outline-none mt-2 p-2"></textarea>
        </div>
      </div>

      <div class="flex w-full justify-end">
        <Button class="px-3 flex items-center gap-1">
          <Icon name="lucide:plus" />
          Add Review
        </Button>
      </div>
    </form>
  </VueFinalModal>
</template>
