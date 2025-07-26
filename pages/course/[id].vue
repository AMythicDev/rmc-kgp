<script setup lang="ts">
import AddReview from "~/components/AddReview.vue";
import { ModalsContainer, useModal } from "vue-final-modal";

let id = useRoute().params.id;
if (Array.isArray(id)) id = id[0];

const sb = useSupabaseClient<Database>();
const user = useSupabaseUser();

const course = useAsyncData(`course:${id}`, async () => {
  const { data } = await sb
    .from("courses")
    .select("name, code, dept")
    .eq("code", id)
    .maybeSingle();
  return data;
}).data;

const myReview = useAsyncData(`myReviewData:${id}`, async () => {
  if (!user.value) return null;
  const { data } = await sb
    .from("reviews")
    .select(
      "id, profs, grading, semester, year, workload, body, profiles (username)",
    )
    .eq("user_id", user.value!.id)
    .eq("course", id)
    .maybeSingle();
  return data;
}).data;

const otherReviews = useAsyncData(`otherReviewsData:${id}`, async () => {
  const query = sb
    .from("reviews")
    .select(
      "id, profs, grading, semester, year, workload, body, profiles (username)",
    )
    .eq("course", id);
  if (user.value) {
    query.neq("user_id", user.value.id);
  }
  const { data } = await query;
  return data;
}).data;

const numReviews = computed(() => {
  if (myReview.value && otherReviews.value) {
    return otherReviews.value.length + 1;
  } else if (otherReviews.value) {
    return otherReviews.value.length;
  } else {
    return 0;
  }
});

const { data: avg_grading } = useAsyncData(`avg_grading:${id}`, async () => {
  const { data } = await sb
    .from("reviews")
    .select("course, grading.avg()")
    .eq("course", id)
    .maybeSingle();
  if (data == null) return 0;
  return data.avg;
});

const { data: avg_workload } = useAsyncData(`avg_workload:${id}`, async () => {
  const { data } = await sb
    .from("reviews")
    .select("course, workload.avg()")
    .eq("course", id)
    .maybeSingle();
  if (data == null) return 0;
  return data.avg;
});

watch(
  user,
  async () => {
    await refreshNuxtData([`otherReviewsData:${id}`, `myReviewData:${id}`]);
  },
  { immediate: true },
);

const goToLogin = () => {
  const redirectInfo = useSupabaseCookieRedirect();
  redirectInfo.path.value = `/course/${id}`;
  navigateTo("/login");
};

const addReviewDialog = () => {
  const { open, close } = useModal({
    component: AddReview,
    attrs: {
      course_code: id,
      user_id: user.value!.id,
      onConfirm: (review: any) => {
        myReview.value = review;
        close();
      },
      onExit: () => close(),
    },
  });
  open();
};

const deletedReview = () => {
  myReview.value = null;
};
</script>

<template>
  <section
    class="flex bg-white dark:bg-zinc-800 shadow-sm rounded-md h-64 p-12"
  >
    <div class="flex-1 pl-8 border-r border-r-gray-400 dark:border-r-zinc-500">
      <div v-if="course">
        <p class="text-3xl font-extrabold mb-3">{{ course.name }}</p>
        <p class="mb-1">
          <span class="mr-2">Course Code:</span>
          <span>{{ course.code }}</span>
        </p>
        <p class="mb-1">
          <span class="mr-2">Offered by:</span>
          <span>{{ course.dept }}</span>
        </p>
        <p>{{ numReviews }} Reviews</p>
      </div>
      <div class="pl-8 flex-1" v-else>
        <p class="bg-zinc-700 w-96 h-10 rounded-full mb-3"></p>
        <p class="bg-zinc-700 w-32 h-4 rounded-full mb-2.5"></p>
        <p class="bg-zinc-700 w-72 h-4 rounded-full mb-2.5"></p>
        <p class="bg-zinc-700 w-24 h-4 rounded-full"></p>
      </div>
    </div>

    <div class="flex items-center pl-8 gap-6 w-[26rem]">
      <template v-if="numReviews > 0">
        <div class="flex flex-col items-center">
          <p class="mb-1">Grading</p>
          <NuxtRating
            active-color="#7c86ff"
            v-if="avg_grading"
            rating-size="30"
            :rating-value="avg_grading"
          />
          <NuxtRating
            v-else
            active-color="#7c86ff"
            inactive-color="#71717b"
            rating-size="30"
            :rating-value="0"
          />
          <p class="text-center text-sm">{{ avg_grading }} / 5</p>
        </div>
        <div class="flex flex-col items-center">
          <p class="mt-2">Workload</p>
          <ClientOnly>
            <VueSpeedometer
              :segments="3"
              :value="avg_workload ?? 0"
              :min-value="1"
              :segment-colors="['#05df72', '#fcc800', '#ff6467']"
              :needle-color="'#7c86ff'"
              :max-value="10"
              :height="130"
              :width="200"
              :ring-width="5"
              :needleHeightRatio="0.8"
            />
          </ClientOnly>
        </div>
      </template>
      <template v-else>
        <p class="text-gray-400 dark:text-zinc-400 text-2xl text-center">
          Not enough data to show ratings
        </p>
      </template>
    </div>
  </section>

  <section class="w-full flex justify-center">
    <section class="w-full lg:w-3/4 flex flex-col items-center">
      <div class="w-full">
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
      <ReviewCard v-else>
        <ReviewDisplay
          :review="myReview"
          :my="true"
          v-on:delete="deletedReview"
          v-on:edit="(r) => (myReview = r)"
        />
      </ReviewCard>
      <div class="w-full">
        <h2 class="text-2xl font-semibold mt-5">Other Reviews</h2>
      </div>
      <ReviewCard v-for="review in otherReviews">
        <ReviewDisplay :review="review" />
      </ReviewCard>
    </section>
  </section>
  <ModalsContainer />
</template>
