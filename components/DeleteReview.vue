<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

const props = defineProps<{
  id: number;
}>();

const emit = defineEmits<{
  (e: "confirm" | "exit"): void;
}>();

const deleteReview = async () => {
  const sb = useSupabaseClient();
  await sb.from("reviews").delete().eq("id", props.id);
  emit("confirm");
};
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col p-6 bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-md space-y-2 bg-black"
  >
    <h1 class="text-2xl font-semibold">Delete Your Review</h1>
    <p>Are you sure you want to delete your review</p>
    <p>Once deleted, this review won't be visible to other viewers</p>
    <div class="flex justify-end gap-3 mt-3">
      <Button
        class="!bg-gray-400 hover:!bg-gray-400/90 dark:!bg-zinc-400 hover:dark:!bg-zinc-400/90 flex items-center gap-1 px-3"
        @click="emit('exit')"
      >
        <Icon name="lucide:x" size="1.2em" />
        Cancel</Button
      >
      <Button
        class="!bg-red-400 hover:!bg-red-400/90 flex items-center gap-1 px-3"
        @click="deleteReview"
      >
        <Icon name="lucide:trash-2" size="1.2em" />
        Delete</Button
      >
    </div>
  </VueFinalModal>
</template>
