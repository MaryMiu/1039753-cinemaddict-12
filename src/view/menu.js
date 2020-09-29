import AbstractView from "./abstract.js";
import {
  MenuItem
} from "../constants.js";

const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">

  <a href="#stats" class="main-navigation__additional" data-item="${MenuItem.STATISTICS}">Stats</a>
  </nav>`
  );
};
export default class SiteMenu extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }
  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.item);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._menuClickHandler);
  }
}
