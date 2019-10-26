import numeral from "numeral";

export function ivaFromFinalAmount(amount: number) {
    if (amount > 0) {
        const finalAmount = amount;
        const amountWithOutIva = parseFloat((amount / 1.16).toFixed(6));
        const iva = parseFloat((finalAmount - amountWithOutIva).toFixed(2));
        return {finalAmount, amountWithOutIva, iva};
    }
    return {finalAmount: 0.000000, amountWithOutIva: 0.000000, iva: 0.00};
}

export function ivaAndFinalAmount(amount: number) {
    if (amount > 0) {
        const originalAmount = amount;
        const amountWithIva = parseFloat((amount * 1.16).toFixed(6));
        const iva = parseFloat((amountWithIva - originalAmount).toFixed(2));
        return {originalAmount, amountWithIva, iva};
    }
    return {originalAmount: 0.000000, amountWithIva: 0.000000, iva: 0.00};
}

export function calculateOnlyIva(amount: number) {
    if (amount > 0) {
        const originalAmount = parseFloat(amount.toFixed(6));
        const iva = parseFloat((amount * 0.16).toFixed(2));
        return {originalAmount, iva};
    }
    return {originalAmount: 0.000000, iva: 0.00};
}

export function roundAmount(amount: number) {
    if (amount > 0) {
        return parseFloat(amount.toFixed(2));
    }
    return 0;
}

// Formateo del importe a pagar
export function formatCurrency(number: any) {
    return numeral(number).format("$ 0,0.00");
}
