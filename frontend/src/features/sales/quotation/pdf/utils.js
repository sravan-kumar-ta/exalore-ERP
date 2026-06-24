export const money = (value) =>
   Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   });

export const formatDate = (date) => {
   if (!date) return "";
   return new Date(date).toLocaleDateString("en-GB");
};
