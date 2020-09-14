const FILM_COUNT = 5;
const EXTRA_COUNT = 2;
const FILM_COUNT_EXTRA = 2;
const TASK_COUNT = 15;
const CARDS_COUNT_PER_STEP = 5;
const ENTER = `Enter`;

import UserBar from "./view/user.js";
import SiteMenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FilmContainerView from "./view/container.js";
import FilmCardView from "./view/card.js";
import LoadButtonView from "./view/load-button.js";
import FilmListExtraView from "./view/list-extra.js";
import {
  createFilmCardExtra
} from "./view/card-extra.js";
import StatisticsView from "./view/statistics.js";
import {
  generateCard
} from "./mock/card.js";
import PopupView from "./view/card-details.js";
import CommentContainerView from "./view/comment-container.js";
import CommentListView from "./view/comment-list.js";
import CommentNewView from "./view/comment-new.js";
import {
  createNumberOfFilms
} from "./mock/statistics.js";
import {
  generateFilter
} from "./mock/filter.js";
import {
  renderTemplate,
  render,
  renderPosition
} from "./utils.js";

const cards = new Array(TASK_COUNT).fill().map(generateCard);
const filters = generateFilter(cards);
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, new UserBar(filters).getElement(), renderPosition.BEFOREEND);
render(siteMain, new SiteMenuView().getElement(), renderPosition.BEFOREEND);

const siteNavigation = document.querySelector(`.main-navigation`);

render(siteNavigation, new FilterView(filters).getElement(), `afterbegin`);
render(siteMain, new SortView().getElement(), renderPosition.BEFOREEND);
render(siteMain, new FilmContainerView().getElement(), renderPosition.BEFOREEND);

const films = siteMain.querySelector(`.films`);
const filmList = films.querySelector(`.films-list`);
const filmContainer = filmList.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmContainer, new FilmCardView(cards[i]).getElement(), renderPosition.BEFOREEND);
}

for (let i = 0; i < EXTRA_COUNT; i++) {
  render(films, new FilmListExtraView().getElement(), renderPosition.BEFOREEND);
}

let filmCardsExtra = ``;

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  filmCardsExtra += createFilmCardExtra();
}

const filmListsExtra = siteMain.querySelectorAll(`.films-list--extra`);

filmListsExtra.forEach((item) => {
  const filmContainerExtra = item.querySelector(`.films-list__container`);
  renderTemplate(filmContainerExtra, filmCardsExtra, renderPosition.BEFOREEND);
});

const statistics = document.querySelector(`.footer__statistics`);
const filmCount = createNumberOfFilms();

render(statistics, new StatisticsView(filmCount).getElement(), renderPosition.BEFOREEND);

if (cards.length > CARDS_COUNT_PER_STEP) {
  let renderedCardsCount = CARDS_COUNT_PER_STEP;
  render(filmList, new LoadButtonView().getElement(), renderPosition.BEFOREEND);

  const loadMoreButton = filmList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    let renderedCardsPerStep = document.createDocumentFragment();

    evt.preventDefault();
    cards
      .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => (renderedCardsPerStep.append(new FilmCardView(card).getElement())));

    render(filmContainer, renderedCardsPerStep, renderPosition.BEFOREEND);

    renderedCardsCount += CARDS_COUNT_PER_STEP;

    if (renderedCardsCount >= cards.length) {
      loadMoreButton.remove();
    }
  });
}

filmList.addEventListener(`click`, filmsClickHandler);

const ESC_KEY = `Escape`;

function filmsClickHandler(evt) {
  if (isPopupTarget(evt)) {
    const card = evt.target.closest(`.film-card`);
    const index = Array.from(filmContainer.children).indexOf(card);
    render(siteFooter, new PopupView(cards[index]).getElement(), renderPosition.BEFOREEND);

    const cardClose = document.querySelector(`.film-details__close-btn`);
    cardClose.addEventListener(`click`, cardCloseCloseHandler);
    document.addEventListener(`keydown`, cardCloseKeydownHandler);

    const cardDetailsContainer = document.querySelector(`.form-details__top-container`);
    render(cardDetailsContainer, new CommentContainerView(cards[index]).getElement(), renderPosition.BEFOREEND);

    const cardDetailsList = document.querySelector(`.film-details__comments-wrap`);
    render(cardDetailsList, new CommentListView(cards[index]).getElement(), renderPosition.BEFOREEND);
    render(cardDetailsList, new CommentNewView(cards[index]).getElement(), renderPosition.BEFOREEND);

    const emojilList = document.querySelector(`.film-details__emoji-list`);
    emojilList.addEventListener(`change`, emojilListChangeHandler);

    const commentsList = document.querySelector(`.film-details__comments-list`);
    commentsList.addEventListener(`click`, commentsListClickHandler);

    const formFilmInner = document.querySelector(`.film-details__inner`);
    formFilmInner.addEventListener(`keydown`, formFilmInnerSubmitHandler);

  } else {
    return;
  }
}

const isPopupTarget = (evt) => evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`);

function removePopupAndHandler(evt) {
  let cardDetails = document.querySelector(`.film-details`);
  cardDetails.remove();
  evt.target.removeEventListener(`click`, cardCloseCloseHandler);
  document.removeEventListener(`keydown`, cardCloseKeydownHandler);
}

function cardCloseCloseHandler(evt) {
  removePopupAndHandler(evt);
}

function cardCloseKeydownHandler(evt) {
  if (evt.key === ESC_KEY) {
    removePopupAndHandler(evt);
  }
}

function emojilListChangeHandler(evt) {
  if (isEmojiTarget(evt)) {
    const emoji = evt.target.value;
    const image = createImage(emoji);
    insertEmoji(image);
  }
}

function createImage(emoji) {
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
}

function insertEmoji(elem) {
  const emojiContainer = document.querySelector(`.film-details__add-emoji-label`);
  emojiContainer.innerHTML = elem;
}

const isEmojiTarget = (evt) => evt.target && evt.target.matches(`input[type="radio"]`);

function commentsListClickHandler(evt) {
  if (isDeleteButton(evt)) {
    evt.preventDefault();
    const comment = evt.target.closest(`.film-details__comment`);
    comment.remove();
  } else {
    return;
  }
}

const isDeleteButton = (evt) => evt.target.classList.contains(`film-details__comment-delete`);

function formFilmInnerSubmitHandler(evt) {
  if (evt.key === ENTER && evt.ctrlKey) {
    const form = evt.currentTarget;
    const formText = form.querySelector(`.film-details__comment-input`);
    formText.value = escape(formText.value);
    form.submit();
  }
}
