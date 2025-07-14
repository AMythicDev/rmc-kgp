<script setup lang="ts">
import { useModal } from "vue-final-modal";
import AddReview from "~/components/AddReview.vue";
import DeleteReview from "~/components/DeleteReview.vue";

const { id } = useRoute().params;
const user = useSupabaseUser();

const emit = defineEmits<{
  (e: "delete"): void;
  (e: "edit", review: any): void;
}>();

const { my = false, ...props } = defineProps<{
  review: any;
  my?: boolean;
}>();

const editReview = () => {
  const { open, close } = useModal({
    component: AddReview,
    attrs: {
      course_code: id,
      user_id: user.value!.id,
      update: props.review,
      onConfirm: (review: any) => {
        emit("edit", review);
        close();
      },
      onExit: () => close(),
    },
  });
  open();
};

const deleteReview = () => {
  const { open, close } = useModal({
    component: DeleteReview,
    attrs: {
      id: props.review.id,
      onConfirm: () => {
        emit("delete");
        close();
      },
      onExit: () => close(),
    },
  });
  open();
};
</script>

<template>
  <div class="flex items-center gap-2 mb-2">
    <Icon name="lucide:circle-user" size="2em" />
    <div class="flex-1">
      <p>
        {{ review.profiles.username }}
      </p>
      <p class="text-sm text-gray-400 dark:text-zinc-500">
        {{ review.semester }}
      </p>
    </div>
    <div v-if="my">
      <button
        class="dark:text-zinc-500 hover:text-indigo-400 outline-none mr-2"
        @click="editReview"
      >
        <Icon name="lucide:pen-line" size="1.2em" />
      </button>
      <button
        class="dark:text-zinc-500 hover:text-red-400 outline-none"
        @click="deleteReview"
      >
        <Icon name="lucide:trash-2" size="1.2em" />
      </button>
    </div>
  </div>
  <div class="flex items-center justify-between gap-2">
    <span>Professor(s)</span>
    {{ review.profs.join(", ") }}
  </div>
  <div class="flex items-center justify-between gap-2">
    <span>Overall Grading</span>
    <NuxtRating :rating-value="review.grading" active-color="#7c86ff" />
  </div>
  <div class="flex items-center justify-between gap-2 mb-2">
    <span>Overall Workload</span>
    <span>{{ review.workload }}</span>
  </div>
  <div
    class="border-2 border-gray-400 dark:border-zinc-600 flex-1 p-2 rounded-md"
  >
    {{ review.body }}
  </div>
</template>
