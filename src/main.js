const FILM_COUNT = 15;
const COMMENT_COUNT = 58;

import UserBar from "./view/user.js";
import SiteMenuView from "./view/menu.js";
import FilterPresenter from "./presenter/filter.js";
import BoardPresenter from "./presenter/board.js";
import StatisticsView from "./view/statistics.js";
import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import {
  generateCard
} from "./mock/card.js";
import {
  createNumberOfFilms
} from "./mock/statistics.js";
import {
  generateComment
} from "./mock/comment.js";
import {
  render,
  renderPosition
} from "./utils/render.js";

const comments = new Array(COMMENT_COUNT).fill().map(generateComment);
const cards = new Array(FILM_COUNT).fill().map(generateCard);

const filmsModel = new FilmsModel();
filmsModel.setFilms(cards);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const filterModel = new FilterModel();

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, new UserBar(filterModel), renderPosition.BEFOREEND);
render(siteMain, new SiteMenuView(), renderPosition.BEFOREEND);

const siteNavigation = document.querySelector(`.main-navigation`);

const filterPresenter = new FilterPresenter(siteNavigation, filterModel, filmsModel);
const boardPresenter = new BoardPresenter(siteMain, filmsModel, commentsModel, filterModel);
filterPresenter.init();
boardPresenter.init();

const statistics = siteFooter.querySelector(`.footer__statistics`);
const filmCount = createNumberOfFilms();

render(statistics, new StatisticsView(filmCount), renderPosition.BEFOREEND);
