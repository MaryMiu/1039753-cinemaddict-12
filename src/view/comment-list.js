import {
  humanizePopupReleaseDate
} from "../utils.js";

export const createCommentList = (card) => {
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
