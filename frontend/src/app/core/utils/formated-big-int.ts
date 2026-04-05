export function formatBigIntToDecimal(value:BigInt) {
  const str = value.toString();

  const integerPart = str.slice(0, -2) || "0";
  const decimalPart = str.slice(-2).padStart(2, "0");

  return `${integerPart}.${decimalPart}`;
}
export function formatCurrency(value?: number | null): string {
  if (value === undefined || value === null) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}