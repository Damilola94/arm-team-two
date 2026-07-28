export type CompoundInput = {
  principal: number;
  monthly: number;
  annualRate: number; // e.g. 0.15 for 15%
  years: number;
};

export type CompoundPoint = {
  year: number;
  balance: number;
  contributed: number;
};

export function projectCompoundGrowth({
  principal,
  monthly,
  annualRate,
  years,
}: CompoundInput): CompoundPoint[] {
  const monthlyRate = annualRate / 12;
  let balance = principal;
  let contributed = principal;
  const points: CompoundPoint[] = [
    { year: 0, balance: Math.round(balance), contributed: Math.round(contributed) },
  ];

  for (let year = 1; year <= years; year++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthly;
      contributed += monthly;
    }
    points.push({
      year,
      balance: Math.round(balance),
      contributed: Math.round(contributed),
    });
  }
  return points;
}

export function formatNaira(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}
