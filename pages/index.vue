<script setup lang="ts">
const sb = useSupabaseClient<Database>();

definePageMeta({
  layout: 'home',
});

const { data: popular } = await useAsyncData('popular', async () => {
  const { data } = await sb
    .from('courses')
    .select('name, code, dept')
    .limit(15);
  return data;
});
</script>

<template>
  <div class="w-full lg:w-3/4 mt-10">
    <h2 class="font-bold text-3xl mb-4">Popular Courses</h2>
    <div class="flex flex-col gap-3">
      <CourseCard
        v-for="c in popular"
        :name="c.name"
        :code="c.code"
        :dept="c.dept"
      />
    </div>
  </div>
</template>
