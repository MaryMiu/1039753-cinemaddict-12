import he from "he";
import AbstractView from "./abstract.js";
import {
  formatCommentDate
} from "../utils/card.js";

const createComment = (comment) => {
  const {
    text,
    emotion,
    author,
    date
  } = comment;

  const releaseDate = formatCommentDate(date);

  return (`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${releaseDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
};

export default class DetailsComment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createComment(this._comment);
  }
}
