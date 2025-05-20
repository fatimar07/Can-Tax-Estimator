<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
    <h1 class="text-3xl font-bold mb-2">Tax Estimator 🇨🇦</h1>
    <p class="text-neutral-600 mb-6">Estimate your taxes</p>

    <div class="max-w-md w-full space-y-4">
      <div>
        <label for="income" class="block text-sm font-medium">Gross Income ($)</label>
        <input v-model.number="grossIncome" type="number" id="income" class="w-full p-2 border rounded mt-1" />
      </div>

      <div>
        <label for="expenses" class="block text-sm font-medium">Business Expenses ($)</label>
        <input v-model.number="expenses" type="number" id="expenses" class="w-full p-2 border rounded mt-1" />
      </div>

      <div>
        <label for="rrsp" class="block text-sm font-medium">RRSP Contributions ($)</label>
        <input v-model.number="rrsp" type="number" id="rrsp" class="w-full p-2 border rounded mt-1" />
      </div>

      <div class="text-left">
        <label class="block text-sm font-medium mb-1">Display Frequency</label>
        <div class="flex gap-2">
          <button
            v-for="option in frequencyOptions"
            :key="option.value"
            @click="setFrequency(option.value)"
            class="px-3 py-1 border rounded text-sm"
            :class="{
              'bg-blue-600 text-white': displayFrequency === option.value,
              'bg-white text-gray-700': displayFrequency !== option.value
            }"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
        @click="calculate"
      >
        Calculate
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useTaxStore } from "@/store";
import { calculateCanadianTax } from "@/canadianTax";

const store = useTaxStore();
const router = useRouter();

// Form state (local)
const grossIncome = ref(store.grossIncome);
const expenses = ref(store.expenses);
const rrsp = ref(store.rrsp);
const displayFrequency = computed(() => store.displayFrequency);

// Frequency options
const frequencyOptions = [
  { label: "Year", value: "year" },
  { label: "Month", value: "month" },
];

// Frequency setter
function setFrequency(freq: string) {
  store.setDisplayFrequency(freq);
}

// Tax calculation and redirect
function calculate() {
  const result = calculateCanadianTax({
    grossIncome: grossIncome.value,
    expenses: expenses.value,
    rrsp: rrsp.value,
  });

  store.setInputs({
    grossIncome: grossIncome.value,
    expenses: expenses.value,
    rrsp: rrsp.value,
  });

  store.setResult(result);
  router.push("/results");
}
</script>
