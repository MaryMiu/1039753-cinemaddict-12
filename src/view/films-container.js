import AbstractView from "./abstract.js";

const createFilmContainer = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};
export default class FilmContainer extends AbstractView {
  getTemplate() {
    return createFilmContainer();
  }
}
