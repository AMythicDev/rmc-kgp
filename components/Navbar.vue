<template>
  <header class="px-10 h-14 shadow-md flex justify-between items-center bg-white">
  <NuxtLink to="/" class="h-full flex gap-1 items-center">
    <span class="font-bold text-2xl text-indigo-500">RMC</span>
    <span class="font-bold text-2xl"> KGP</span>
  </NuxtLink>
  <nav class="h-full">
    <ul class="flex h-full items-center">
      <li class="h-full leading-14"><NuxtLink to="/login" class="px-3 hover:border-b-4 block h-full hover:border-b-indigo-400">Login</NuxtLink></li>
      <li class="h-full leading-14"><NuxtLink to="/signup" class="px-3 hover:border-b-4 block h-full hover:border-b-indigo-400">Sign Up</NuxtLink></li>
      <li class="h-full leading-14"><NuxtLink to="/about" class="px-3 hover:border-b-4 block h-full hover:border-b-indigo-400">About</NuxtLink></li>
    </ul>
  </nav>
  </header>
</template>
