import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { useTaxesStore } from "@/store";

const DEFAULT_INCOME = 60000;
const MONTHS_IN_YEAR = 12;
const BUSINESS_DAYS_IN_YEAR = 260; // adjust if yours differs

describe("Taxes Store", () => {
  let taxesStore: ReturnType<typeof useTaxesStore>;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    taxesStore = useTaxesStore();

    taxesStore.setInputs({
      grossIncome: DEFAULT_INCOME,
      expenses: 0,
      rrsp: 0,
    });

    taxesStore.setDisplayFrequency("month");
  });

  it("should calculate gross income correctly (yearly input)", () => {
    expect(taxesStore.grossIncome).toBe(DEFAULT_INCOME);
    expect(taxesStore.resultByFrequency).toBeNull(); // no result yet
  });

  it("should calculate gross income correctly (monthly input)", () => {
    const monthlyIncome = DEFAULT_INCOME / MONTHS_IN_YEAR;
    taxesStore.setInputs({ grossIncome: monthlyIncome, expenses: 0, rrsp: 0 });

    expect(taxesStore.grossIncome).toBeCloseTo(monthlyIncome, 2);
  });

  it("should set and compute result by frequency correctly", () => {
    taxesStore.setResult({
      netIncome: 48000,
      cpp: 3000,
      federalTax: 5000,
      provincialTax: 2000,
      totalOwed: 10000,
    });

    const result = taxesStore.resultByFrequency!;
    expect(result.netIncome).toBeCloseTo(48000 / 12, 2);
    expect(result.totalOwed).toBeCloseTo(10000 / 12, 2);
  });

  it("should update display frequency correctly", () => {
    taxesStore.setDisplayFrequency("year");
    expect(taxesStore.displayFrequency).toBe("year");

    taxesStore.setDisplayFrequency("month");
    expect(taxesStore.displayFrequency).toBe("month");
  });

  it("should toggle dashboard visibility", () => {
    taxesStore.setShowDashboard(true);
    expect(taxesStore.showDashboard).toBe(true);

    taxesStore.setShowDashboard(false);
    expect(taxesStore.showDashboard).toBe(false);
  });
});
