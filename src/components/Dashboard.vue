<template>
  <div class="grid grid-cols-1 md:grid-cols-2 md:space-x-10 mt-5 mb-20">
    <div>
      <!-- Canadian tax chart -->
      <div class="flex justify-center mt-6 gap-4">
        <Chart />
      </div>
    </div>
    <div class="flex gap-x-2">
      <!-- Tax Summary Cards -->
      <div class="px-5 py-5 border-2 rounded-lg border-green-500 w-6/12 text-center">
        <span class="text-xl">{{ formatCurrency(netIncome) }}</span>
        <small class="text-xs text-neutral-400">/ {{ displayFrequency }}</small>
        <div class="uppercase text-xs mt-2 tracking-widest text-green-700">Net income</div>
      </div>
      <div class="px-5 pt-5 pb-2 border-2 rounded-lg border-red-500 w-6/12 text-center">
        {{ formatCurrency(totalTax) }}
        <small class="text-xs text-neutral-400">/ {{ displayFrequency }}</small>
        <div class="uppercase text-xs mt-2 tracking-widest text-red-700">Taxes</div>
        <div class="mt-2 flex justify-between text-neutral-500 uppercase tracking-wide">
          <small>{{ formatCurrency(federalTax) }} <span class="text-red-400">Federal</span></small>
          <small>{{ formatCurrency(cpp) }} <span class="text-blue-400">CPP</span></small>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <Table />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useTaxStore } from "@/store";

import Chart from "@/components/Chart.vue";
import Table from "@/components/Table.vue";

const store = useTaxStore();
const { result, displayFrequency } = storeToRefs(store);

// Utility to scale values
const scale = computed(() => {
  if (displayFrequency.value === "month") return 1 / 12;
  return 1; // default to yearly
});

// Format currency (simple formatter)
const formatCurrency = (value: number) =>
  `$${(value * scale.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

// Pull values from result
const netIncome = computed(() => result.value?.netIncome ?? 0);
const cpp = computed(() => result.value?.cpp ?? 0);
const federalTax = computed(() => result.value?.federalTax ?? 0);
const provincialTax = computed(() => result.value?.provincialTax ?? 0);
const totalTax = computed(() => cpp.value + federalTax.value + provincialTax.value);
</script>
