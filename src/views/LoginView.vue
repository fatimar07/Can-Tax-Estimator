<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <h1 class="text-2xl font-bold mb-4">Log in</h1>
    <form @submit.prevent="handleLogin" class="space-y-4 w-full max-w-sm">
      <input v-model="email" type="email" placeholder="Email" required class="w-full border p-2 rounded" />
      <input v-model="password" type="password" placeholder="Password" required class="w-full border p-2 rounded" />
      <button class="w-full bg-blue-600 text-white py-2 rounded">Log in</button>
    </form>
    <p class="text-sm mt-4">
      Don't have an account?
      <router-link to="/register" class="text-blue-600 underline">Register</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const email = ref("");
const password = ref("");
const router = useRouter();

async function handleLogin() {
  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email.value, password.value);

    const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
    localStorage.removeItem("redirectAfterLogin");
    router.push(redirectTo);
  } catch (err: any) {
    alert(err.message);
  }
}
</script>
