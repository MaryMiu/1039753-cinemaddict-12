import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {
    type,
    title,
    count
  } = filter;

  return (`
    <a href="#${type}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${title} <span class="main-navigation__item-count">${count}</span></a>
  `);
};


const createFilter = (filters, currentFilterType) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return `<div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeClickHandler = this._filterTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createFilter(this._filters, this._currentFilter);
  }

  _filterTypeClickHandler(evt) {
    if (evt.target.nodeName === `A`) {
      evt.preventDefault();
      this._callback.filterTypeClick(evt.target.hash.replace(/^#/, ``));
    }
  }

  setfilterTypeClickHandler(callback) {
    this._callback.filterTypeClick = callback;
    this.getElement().addEventListener(`click`, this._filterTypeClickHandler);
  }
}
