<script setup lang="ts">
const route = useRoute();
const sb = useSupabaseClient<Database>();

definePageMeta({
  layout: "home",
});

const { data: results } = await useAsyncData(`search`, async () => {
  const { data } = await sb
    .from("courses")
    .select("name, code, dept")
    .or(`code.ilike.%${route.query.term}%, name.ilike.%${route.query.term}%`);
  return data;
});

watch(
  route,
  async () => {
    await refreshNuxtData([`search`]);
  },
  { immediate: true },
);
</script>

<template>
  <div class="w-full lg:w-3/4 mt-10">
    <h2 class="font-bold text-3xl mb-4">
      Search Results for '{{ route.query.term }}'
    </h2>
    <div class="flex flex-col gap-3">
      <CourseCard
        v-for="c in results"
        :name="c.name"
        :code="c.code"
        :dept="c.dept"
      />
    </div>
  </div>
</template>
