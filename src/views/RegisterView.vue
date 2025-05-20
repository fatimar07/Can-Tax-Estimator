<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="handleRegister" class="space-y-4 w-full max-w-sm">
      <input v-model="email" type="email" placeholder="Email" required class="w-full border p-2 rounded" />
      <input v-model="password" type="password" placeholder="Password" required class="w-full border p-2 rounded" />
      <button class="w-full bg-green-600 text-white py-2 rounded">Register</button>
    </form>
    <p class="text-sm mt-4">
      Already have an account?
      <router-link to="/login" class="text-blue-600 underline">Log in</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const email = ref("");
const password = ref("");
const router = useRouter();

async function handleRegister() {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push("/results");
  } catch (err: any) {
    alert(err.message);
  }
}
</script>
