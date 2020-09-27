import AbstractView from "./abstract.js";
import {
  humanizePopupReleaseDate
} from "../utils/card.js";

const createCommentList = (card) => {
  const {
    comments
  } = card;

  const createCommentsList = (commentsArray) => {
    let list = [];

    commentsArray.map((comment) => {
      const {
        text,
        emotion,
        author,
        date
      } = comment;

      const releaseDate = humanizePopupReleaseDate(date);

      let item = (`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${releaseDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
      list.push(item);
    });

    const commentList = list.join(``);
    return commentList;
  };

  const comment = createCommentsList(comments);

  return (
    `<ul class="film-details__comments-list">
    ${comment}
  </ul>`
  );
};


const createCommentNew = () => {
  return (
    `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label"></div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`
  );
};

const createComments = (card) => {
  const {
    comments
  } = card;

  const commentsCount = comments.length;
  const commentList = createCommentList(card);
  const commentNew = createCommentNew();

  return (
    `<div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
          ${commentList}
          ${commentNew}
        </section>
      </div>`
  );
};

export default class DetailsComments extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createComments(this._data);
  }
}
