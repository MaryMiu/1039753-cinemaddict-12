import AbstractView from "./abstract.js";
import {checkProfileName} from '../utils/common.js';

// eslint-disable-next-line no-unused-vars
const createUserBar = (count) => {
  const status = checkProfileName(count);

  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${status}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `);
};

export default class UserBar extends AbstractView {
  constructor(films) {
    super();

    this._films = films;
    this._watchedFilms = this._films.getFilms().filter((film) => film.isHistory);
    this._count = this._watchedFilms.length;
  }

  getTemplate() {
    return createUserBar(this._count);
  }
}
