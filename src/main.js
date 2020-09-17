const FILM_COUNT = 15;
const CARDS_COUNT_PER_STEP = 5;
const cards = new Array(FILM_COUNT).fill().map(generateCard);

import UserBar from "./view/user.js";
import SiteMenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FilmContainerView from "./view/container.js";
import FilmCardView from "./view/card.js";
import LoadButtonView from "./view/load-button.js";
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
  render,
  renderPosition
} from "./utils.js";

const filters = generateFilter(cards);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

render(siteHeader, new UserBar(filters).getElement(), renderPosition.BEFOREEND);
render(siteMain, new SiteMenuView().getElement(), renderPosition.BEFOREEND);

const siteNavigation = document.querySelector(`.main-navigation`);

render(siteNavigation, new FilterView(filters).getElement(), `afterbegin`);

const renderCard = (cardListElement, card) => {
  const cardComponent = new FilmCardView(card);
  const popupComponent = new PopupView(card);

  const showPopup = () => {
    document.body.appendChild(popupComponent.getElement());
  };

  const removePopup = () => {
    document.body.removeChild(popupComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const cardSelectors = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];
  const cardElements = cardSelectors.map((element) => {
    return cardComponent.getElement().querySelector(element);
  });

  const popupDetailsContainer = popupComponent.getElement().querySelector(`.form-details__top-container`);
  render(popupDetailsContainer, new CommentContainerView(card).getElement(), renderPosition.BEFOREEND);

  const popupDetailsList = popupComponent.getElement().querySelector(`.film-details__comments-wrap`);
  render(popupDetailsList, new CommentListView(card).getElement(), renderPosition.BEFOREEND);
  render(popupDetailsList, new CommentNewView(card).getElement(), renderPosition.BEFOREEND);

  cardElements.forEach((element) => {
    element.addEventListener(`click`, () => {
      showPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });

  popupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(cardListElement, cardComponent.getElement(), renderPosition.BEFOREEND);
};

const renderList = (listContainer, listCards) => {
  const filmComponent = new FilmContainerView();

  render(siteMain, filmComponent.getElement(), renderPosition.BEFOREEND);
  render(siteMain, new SortView().getElement(), renderPosition.BEFOREEND);

  const filmList = listContainer.querySelector(`.films-list`);
  const filmContainer = filmList.querySelector(`.films-list__container`);

  listCards
    .slice(0, Math.min(cards.length, CARDS_COUNT_PER_STEP))
    .forEach((listCard) => renderCard(filmContainer, listCard));

  if (listCards.length > CARDS_COUNT_PER_STEP) {
    let renderedCardsCount = CARDS_COUNT_PER_STEP;

    const loadMoreButton = new LoadButtonView();
    render(filmList, loadMoreButton.getElement(), renderPosition.BEFOREEND);

    loadMoreButton.getElement().addEventListener(`click`, (evt) => {

      evt.preventDefault();
      listCards
        .slice(renderedCardsCount, renderedCardsCount + CARDS_COUNT_PER_STEP)
        .forEach((listCard) => renderCard(filmContainer, listCard));
      renderedCardsCount += CARDS_COUNT_PER_STEP;

      if (renderedCardsCount >= listCards.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });
  }
};

renderList(siteMain, cards);

const statistics = siteFooter.querySelector(`.footer__statistics`);
const filmCount = createNumberOfFilms();

render(statistics, new StatisticsView(filmCount).getElement(), renderPosition.BEFOREEND);
