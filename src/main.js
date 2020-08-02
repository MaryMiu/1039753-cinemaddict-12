'use strict';

const FILM_COUNT = 5;
const EXTRA_COUNT = 2;
const FILM_COUNT_EXTRA = 2;

let createUserBar = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `);
};

let creareSiteMenu = () => {
  return (
    `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

let createSort = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

let createFilmContainer = () => {
  return (
    `<section class="films">
    <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
    </section>
  </section>`
  );
};

let createFilmCard = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
          <span class="film-card__year">1929</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King
          (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to
              watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as
              watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
  </article>`
  );
};

let createLoadButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

let createFilmListExtra = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
  </section>`
  );
};

let createFilmCardExtra = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Man with the Golden Arm</h3>
      <p class="film-card__rating">9.0</p>
      <p class="film-card__info">
          <span class="film-card__year">1955</span>
          <span class="film-card__duration">1h 59m</span>
          <span class="film-card__genre">Drama</span>
      </p>
      <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in
          Lexington, Kentucky with a set of drums and a new outlook on…</p>
      <a class="film-card__comments">18 comments</a>
      <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to
              watchlist</button>
          <button
              class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark
              as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
  </article>`
  );
};

let createStatistics = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

let render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
}

let siteHeader = document.querySelector(`.header`);
let siteMain = document.querySelector(`.main`);

render(siteHeader, `beforeend`, createUserBar());
render(siteMain, `beforeend`, creareSiteMenu());
render(siteMain, `beforeend`, createSort());
render(siteMain, `beforeend`, createFilmContainer());

let films = siteMain.querySelector(`.films`);
let filmList = films.querySelector(`.films-list`);
let filmContainer = filmList.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmContainer, `beforeend`, createFilmCard());
}

render(filmList, `beforeend`, createLoadButton());

for (let i = 0; i < EXTRA_COUNT; i++) {
  render(films, `beforeend`, createFilmListExtra());
}

let filmListsExtra = siteMain.querySelectorAll(`.films-list--extra`);

filmListsExtra.forEach((item) => {
  let filmContainerExtra = item.querySelector(`.films-list__container`);
  for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
    render(filmContainerExtra, `beforeend`, createFilmCardExtra());
  };
});

let statistics = document.querySelector(`.footer__statistics`);

render(statistics, `beforeend`, createStatistics());
