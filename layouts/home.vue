<script setup lang="ts">
const route = useRoute();
const search_term = useState(() => route.query.term);

const search = () => {
  if (search_term.value && search_term.value.length == 0)
    return navigateTo('/');

  navigateTo({
    path: '/search',
    query: {
      term: search_term.value,
    },
  });
};
</script>

<template>
  <Navbar />
  <div class="p-3 lg:p-10 !pt-24">
    <NuxtRouteAnnouncer />
    <div class="flex flex-col gap-5 items-center">
      <h1 class="font-bold text-4xl">Rate My Course KGP</h1>
      <form class="h-12 w-full lg:w-3/4 flex" @submit.prevent="search">
        <input
          class="bg-gray-200 dark:bg-zinc-800 px-4 flex-1 rounded-lg rounded-r-none border-2 border-r-0 border-gray-400 dark:border-zinc-700 outline-none"
          type="text"
          placeholder="Enter course name or course code"
          v-model="search_term"
        />
        <button
          class="bg-indigo-400 rounded-r-lg px-3 text-white cursor-pointer hover:bg-indigo-400/90 flex gap-1 items-center"
          type="submit"
        >
          <Icon name="lucide:search" /> Search
        </button>
      </form>
      <slot />
    </div>
  </div>
</template>
>
