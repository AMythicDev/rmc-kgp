<script setup lang="ts">
  const pwVisible = useState("pwVisible", () => false);
</script>

<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-14rem)]">
    <form class="w-[30rem] p-12 shadow-md bg-white">
      <h1 class="font-bold text-3xl mb-6">Sign Up</h1>

      <label class="text-sm block" for="username">Select a Username</label>
      <input
        class="bg-gray-100 transition-colors p-2 mb-4 block w-full border-2 border-gray-400 focus:border-indigo-400 outline-none"
        placeholder="johndoe"
        id="username"
      />
      <label class="text-sm block" for="email">Enter your Email</label>
      <input
        class="bg-gray-100 transition-colors p-2 mb-4 block w-full border-2 border-gray-400 focus:border-indigo-400 outline-none"
        placeholder="johndoe.25@kgpian.iitkgp.ac.in"
        id="email"
      />
      <label class="text-sm block" for="insti-email">Enter your Institute Email</label>
      <input
        class="bg-gray-100 transition-colors p-2 mb-4 block w-full border-2 border-gray-400 focus:border-indigo-400 outline-none"
        placeholder="johndoe@mail.com"
        id="insti-email"
      />
      <label class="text-sm block" for="password">Choose a Password</label>
      <input 
        class="bg-gray-100 p-2 transition-colors block mb-4 w-full border-2 border-gray-400 focus:border-indigo-400 outline-none"
        placeholder="Enter password"
        :type="pwVisible ? 'text' : 'password'"
        id="password"
      />
      <label class="text-sm block" for="choosepw">Confirm your Password</label>
      <input 
        class="bg-gray-100 p-2 transition-colors block mb-2 w-full border-2 border-gray-400 focus:border-indigo-400 outline-none"
        placeholder="Re-Enter choosen password"
        :type="pwVisible ? 'text' : 'password'"
        id="choosepw"
      />

      <input type="checkbox" v-model="pwVisible" class="mb-6 mr-1" id="pwVisible" /><label for="pwVisible">Show Password</label>
      <button class="w-full bg-indigo-400 hover:bg-indigo-400/90 text-white transition-colors py-2 cursor-pointer mb-3 shadow-md">Sign In</button>
      <p class="text-sm text-gray-600 text-center">
        Already have an account?
        <NuxtLink to="/login" class="text-indigo-400 hover:text-indigo-500">Sign In</NuxtLink>
      </p>
    </form>
  </div>
</template>

