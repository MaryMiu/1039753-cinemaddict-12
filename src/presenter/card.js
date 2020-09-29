import FilmCardView from "../view/film-card.js";
import PopupView from "../view/film-details.js";
import {UserAction, UpdateType} from "../constants.js";

import {
  render,
  renderPosition,
  replace,
  remove
} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  ACTIVE: `ACTIVE`
};

export default class Card {
  constructor(cardListContainer, changeData, changeMode) {
    this._cardListContainer = cardListContainer;
    this._popupContainer = document.body;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleShowPopupClick = this._handleShowPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleAddToWatchClick = this._handleAddToWatchClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEmojiClick = this._handleEmojiClick.bind(this);
    this._handleCardUpdate = this._handleCardUpdate.bind(this);
  }

  init(card) {
    this._card = card;

    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;

    this._cardComponent = new FilmCardView(card);
    this._popupComponent = new PopupView(card);

    this._cardComponent.setShowPopupClickHandler(this._handleShowPopupClick);
    this._cardComponent.setAddToWatchClickHandler(this._handleAddToWatchClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popupComponent.setClosePopupClickHandler(this._handleClosePopupClick);

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this._cardListContainer, this._cardComponent, renderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT || this._mode === Mode.ACTIVE) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._mode === Mode.ACTIVE) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removePopup();
    }
  }

  _handleShowPopupClick() {
    this._showPopup();
  }

  _handleClosePopupClick(card) {
    this._handleCardUpdate(card);
  }

  _handleAddToWatchClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({},
            this._card, {
              isWatchlist: !this._card.isWatchlist
            }
        )
    );
  }
  _handleWatchedClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({},
            this._card, {
              isHistory: !this._card.isHistory
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({},
            this._card, {
              isFavorites: !this._card.isFavorites
            }
        )
    );
  }

  _handleCardUpdate(card) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        card
    );
    this._removePopup();
  }

  _handleEmojiClick(evt) {
    const label = evt.target.closest(`.film-details__emoji-label`);
    const emoji = label.getAttribute(`for`).replace(`emoji-`, ``);
    const containerEmoji = document.querySelector(`.film-details__add-emoji-label`);
    containerEmoji.innerHTML = `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji">`;
  }

  _showPopup() {
    render(this._popupContainer, this._popupComponent.getElement(), renderPosition.BEFOREEND);
    this._popupComponent.restoreHandlers();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.ACTIVE;
  }

  _removePopup() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removePopup();
    }
  }
}
