export const FormatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
  };
  return date.toLocaleDateString('en-EN', options);
};