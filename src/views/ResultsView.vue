<template>
  <div class="mx-2 md:mx-5 lg:mx-10 xl:mx-32 2xl:mx-60 3xl:mx-80">
    <div class="flex justify-between items-center my-4">
      <h1 class="text-2xl font-semibold">Your Tax Estimate</h1>
      <router-link
        to="/"
        class="text-sm text-blue-600 hover:underline bg-white border border-blue-500 px-3 py-1 rounded"
      >
        ← Back to Calculator
      </router-link>
    </div>

    <!-- ✅ Only show Dashboard if result exists -->
    <Dashboard v-if="result" />

    <!-- ✅ Only show this section if result exists -->
    <div v-if="result" class="text-center mt-6">
      <div v-if="checkingAuth" class="text-neutral-400 text-sm italic">
        Checking login status...
      </div>

      <button
        v-else-if="isLoggedIn"
        @click="saveEstimate"
        class="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Save Estimate
      </button>

      <router-link
        v-else
        to="/login"
        class="text-sm text-blue-600 underline mt-4 block text-center"
      >
        Log in to save this estimate
      </router-link>
    </div>

    <FooterBar />
  </div>
</template>



<script setup lang="ts">
import Dashboard from "@/components/Dashboard.vue";
import FooterBar from "@/components/FooterBar.vue";
import { useAuth } from "@/composables/useAuth";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { useTaxStore } from "@/store";
import { ref, watchEffect } from "vue";

// Auth state
const { user } = useAuth();
const checkingAuth = ref(true);
const isLoggedIn = ref(false);

// Tax result from store
const { result } = storeToRefs(useTaxStore());

// Reactively track auth status
watchEffect(() => {
  if (user.value !== undefined) {
    checkingAuth.value = false;
    isLoggedIn.value = !!user.value;
  }
});

// Save to Firestore
async function saveEstimate() {
  if (!user.value || !result.value) return;

  await addDoc(collection(db, "users", user.value.uid, "estimates"), {
    createdAt: serverTimestamp(),
    result: result.value,
  });

  alert("Estimate saved ✅");
}
</script>
