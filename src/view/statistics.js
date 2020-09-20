import AbstractView from "./abstract.js";
import {
  groupNumber
} from "../utils/card.js";

const createStatistics = (number) => {

  const formatNumber = groupNumber(number);

  return (
    `<p>${formatNumber} movies inside</p>`
  );
};

export default class Statistics extends AbstractView {
  constructor(number) {
    super();
    this._number = number;
  }

  getTemplate() {
    return createStatistics(this._number);
  }
}
