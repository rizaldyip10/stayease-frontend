export const currencyFormatter = (amount: number | undefined) => {
    amount = amount === undefined ? 0 : amount
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(amount);
};