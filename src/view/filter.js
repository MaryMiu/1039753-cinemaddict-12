import AbstractView from "./abstract.js";
import {
  MenuItem
} from "../constants.js";

const createFilterCountTemplate = (type, count) => {
  return (`${type === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}`);
};

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {
    type,
    title,
    count
  } = filter;

  const countTemplate = createFilterCountTemplate(type, count);

  return (`
    <a href="#${type}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-item="${MenuItem.FILMS}">${title}${countTemplate}</a>
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
    this._menuClickHandler = this._menuClickHandler.bind(this);
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

  _menuClickHandler(evt) {
    if (evt.target.nodeName === `A`) {
      evt.preventDefault();
      this._callback.menuClick(evt.target.dataset.item);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._menuClickHandler);
  }

  setfilterTypeClickHandler(callback) {
    this._callback.filterTypeClick = callback;
    this.getElement().addEventListener(`click`, this._filterTypeClickHandler);
  }
}
