import AbstractView from "./abstract.js";
import {
  formatFilmRuntime, formatFilmDate
} from "../utils/card.js";
import {
  DateFormats
} from "../constants.js";

const createGenresListTemplate = (genres) => {
  return genres.map((item) => `<span class="film-details__genre">${item}</span>`).join(``);
};

const createControlTemplate = (isWatchlist, isHistory, isFavorites) => {
  return (
    `<section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isHistory ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorites ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>`
  );
};

const createPopup = (card) => {
  const {
    img,
    title,
    rating,
    director,
    writers,
    actors,
    releaseDate,
    runtime,
    country,
    genres,
    description,
    maxAge,
    isWatchlist,
    isHistory,
    isFavorites
  } = card;

  const genreLabel = genres.length > 1 ? `Genres` : `Genre`;

  const genresTemplate = createGenresListTemplate(genres);
  const formatRuntime = formatFilmRuntime(runtime);
  const formatDate = formatFilmDate(releaseDate, DateFormats.DMY);
  const controls = createControlTemplate(isWatchlist, isHistory, isFavorites);

  return (
    `<div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${img}" alt="${title}">

            <p class="film-details__age">${maxAge}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatRuntime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreLabel}</td>
                <td class="film-details__cell">
                  ${genresTemplate}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        ${controls}
      </div>`
  );
};

export default class DetailsInfo extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {

    return createPopup(this._data);
  }
}
