const MAX_SYMBOL_COUNT = 140;

export const createFilmCard = (card) => {
  const {
    img,
    title,
    rating,
    releaseDate,
    runtime,
    genres,
    description,
    comments
  } = card;

  const isLongText = (text) => text.length > MAX_SYMBOL_COUNT;

  const shortDescription = isLongText(description) ?
    description.slice(0, MAX_SYMBOL_COUNT).concat(`...`) :
    description;

  const mainGenre = genres[0];

  const releaseYear = releaseDate.getFullYear();

  const commentsCount = comments.length;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
          <span class="film-card__year">${releaseYear}</span>
          <span class="film-card__duration">${runtime}</span>
          <span class="film-card__genre">${mainGenre}</span>
      </p>
      <img src="./images/posters/${img}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to
              watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as
              watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
  </article>`
  );
};
