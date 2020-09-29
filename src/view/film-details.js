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
    this._data = Popup.parseCardToData(card);

    this._closePopupСlickHandler = this._closePopupСlickHandler.bind(this);

    this._addToWatchClickHandler = this._addToWatchClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._emojiClickHandler = this._emojiClickHandler.bind(this);

    this._setInnerHandlers();
  }

  _closePopupСlickHandler(evt) {
    evt.preventDefault();
    this._callback.clickClosePopup(Popup.parseDataToCard(this._data));
  }

  _addToWatchClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatchlist: !this._data.isWatchlist
    });
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isHistory: !this._data.isHistory
    });
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorites: !this._data.isFavorites
    });
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

  setEmojiClickHandler(callback) {
    this._callback.clickEmoji = callback;
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._emojiClickHandler);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._addToWatchClickHandler);

    this.getElement()
      .querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);

    this.getElement()
      .querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  getTemplate() {
    return createPopup(this._data);
  }

  restoreHandlers() {
    this.setClosePopupClickHandler(this._callback.clickClosePopup);
    this._setInnerHandlers();
    this.setEmojiClickHandler(this._callback.clickEmoji);
  }

  static parseCardToData(card) {
    return Object.assign({}, card);
  }

  static parseDataToCard(data) {
    data = Object.assign({}, data);
    return data;
  }
}
