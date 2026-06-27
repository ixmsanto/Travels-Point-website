const inr = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

/**
 * Format a number as Indian Rupees with Indian digit grouping,
 * e.g. formatINR(150000) → "₹1,50,000".
 */
export function formatINR(amount: number): string {
    return inr.format(amount);
}
