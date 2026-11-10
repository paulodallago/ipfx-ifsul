// @ts-nocheck
export const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 1,
    numScroll: 1,
  },
];

export const responsiveOptionsMain = [
  {
    breakpoint: "768px",
    numVisible: 1,
    numScroll: 1,
  },
];

export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString("pt-BR", options);
};
