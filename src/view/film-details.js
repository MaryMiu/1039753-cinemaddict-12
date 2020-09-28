import SmartView from "./smart.js";
import DetailsInfo from './film-details-info.js';
import DetailsComments from './film-details-comments.js';

const createPopup = (card) => {

  const filmInfo = new DetailsInfo(card).getTemplate();
  const filmComments = new DetailsComments(card).getTemplate();

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">${filmInfo}</div>
      <div class="form-details__bottom-container">${filmComments}</div>
    </form>
  </section>`
  );
};

export default class Popup extends SmartView {
  constructor(card) {
    super();
    this._data = card;

    this._closePopupСlickHandler = this._closePopupСlickHandler.bind(this);

    this._addToWatchClickHandler = this._addToWatchClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
  }

  _closePopupСlickHandler(evt) {
    evt.preventDefault();
    this._callback.clickClosePopup();
  }

  _addToWatchClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickAddToWatch();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatched();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
  }

  _emojiClickHandler(evt) {
    if (evt.target.closest(`.film-details__emoji-label`)) {
      evt.preventDefault();
      this._callback.clickEmoji(evt);
    }
  }

  setClosePopupClickHandler(callback) {
    this._callback.clickClosePopup = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupСlickHandler);
  }

  setAddToWatchClickHandler(callback) {
    this._callback.clickAddToWatch = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._addToWatchClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setEmojiClickHandler(callback) {
    this._callback.clickEmoji = callback;
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._emojiClickHandler);
  }

  getTemplate() {
    return createPopup(this._data);
  }

  restoreHandlers() {
    this.setClosePopupClickHandler(this._callback.clickClosePopup);
    this.setAddToWatchClickHandler(this._callback.clickAddToWatch);
    this.setWatchedClickHandler(this._callback.clickWatched);
    this.setFavoriteClickHandler(this._callback.clickFavorite);
    this.setEmojiClickHandler(this._callback.clickEmoji);
  }

  // static parseCardToData(card) {
  //   return Object.assign({},
  //       card
  //   );
  // }
}
