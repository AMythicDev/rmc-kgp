<script setup lang="ts">
  const popular = [
    {name: "Advanced Calculus", code: "MA11003", dept: "Department of Mathematics", rating: 4.5},
    {name: "Physics of Waves", code: "PH11003", dept: "Department of Physics", rating: 1},
    {name: "Basic Engineering Mechanics", code: "PH11003", dept: "Department of Physics", rating: 3},
  ]

</script>

<template>
  <div class="flex flex-col gap-5 items-center">
    <h1 class="font-bold text-4xl">Rate My Course KGP</h1>
    <div class="h-12 w-3/4 flex">
      <input 
        class="bg-gray-200 px-4 h-full w-full rounded-lg rounded-r-none border-2 border-r-0 border-gray-400 outline-none"
        type="text"
        placeholder="Enter course name or course code"
      />
      <button class="bg-indigo-400 h-full rounded-r-lg px-4 text-white cursor-pointer hover:bg-indigo-400/90">Search</button>
    </div>
    <div class="w-3/4 mt-10">
      <h2 class="font-bold text-3xl mb-4">Popular Courses</h2>
      <div class="flex flex-col gap-3">
        <CourseCard v-for="c in popular" :name="c.name" :code="c.code" :dept="c.dept" :rating="c.rating" />
      </div>
    </div>
  </div>
</template>
