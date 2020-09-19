import {
  createElement
} from "../utils.js";

const createFilmList = () => {
  return (
    `<section class="films">
    <section class="films-list">
    </section>
  </section>`
  );
};
export default class FilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmList();
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
