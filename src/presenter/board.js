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

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedCardsCount = CARDS_COUNT_PER_STEP;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsTitleComponent = new FilmsTitleView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._noFilmsTitleComponent = new NoFilmsView();
    this._sortComponent = new SortView();
    this._loadButton = new LoadButtonView();

    this._handleLoadMoreClick = this._handleLoadMoreClick.bind(this);
  }

  init(filmCards) {
    this._filmsCards = filmCards.slice();

    this._renderSort();

    render(this._boardContainer, this._filmsComponent, renderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, renderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, renderPosition.BEFOREEND);
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
