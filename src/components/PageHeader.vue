<template>
  <header class="sticky top-0 z-50 bg-defaultbg">
    <nav class="flex justify-between items-center px-5">
      <div class="flex items-center justify-start gap-5">
        <router-link class="flex items-center justify-center space-x-3" to="/">
          <img src="@/assets/world.svg" class="h-7" />
          <span> Tax Estimator 🇨🇦 </span>
        </router-link>

        
        <router-link
          v-if="user"
          to="/history"
          class="text-sm text-blue-600 underline ml-4"
        >
          History
        </router-link>
      </div>

      <div>
        <a
          v-if="breakpoint.mdAndUp"
          class="cursor-pointer p-3"
          target="_blank"
          href="https://github.com/fatimar07/can-tax-estimator/"
        >
          <img src="@/assets/github-mark.svg" class="h-7" />
        </a>
      </div>

      
      <div v-if="user">
        <button
          @click="logout"
          class="text-sm text-red-600 underline ml-4"
        >
          Log out
        </button>
      </div>

      
      <router-link
        v-else
        to="/login"
        class="text-sm text-blue-600 underline ml-4"
      >
        Log in
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { useTaxStore } from "@/store";
import { useBreakpoint } from "@/composables/breakpoints";
import { useAuth } from "@/composables/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "vue-router";

const { user } = useAuth();
const router = useRouter();

async function logout() {
  await signOut(auth);
  router.push("/");
}

const { breakpoint } = useBreakpoint();
const store = useTaxStore();
</script>
