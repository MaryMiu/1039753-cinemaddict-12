import {
  getRandomInteger
} from "../utils/common.js";

const MIN_COUNT = 100;
const MAX_COUNT = 1000000;

export const createNumberOfFilms = () => {
  return getRandomInteger(MIN_COUNT, MAX_COUNT);
};
