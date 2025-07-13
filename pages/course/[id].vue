<script setup lang="ts">
import AddReview from "../../components/AddReview.vue";
import { ModalsContainer, useModal } from "vue-final-modal";

const { id } = useRoute().params;
const sb = useSupabaseClient();
const user = useSupabaseUser();

const { data: course } = useAsyncData(`course:${id}`, async () => {
  const { data } = await sb
    .from("courses")
    .select("name, code, dept")
    .eq("code", id)
    .single();
  return data;
});

const myReview = null;

const goToLogin = () => {
  const redirectInfo = useSupabaseCookieRedirect();
  redirectInfo.path.value = `/course/${id}`;
  navigateTo("/login");
};

const { open: addReviewDialog, close } = useModal({
  component: AddReview,
});
</script>

<template>
  <section
    class="flex bg-white dark:bg-zinc-800 shadow-sm rounded-md h-60 p-12"
    v-if="course"
  >
    <div
      class="border-r border-r-gray-400 dark:border-r-zinc-500 pr-6 flex flex-col justify-center"
    >
      <NuxtRating
        active-color="#7c86ff"
        rating-size="30"
        :rating-value="5"
      />
      <p class="text-center text-sm">{{ 5 }} / 5</p>
    </div>
    <div>
      <div class="pl-8 flex-1">
        <p class="text-3xl font-extrabold mb-3">{{ course.name }}</p>
        <p class="mb-1">
          <span class="mr-2">Course Code:</span>
          <span>{{ course.code }}</span>
        </p>
        <p>
          <span class="mr-2">Offered by:</span>
          <span>{{ course.dept }}</span>
        </p>
      </div>
    </div>
  </section>
  <section class="flex flex-col items-center">
    <div class="w-3/4">
      <h2 class="text-2xl font-semibold mt-5">Your Review</h2>
    </div>
    <ReviewCard v-if="!user">
      <div class="flex flex-col justify-center items-center flex-1 gap-2">
        <p>Login to view or add your own review</p>
        <Button @click="goToLogin" class="px-3"> Login </Button>
      </div>
    </ReviewCard>
    <ReviewCard v-else-if="!myReview">
      <div class="flex flex-col justify-center items-center flex-1 gap-2">
        <p>Add your review for this course</p>
        <Button @click="addReviewDialog" class="px-3 flex items-center gap-1">
          <Icon name="lucide:plus" />
          Add Review
        </Button>
      </div>
    </ReviewCard>
    <div class="w-3/4">
      <h2 class="text-2xl font-semibold mt-5">Other Reviews</h2>
    </div>
  </section>
  <ModalsContainer />
</template>
