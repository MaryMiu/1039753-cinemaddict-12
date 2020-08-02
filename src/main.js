
const FILM_COUNT = 5;
const EXTRA_COUNT = 2;
const FILM_COUNT_EXTRA = 2;

import {createUserBar} from "./view/user.js";
import {creareSiteMenu} from "./view/menu.js";
import {createSort} from "./view/sort.js";
import {createFilmContainer} from "./view/container.js";
import {createFilmCard} from "./view/card.js";
import {createLoadButton} from "./view/load-button.js";
import {createFilmListExtra} from "./view/list-extra.js";
import {createFilmCardExtra} from "./view/card-extra.js";
import {createStatistics} from "./view/statistics.js";

let render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

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
  }
});

let statistics = document.querySelector(`.footer__statistics`);

render(statistics, `beforeend`, createStatistics());
