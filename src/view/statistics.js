import {
  groupNumber
} from "../utils.js";

export const createStatistics = (number) => {

  const formatNumber = groupNumber(number);

  return (
    `<p>${formatNumber} movies inside</p>`
  );
};
