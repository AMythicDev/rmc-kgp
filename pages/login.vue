<script setup lang="ts">
const email = ref('');
const pw = ref('');
const pwVisible = ref(false);
const invalidLogin = ref(false);

const user = useSupabaseUser();
watch(
  user,
  () => {
    if (user.value) {
      navigateTo('/confirm');
    }
  },
  { immediate: true },
);

const emailErr = ref<string | null>(null);
const pwErr = ref<string | null>(null);

function validateForm() {
  let isValid = true;
  emailErr.value = null;
  pwErr.value = null;

  if (email.value.length == 0) {
    emailErr.value = 'Email cannot be empty';
    isValid = false;
  }
  if (pw.value.length < 8) {
    pwErr.value = 'Password must be 8 characters long';
    isValid = false;
  }

  return isValid;
}

const signin = async () => {
  if (!validateForm()) return;
  const sb = useSupabaseClient<Database>();
  const { error } = await sb.auth.signInWithPassword({
    email: email.value,
    password: pw.value,
  });
  if (!error) {
    navigateTo('/confirm');
  } else {
    invalidLogin.value = true;
  }
};
</script>

<template>
  <div class="flex justify-center">
    <Transition>
      <div
        class="bg-red-400/20 h-12 flex gap-1 items-center w-max px-3 shadow-sm mb-10"
        v-if="invalidLogin"
      >
        <Icon name="lucide:circle-x" size="1.5em" class="text-red-400" />
        <span class="text-red-400 font-bold">
          The password does not match a valid user.
        </span>
      </div>
    </Transition>
  </div>

  <div class="flex justify-center">
    <form
      class="bg-white dark:bg-zinc-800 w-[30rem] p-12 shadow-md"
      @submit.prevent="signin"
    >
      <h1 class="font-bold text-3xl mb-6">Sign In</h1>

      <label class="text-sm block" for="username">Email</label>
      <Input
        placeholder="johndoe@mail.com"
        id="email"
        type="email"
        v-model="email"
        :error="emailErr"
      />

      <label class="text-sm block" for="password">Password</label>
      <Input
        placeholder="Enter your password"
        :type="pwVisible ? 'text' : 'password'"
        :error="pwErr"
        v-model="pw"
        id="password"
      />
      <input
        type="checkbox"
        v-model="pwVisible"
        class="mb-6 mr-1"
        id="pwVisible"
      /><label for="pwVisible">Show Password</label>
      <Button class="w-full mb-3" type="submit">Sign In</Button>
      <p class="text-sm text-gray-600 text-center">
        Don't have an account?
        <NuxtLink to="/signup" class="text-indigo-400 hover:text-indigo-500"
          >Sign Up</NuxtLink
        >
      </p>
    </form>
  </div>
</template>
