import {
  createElement
} from "../utils.js";

const createFilmTitle = () => {
  return (
    `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
  );
};
export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmTitle();
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
