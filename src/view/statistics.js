import {
  createElement,
  groupNumber
} from "../utils.js";

const createStatistics = (number) => {

  const formatNumber = groupNumber(number);

  return (
    `<p>${formatNumber} movies inside</p>`
  );
};

export default class Statistics {
  constructor(number) {
    this._number = number;
    this._element = null;
  }

  getTemplate() {
    return createStatistics(this._number);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
