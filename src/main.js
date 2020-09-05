const FILM_COUNT = 5;
const EXTRA_COUNT = 2;
const FILM_COUNT_EXTRA = 2;
const TASK_COUNT = 15;
const CARDS_COUNT_PER_STEP = 5;
const ENTER = `Enter`;

import {
  createUserBar
} from "./view/user.js";
import {
  createSiteMenu
} from "./view/menu.js";
import {
  createFilter
} from "./view/filter.js";
import {
  createSort
} from "./view/sort.js";
import {
  createFilmContainer
} from "./view/container.js";
import {
  createFilmCard
} from "./view/card.js";
import {
  createLoadButton
} from "./view/load-button.js";
import {
  createFilmListExtra
} from "./view/list-extra.js";
import {
  createFilmCardExtra
} from "./view/card-extra.js";
import {
  createStatistics
} from "./view/statistics.js";
import {
  generateCard
} from "./mock/card.js";
import {
  createPopup
} from "./view/card-details.js";
import {
  createCommentContainer
} from "./view/comment-container.js";
import {
  createCommentList
} from "./view/comment-list.js";
import {
  createCommentNew
} from "./view/comment-new.js";
import {
  createNumberOfFilms
} from "./mock/statistics.js";
import {
  generateFilter
} from "./mock/filter.js";

const cards = new Array(TASK_COUNT).fill().map(generateCard);
const filters = generateFilter(cards);

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, `beforeend`, createUserBar(filters));
render(siteMain, `beforeend`, createSiteMenu());

const siteNavigation = document.querySelector(`.main-navigation`);

render(siteNavigation, `afterbegin`, createFilter(filters));
render(siteMain, `beforeend`, createSort());
render(siteMain, `beforeend`, createFilmContainer());

const films = siteMain.querySelector(`.films`);
const filmList = films.querySelector(`.films-list`);
const filmContainer = filmList.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmContainer, `beforeend`, createFilmCard(cards[i]));
}

for (let i = 0; i < EXTRA_COUNT; i++) {
  render(films, `beforeend`, createFilmListExtra());
}

let filmCardsExtra = ``;

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  filmCardsExtra += createFilmCardExtra();
}

const filmListsExtra = siteMain.querySelectorAll(`.films-list--extra`);

filmListsExtra.forEach((item) => {
  const filmContainerExtra = item.querySelector(`.films-list__container`);
  render(filmContainerExtra, `beforeend`, filmCardsExtra);
});

const statistics = document.querySelector(`.footer__statistics`);
const filmCount = createNumberOfFilms();

render(statistics, `beforeend`, createStatistics(filmCount));

if (cards.length > CARDS_COUNT_PER_STEP) {
  let renderedCardsCount = CARDS_COUNT_PER_STEP;
  render(filmList, `beforeend`, createLoadButton());

  const loadMoreButton = filmList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    let renderedCardsPerStep = ``;
    evt.preventDefault();
    cards
      .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => (renderedCardsPerStep += createFilmCard(card)));

    render(filmContainer, `beforeend`, renderedCardsPerStep);

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
    render(siteFooter, `afterend`, createPopup(cards[index]));

    const cardClose = document.querySelector(`.film-details__close-btn`);
    cardClose.addEventListener(`click`, cardCloseCloseHandler);
    document.addEventListener(`keydown`, cardCloseKeydownHandler);

    const cardDetailsContainer = document.querySelector(`.form-details__top-container`);
    render(cardDetailsContainer, `beforeend`, createCommentContainer(cards[index]));

    const cardDetailsList = document.querySelector(`.film-details__comments-wrap`);
    render(cardDetailsList, `beforeend`, createCommentList(cards[index]));
    render(cardDetailsList, `beforeend`, createCommentNew(cards[index]));

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

