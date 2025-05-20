export interface TaxInput {
  grossIncome: number;
  expenses: number;
  rrsp: number;
}

export interface TaxBreakdown {
  netIncome: number;
  cpp: number;
  federalTax: number;
  provincialTax: number;
  totalOwed: number;
}

export function calculateCanadianTax(input: TaxInput): TaxBreakdown {
  const netIncome = Math.max(0, input.grossIncome - input.expenses - input.rrsp);
  const cpp = calculateCPP(netIncome);
  const federal = calculateFederalTax(netIncome);
  const provincial = calculateNLTax(netIncome);

  return {
    netIncome,
    cpp,
    federalTax: federal,
    provincialTax: provincial,
    totalOwed: cpp + federal + provincial,
  };
}

function calculateCPP(netIncome: number): number {
  const basicExemption = 3500;
  const cppRate = 0.119; // 11.9% (both employee + employer)
  const maxPensionable = 68500;
  const pensionableIncome = Math.max(0, Math.min(netIncome - basicExemption, maxPensionable - basicExemption));
  return pensionableIncome * cppRate;
}

function calculateFederalTax(income: number): number {
  const brackets = [
    { limit: 55900, rate: 0.15 },
    { limit: 111733, rate: 0.205 },
    { limit: 173205, rate: 0.26 },
    { limit: 246752, rate: 0.29 },
    { limit: Infinity, rate: 0.33 }
  ];

  return calculateBracketTax(income, brackets);
}

function calculateNLTax(income: number): number {
  const brackets = [
    { limit: 42184, rate: 0.087 },
    { limit: 84369, rate: 0.145 },
    { limit: 149999, rate: 0.158 },
    { limit: 199999, rate: 0.178 },
    { limit: 249999, rate: 0.198 },
    { limit: 999999, rate: 0.208 },
    { limit: Infinity, rate: 0.218 }
  ];

  return calculateBracketTax(income, brackets);
}

function calculateBracketTax(income: number, brackets: { limit: number, rate: number }[]): number {
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    if (income > previousLimit) {
      const taxableAmount = Math.min(income, bracket.limit) - previousLimit;
      tax += taxableAmount * bracket.rate;
      previousLimit = bracket.limit;
    } else {
      break;
    }
  }

  return tax;
}
