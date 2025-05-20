import { defineStore } from "pinia";

export const useTaxStore = defineStore("tax", {
  state: () => ({
    grossIncome: 0,
    expenses: 0,
    rrsp: 0,
    displayFrequency: "year" as "year" | "month",
    showDashboard: false,
    result: null as null | {
      netIncome: number;
      cpp: number;
      federalTax: number;
      provincialTax: number;
      totalOwed: number;
    },
  }),

  getters: {
    resultByFrequency(state) {
      if (!state.result) return null;
      const divisor = state.displayFrequency === "month" ? 12 : 1;

      return {
        netIncome: state.result.netIncome / divisor,
        cpp: state.result.cpp / divisor,
        federalTax: state.result.federalTax / divisor,
        provincialTax: state.result.provincialTax / divisor,
        totalOwed: state.result.totalOwed / divisor,
      };
    },
  },

  actions: {
    setInputs({ grossIncome, expenses, rrsp }: { grossIncome: number; expenses: number; rrsp: number }) {
      this.grossIncome = grossIncome;
      this.expenses = expenses;
      this.rrsp = rrsp;
    },
    setResult(result: {
      netIncome: number;
      cpp: number;
      federalTax: number;
      provincialTax: number;
      totalOwed: number;
    }) {
      this.result = result;
    },
    setDisplayFrequency(freq: "year" | "month") {
      this.displayFrequency = freq;
    },
    setShowDashboard(show: boolean) {
      this.showDashboard = show;
    }
  },
});
