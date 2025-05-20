<template>
  <div class="mx-4 md:mx-20 mt-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Saved Tax Estimates</h1>

    <div v-if="estimates.length" class="space-y-4">
      <div
        v-for="estimate in estimates"
        :key="estimate.id"
        class="border rounded p-4 bg-white shadow-sm"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-lg font-semibold">Net Income</h2>
            <p class="text-green-700 font-mono text-xl">
              ${{ estimate.result.netIncome.toFixed(2) }}
            </p>
            <p class="text-sm text-neutral-500 mt-1">
              Saved on {{ new Date(estimate.createdAt?.seconds * 1000).toLocaleString() }}
            </p>
          </div>
          <div>
            <p class="text-sm text-red-500">Federal Tax: ${{ estimate.result.federalTax.toFixed(2) }}</p>
            <p class="text-sm text-blue-500">CPP: ${{ estimate.result.cpp.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-neutral-500 mt-10">
      No saved estimates yet.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/composables/useAuth";

const { user } = useAuth();
const estimates = ref<any[]>([]);

onMounted(async () => {
  if (!user.value) return;

  const snapshot = await getDocs(
    collection(db, "users", user.value.uid, "estimates")
  );

  estimates.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});
</script>
