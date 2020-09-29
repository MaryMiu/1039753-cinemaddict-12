import AbstractView from "./abstract.js";
import {
  groupNumber
} from "../utils/card.js";

const createFooterStatistics = (number) => {

  const formatNumber = groupNumber(number);

  return (
    `<p>${formatNumber} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractView {
  constructor(number) {
    super();
    this._number = number;
  }

  getTemplate() {
    return createFooterStatistics(this._number);
  }
}
