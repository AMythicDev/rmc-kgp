<script setup lang="ts">
const pwVisible = ref(false);

const un = ref('');
const email = ref('');
const instiEmail = ref('');
const pw = ref('');
const cpw = ref('');
const showSuccess = ref(false);

const unErr = ref<null | string>(null);
const emailErr = ref<null | string>(null);
const insMailErr = ref<null | string>(null);
const pwErr = ref<null | string>(null);
const cpwErr = ref<null | string>(null);

const sb = useSupabaseClient<Database>();
const user = useSupabaseUser();
if (user.value) {
  navigateTo('/confirm');
}

async function validateForm() {
  let isValid = true;

  unErr.value = null;
  emailErr.value = null;
  insMailErr.value = null;
  pwErr.value = null;
  cpwErr.value = null;

  if (un.value.length == 0) {
    unErr.value = 'Username cannot be empty';
    isValid = false;
  } else {
    const unPat = /^[a-zA-Z][a-zA-Z0-9_\-]{4,19}$/;
    if (!unPat.test(un.value)) {
      unErr.value = `Invalid username
      <ul class="list-disc">
      <li>Must have a length of 4-19</li>
      <li>Must only contain letters, numbers, - and _ </li>
      <li>Must start with a letter</li>
      </ul>`;
      isValid = false;
    } else {
      let { data } = await sb
        .from('profiles')
        .select('user_id')
        .eq('username', un.value)
        .maybeSingle();
      if (data != null) {
        unErr.value = 'The username has already been taken';
        isValid = false;
      }
    }
  }
  if (email.value.length == 0) {
    emailErr.value = 'Email cannot be empty';
    isValid = false;
  } else {
    let { data } = await sb.rpc('user_exists', {
      email: email.value,
    });
    if (data) {
      emailErr.value =
        'This email address is already associated with a different account';
      isValid = false;
    }
  }
  if (instiEmail.value.length == 0) {
    insMailErr.value = 'Institute email cannot be empty';
    isValid = false;
  } else {
    if (!instiEmail.value.endsWith('@kgpian.iitkgp.ac.in')) {
      insMailErr.value = 'Institute email does not seem to be valid';
      isValid = false;
    }
    let { data } = await sb
      .from('profiles')
      .select('user_id')
      .eq('institute_email', instiEmail.value)
      .maybeSingle();
    if (data != null) {
      insMailErr.value =
        'This email address is already associated with a different account';
      isValid = false;
    }
  }
  if (pw.value.length < 8) {
    pwErr.value = 'Password must be 8 characters long';
    isValid = false;
  } else {
    if (cpw.value != pw.value) {
      cpwErr.value = 'Confirm password does not match passowrd';
      isValid = false;
    }
  }

  return isValid;
}

async function submitForm() {
  if (!(await validateForm())) return;

  let { error } = await sb.auth.signUp({
    email: email.value,
    password: pw.value,
    options: {
      emailRedirectTo: `${SITE_URL}/confirm`,
      data: {
        username: un.value,
        institute_email: instiEmail.value,
      },
    },
  });

  if (!error) {
    un.value = '';
    email.value = '';
    instiEmail.value = '';
    pw.value = '';
    cpw.value = '';
    // Toggle comment when email verification works
    // showSuccess.value = true;
    // Comment this when email verification works
    if (!error) {
      navigateTo('/confirm');
    }
  } else {
    console.log(error);
  }
}
</script>

<template>
  <div class="flex justify-center">
    <Transition>
      <div
        class="bg-indigo-400/20 h-12 flex gap-1 items-center w-max px-3 shadow-sm mb-10"
        v-if="showSuccess"
      >
        <Icon name="lucide:info" size="1.5em" class="text-indigo-500" />
        <span class="text-indigo-400 font-bold"
          >Sign Up successful. An email containing a verification link has been
          sent to your primary email address.</span
        >
      </div>
    </Transition>
  </div>
  <div class="flex justify-center">
    <form
      class="w-[30rem] p-12 shadow-md bg-white dark:bg-zinc-800"
      @submit.prevent="submitForm"
    >
      <h1 class="font-bold text-3xl mb-6">Sign Up</h1>

      <label class="text-sm block" for="username"> Select a Username </label>
      <Input placeholder="johndoe" id="username" v-model="un" :error="unErr" />

      <label class="text-sm block" for="email">Enter your Email</label>
      <Input
        placeholder="johndoe@mail.com"
        id="email"
        type="email"
        :error="emailErr"
        v-model="email"
      />

      <label class="text-sm block" for="insti-email"
        >Enter your Institute Email</label
      >
      <Input
        placeholder="johndoe.25@kgpian.iitkgp.ac.in"
        id="insti-email"
        type="email"
        :error="insMailErr"
        v-model="instiEmail"
      />

      <label class="text-sm block" for="password">Choose a Password</label>
      <Input
        placeholder="Enter password"
        :type="pwVisible ? 'text' : 'password'"
        id="password"
        :error="pwErr"
        v-model="pw"
      />

      <label class="text-sm block" for="choosepw">
        Confirm your Password
      </label>
      <Input
        placeholder="Re-Enter choosen password"
        :type="pwVisible ? 'text' : 'password'"
        id="choosepw"
        :error="cpwErr"
        v-model="cpw"
      />

      <input
        type="checkbox"
        v-model="pwVisible"
        class="mb-6 mr-1"
        id="pwVisible"
      />
      <label for="pwVisible">Show Password</label>

      <Button class="w-full mb-3" type="submit">Sign Up</Button>

      <p class="text-sm text-gray-600 text-center">
        Already have an account ?
        <NuxtLink to="/login" class="text-indigo-400 hover:text-indigo-500">
          Sign In
        </NuxtLink>
      </p>
    </form>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: transform 0.1s ease;
}

.v-enter-to,
.v-leave-from {
  transform: scaleY(100%);
}

.v-enter-from,
.v-leave-to {
  transform: scaleY(0);
}
</style>
