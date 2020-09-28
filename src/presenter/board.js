const CARDS_COUNT_PER_STEP = 5;

import SortView from "../view/sort.js";
import FilmsTitleView from "../view/films-title.js";
import NoFilmsView from "../view/no-films-title.js";
import FilmsView from "../view/films-main.js";
import FilmsListView from "../view/films-list.js";
import FilmsContainerView from "../view/films-container.js";
import CardPresenter from "./card.js";
import LoadMoreButtonView from "../view/load-button.js";
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
  SortType,
  UpdateType,
  UserAction
} from "../constants.js";
import {filter} from "../utils/filter.js";

export default class Board {
  constructor(boardContainer, filmsModel, commentsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._cardPresenter = {};

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsTitleComponent = new FilmsTitleView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._noFilmsTitleComponent = new NoFilmsView();

    this._handleLoadMoreClick = this._handleLoadMoreClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const cards = this._filmsModel.getFilms();
    const filtredCards = filter[filterType](cards);
    switch (this._currentSortType) {
      case SortType.DATE_UP:
        return filtredCards.sort(sortDateUp);
      case SortType.RATING_UP:
        return filtredCards.sort(sortRatingUp);
    }
    return filtredCards;
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._cardPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({
          resetRenderedCardCount: true,
          resetSortType: true
        });
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({
      resetRenderedCardCount: true
    });
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardContainer, this._sortComponent, renderPosition.BEFOREEND);
  }

  _renderCard(card) {
    const cardPresenter = new CardPresenter(this._filmsContainerComponent, this._handleViewAction, this._handleModeChange);
    cardPresenter.init(card);
    this._cardPresenter[card.id] = cardPresenter;
  }

  _renderCards(films) {
    films.forEach((film) => this._renderCard(film));
  }

  _renderNoCards() {
    render(this._filmsListComponent, this._noFilmsTitleComponent, renderPosition.BEFOREEND);
  }

  _handleLoadMoreClick() {
    const cardCount = this._getFilms().length;
    const newRenderedCardsCount = Math.min(cardCount, this._renderedCardCount + CARDS_COUNT_PER_STEP);
    const cards = this._getFilms().slice(this._renderedCardCount, newRenderedCardsCount);

    this._renderCards(cards);
    this._renderedCardCount = newRenderedCardsCount;

    if (this._renderedCardCount >= cardCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreClick);
    render(this._filmsListComponent, this._loadMoreButtonComponent, renderPosition.BEFOREEND);
  }

  _clearCardsList() {
    Object
      .values(this._cardPresenter)
      .forEach((card) => card.destroy());
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
  }

  _clearBoard({
    resetRenderedCardCount = false,
    resetSortType = false
  } = {}) {
    const cardCount = this._getFilms().length;

    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmsTitleComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedCardCount) {
      this._renderedCardCount = CARDS_COUNT_PER_STEP;
    } else {
      this._renderedCardCount = Math.min(cardCount, this._renderedCardCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderCardsList() {
    const cardCount = this._getFilms().length;
    const cards = this._getFilms().slice(0, Math.min(cardCount, CARDS_COUNT_PER_STEP));

    this._renderCards(cards);

    if (cardCount > CARDS_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    const cards = this._getFilms();
    const cardCount = cards.length;

    this._renderSort();

    render(this._boardContainer, this._filmsComponent, renderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, renderPosition.BEFOREEND);

    if (cardCount === 0) {
      this._renderNoCards();
      return;
    }

    render(this._filmsListComponent, this._filmsTitleComponent, renderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, renderPosition.BEFOREEND);

    this._renderCards(cards.slice(0, Math.min(cardCount, this._renderedCardCount)));

    if (cardCount > this._renderedCardCount) {
      this._renderLoadMoreButton();
    }
  }
}
