const FILM_COUNT = 15;

import UserBar from "./view/user.js";
import SiteMenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import BoardPresenter from "./presenter/board.js";
import StatisticsView from "./view/statistics.js";
import {
  generateCard
} from "./mock/card.js";
import {
  createNumberOfFilms
} from "./mock/statistics.js";
import {
  generateFilter
} from "./mock/filter.js";
import {
  render,
  renderPosition
} from "./utils/render.js";

const cards = new Array(FILM_COUNT).fill().map(generateCard);
const filters = generateFilter(cards);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, new UserBar(filters), renderPosition.BEFOREEND);
render(siteMain, new SiteMenuView(), renderPosition.BEFOREEND);

const siteNavigation = document.querySelector(`.main-navigation`);

render(siteNavigation, new FilterView(filters), renderPosition.AFTERBEGIN);

const boardPresenter = new BoardPresenter(siteMain);
boardPresenter.init(cards);

const statistics = siteFooter.querySelector(`.footer__statistics`);
const filmCount = createNumberOfFilms();

render(statistics, new StatisticsView(filmCount), renderPosition.BEFOREEND);
