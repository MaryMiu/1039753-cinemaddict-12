import {
  createElement
} from "../utils.js";

const createCommentContainer = (card) => {
  const {
    comments
  } = card;

  const commentsCount = comments.length;
  return (
    `<div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

        </section>
      </div>`
  );
};

export default class CommentContainer {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCommentContainer(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
