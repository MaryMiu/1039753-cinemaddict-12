const CARDS_COUNT_PER_STEP = 5;

import SortView from "../view/sort.js";
import FilmsTitleView from "../view/films-title.js";
import NoFilmsView from "../view/no-films-title.js";
import FilmsView from "../view/films.js";
import FilmsListView from "../view/films-list.js";
import FilmsContainerView from "../view/films-container.js";
import FilmCardView from "../view/card.js";
import PopupView from "../view/card-details.js";
import CommentContainerView from "../view/comment-container.js";
import CommentListView from "../view/comment-list.js";
import CommentNewView from "../view/comment-new.js";
import LoadButtonView from "../view/load-button.js";
import {
  render,
  renderPosition,
  remove
} from "../utils/render.js";
import {
  sortDateUp,
  sortRatingUp
} from "../utils/card.js";
import {
  SortType
} from "../constants.js";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedCardsCount = CARDS_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsTitleComponent = new FilmsTitleView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._noFilmsTitleComponent = new NoFilmsView();
    this._sortComponent = new SortView();
    this._loadButton = new LoadButtonView();

    this._handleLoadMoreClick = this._handleLoadMoreClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmCards) {
    this._filmsCards = filmCards.slice();
    this._sourcedBoardCards = filmCards.slice();

    this._renderSort();

    render(this._boardContainer, this._filmsComponent, renderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, renderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortCards(sortType);
    this._clearCardsList();
    this._renderCardsList();
  }

  _sortCards(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._filmsCards.sort(sortDateUp);
        break;
      case SortType.RATING_UP:
        this._filmsCards.sort(sortRatingUp);
        break;
      default:
        this._filmsCards = this._sourcedBoardCards.slice();
    }

    this._currentSortType = sortType;
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, renderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCard(card) {
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

    const popupDetailsContainer = popupComponent.getElement().querySelector(`.form-details__top-container`);
    render(popupDetailsContainer, new CommentContainerView(card), renderPosition.BEFOREEND);

    const popupDetailsList = popupComponent.getElement().querySelector(`.film-details__comments-wrap`);
    render(popupDetailsList, new CommentListView(card), renderPosition.BEFOREEND);
    render(popupDetailsList, new CommentNewView(card), renderPosition.BEFOREEND);

    cardComponent.setClickHandler(() => {
      showPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    popupComponent.setClickHandler(() => {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._filmsContainerComponent, cardComponent, renderPosition.BEFOREEND);
  }

  _renderCards(from, to) {
    this._filmsCards
      .slice(from, to)
      .forEach((filmCard) => this._renderCard(filmCard));
  }

  _renderNoCards() {
    render(this._filmsListComponent, this._noFilmsTitleComponent, renderPosition.BEFOREEND);
  }

  _handleLoadMoreClick() {
    this._renderCards(this._renderedCardsCount, this._renderedCardsCount + CARDS_COUNT_PER_STEP);
    this._renderedCardsCount += CARDS_COUNT_PER_STEP;

    if (this._renderedCardsCount >= this._filmsCards.length) {
      remove(this._loadButton);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmsListComponent, this._loadButton, renderPosition.BEFOREEND);
    this._loadButton.setClickHandler(this._handleLoadMoreClick);
  }

  _clearCardsList() {
    this._filmsContainerComponent.getElement().innerHTML = ``;
    this._renderedCardsCount = CARDS_COUNT_PER_STEP;
  }

  _renderCardsList() {
    this._renderCards(0, Math.min(this._filmsCards.length, CARDS_COUNT_PER_STEP));

    if (this._filmsCards.length > CARDS_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {

    if (this._filmsCards.length === 0) {
      this._renderNoCards();
      return;
    }

    render(this._filmsListComponent, this._filmsTitleComponent, renderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, renderPosition.BEFOREEND);

    this._renderCardsList();
  }
}
