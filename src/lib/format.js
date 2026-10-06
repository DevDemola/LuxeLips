const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** 9500 -> "₦9,500" */
export const formatPrice = (amount) => naira.format(amount).replace("NGN", "₦").replace(/\s/g, "");

export const pluralize = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
