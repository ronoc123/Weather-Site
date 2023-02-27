const convertToFahrenheit = (num: number | undefined) => {
  if (num === undefined) return;

  return Math.round((num - 273.15) * (9 / 5) + 32);
};

export default convertToFahrenheit;
