<template>
  <table class="w-full text-xs md:text-sm text-left text-gray-700 mt-6 border">
    <thead class="text-xs text-gray-700 uppercase border-b">
      <tr>
        <th class="py-3 text-left">Category</th>
        <th class="py-3 text-left">Amount / {{ displayFrequency }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.label" class="border-b">
        <td class="pl-2 py-3 font-medium">{{ row.label }}</td>
        <td class="pl-2 py-3">{{ formatCurrency(row.value) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTaxStore } from "@/store";
import { storeToRefs } from "pinia";

const { result, grossIncome, displayFrequency } = storeToRefs(useTaxStore());

const scale = computed(() => displayFrequency.value === "month" ? 1 / 12 : 1);

const formatCurrency = (value: number) =>
  `$${(value * scale.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const rows = computed(() => {
  if (!result.value) return [];

  return [
    { label: "Gross Income", value: grossIncome.value },
    { label: "CPP", value: result.value.cpp },
    { label: "Federal Tax", value: result.value.federalTax },
    { label: "Provincial Tax", value: result.value.provincialTax },
    { label: "Total Tax Owed", value: result.value.totalOwed },
    { label: "Net Income", value: result.value.netIncome },
  ];
});
</script>
