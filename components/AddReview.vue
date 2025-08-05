<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

const { update, ...props } = defineProps<{
  course_code: string;
  user_id: string;
  update?: any;
}>();

const sb = useSupabaseClient<Database>();
const profs = ref(update ? update.profs : '');
const grading = ref(update ? update.grading : 0);
const workload = ref(update ? update.workload : 5);
const body = ref(update ? update.body : '');

const date = new Date();
const month = date.getMonth();
let year = date.getFullYear();

let [stsem, styear] = startSemesterYear(month, year);
const sem_options: string[] = [];

for (let i = 0; i < 6; i++) {
  sem_options.push(`${semesterToString(stsem)} ${styear}`);
  if (stsem == Semester.Automn) {
    stsem = Semester.Spring;
  } else {
    stsem = Semester.Automn;
    styear -= 1;
  }
}

const semester = ref(sem_options[0]);

const emit = defineEmits<{
  (e: 'confirm', review: any): void;
  (e: 'exit'): void;
}>();

onUnmounted(() => {
  emit('exit');
});

const addReview = async () => {
  const [sem, year] = semester.value.split(' ');
  let yearInt = parseInt(year);

  let { data } = await sb
    .from('reviews')
    .upsert({
      id: update ? update.id : undefined,
      course: props.course_code,
      user_id: props.user_id,
      profs: profs.value.split(','),
      semester: sem,
      year: yearInt,
      grading: grading.value,
      workload: workload.value,
      body: body.value,
    })
    .select(
      'id, profs, grading, semester, year, workload, body, profiles (username)',
    )
    .single();
  emit('confirm', data);
};
</script>

<template>
  <ClientOnly>
    <VueFinalModal
      class="flex justify-center items-center"
      content-class="flex flex-col p-6 w-screen h-[70vh] lg:h-auto overflow-auto lg:!w-3/4 bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-md space-y-2 bg-black"
    >
      <form class="flex flex-col gap-5 h-[90%]">
        <div class="flex justify-between mb-2">
          <h1 class="text-2xl font-semibold">
            <template v-if="update">Update</template>
            <template v-else> Add</template>
            Your Review
          </h1>
          <button @click.prevent="emit('exit')" class="cursor-pointer">
            <Icon name="lucide:x" size="1.5em" />
          </button>
        </div>
        <div class="flex justify-between items-center">
          <Label for="semester" class="!text-base">Semester</Label>
          <select
            class="border border-gray-400 dark:border-zinc-600 p-2 outline-none"
            id="semester"
            v-model="semester"
          >
            <option
              v-for="s in sem_options"
              :key="s"
              class="dark:bg-zinc-700"
              :value="s"
            >
              {{ s }}
            </option>
          </select>
        </div>
        <div class="flex flex-col lg:flex-row justify-between">
          <div>
            <Label for="profs" class="!text-base"
              >Enter name of your professor(s)</Label
            >
            <Label for="profs" class="text-gray-400 dark:text-zinc-500"
              >Separate by comma(,) if multiple</Label
            >
          </div>
          <Input
            id="profs"
            v-model="profs"
            class="h-10 !w-96 !mb-0 rounded-md"
          />
        </div>

        <div class="flex flex-col lg:flex-row justify-between items-center">
          <Label class="!text-base"
            >How would you rate the overall grading of the course</Label
          >
          <NuxtRating
            active-color="#7c86ff"
            rating-size="20"
            :rating-step="1"
            :rating-value="grading"
            :read-only="false"
            @rating-selected="(n) => (grading = n)"
          />
        </div>

        <div class="flex justify-between items-center gap-3">
          <div>
            <Label class="!text-base"
              >On a scale of 1-10, how would you rate the overall workload of
              the course</Label
            >
            <Label class="text-gray-400 dark:text-zinc-500"
              >1 is extremely light, 10 is extremely loaded</Label
            >
          </div>
          <select
            class="border border-gray-400 dark:border-zinc-600 p-2 outline-none"
            v-model="workload"
          >
            <option
              v-for="n in 10"
              :key="n"
              class="dark:bg-zinc-700"
              :value="n"
            >
              {{ n }}
            </option>
          </select>
        </div>

        <div class="flex flex-col flex-1">
          <Label class="!text-base">Write your review</Label>
          <Label class="text-gray-400 dark:text-zinc-500"
            >This include any feedback and suggestions that you want to share
            with your juniors</Label
          >
          <div class="flex justify-center">
            <textarea
              v-model="body"
              class="border-2 border-gray-400 dark:border-zinc-600 bg-gray-200 dark:bg-zinc-700 w-full lg:w-3/4 h-72 rounded-md outline-none mt-2 p-2"
            ></textarea>
          </div>
        </div>

        <div class="flex w-full pb-6 lg:pb-0 justify-end">
          <Button
            @click.prevent="addReview"
            class="px-3 flex items-center gap-1"
          >
            <template v-if="update">
              <Icon name="lucide:refresh-ccw-dot" />
              Update
            </template>
            <template v-else>
              <Icon name="lucide:plus" />
              Add</template
            >
            Review
          </Button>
        </div>
      </form>
    </VueFinalModal>
  </ClientOnly>
</template>
