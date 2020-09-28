import AbstractView from "./abstract.js";

// eslint-disable-next-line no-unused-vars
const checkProfileName = (number) => {
  if (number === 0) {
    return ``;
  } else if (number >= 1 && number <= 10) {
    return `Novice`;
  } else if (number >= 11 && number <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};

// eslint-disable-next-line no-unused-vars
const createUserBar = (filters) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Novice</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `);
};

export default class UserBar extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createUserBar(this._filters);
  }
}
