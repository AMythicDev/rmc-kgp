<script setup lang="ts">
const user = useSupabaseUser();
const sb = useSupabaseClient();

const signOut = async () => await sb.auth.signOut();
</script>

<template>
  <header
    class="px-4 lg:px-10 h-14 fixed top-0 w-full shadow-md flex justify-between items-center bg-white dark:bg-zinc-900"
  >
    <NuxtLink to="/" class="h-full flex gap-1 items-center">
      <span class="font-bold text-2xl text-indigo-400">RMC</span>
      <span class="font-bold text-2xl"> KGP</span>
    </NuxtLink>
    <nav class="h-full">
      <ul class="flex h-full items-center">
        <li class="h-full leading-14" v-if="user == null">
          <NuxtLink
            to="/login"
            class="px-3 hover:border-b-4 block h-full hover:border-b-indigo-400"
            >Login</NuxtLink
          >
        </li>
        <li class="h-full leading-14" v-if="user == null">
          <NuxtLink
            to="/signup"
            class="px-3 hover:border-b-4 block h-full hover:border-b-indigo-400"
            >Sign Up</NuxtLink
          >
        </li>
        <li class="h-full" v-if="user != null">
          <button
            class="px-3 hover:border-b-4 block h-full hover:border-b-red-400"
            @click="signOut"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
