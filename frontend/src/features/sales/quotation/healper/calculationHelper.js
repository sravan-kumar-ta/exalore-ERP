export const VAT_RATE = 15;

export function recalcRow(row) {
   const qty = parseFloat(row.qty) || 0;
   const rate = parseFloat(row.rate) || 0;
   const discPercent = parseFloat(row.discPercent) || 0;

   const gross = qty * rate;
   const discAmount = (gross * discPercent) / 100;
   const net = gross - discAmount;
   const vat = (net * VAT_RATE) / 100;
   const netAfterVat = net + vat;

   return { ...row, discAmount, net, vat, netAfterVat };
}

export const fmt = (n) => (Number.isFinite(n) ? n.toFixed(2) : "0.00");
