export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();

export const getCurrentmonthDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
}

export const limitExceeded = (totalExpenses: number): boolean => {
    return (Number(process.env.MAX_MONTHLY_EXPENSES ?? 10000)) < totalExpenses;
}