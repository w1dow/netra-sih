/**
 * Formats a numeric estimated value to Indian Rupee format (Crores or Lakhs)
 */
export function formatCurrency(value: number | string | undefined): string {
  if (value === undefined || value === null) return 'N/A';
  if (typeof value === 'string') return value;

  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(1)} Cr`;
  }
  if (value >= 100000) {
    const lakh = value / 100000;
    return `₹${lakh % 1 === 0 ? lakh : lakh.toFixed(1)} Lakh`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
}

/**
 * Formats ISO date string to readable Indian standard format
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}
