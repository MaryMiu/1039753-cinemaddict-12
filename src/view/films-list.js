import AbstractView from "./abstract.js";

const createFilmList = () => {
  return (
    `<section class="films-list">
    </section>`
  );
};
export default class FilmList extends AbstractView {
  getTemplate() {
    return createFilmList();
  }
}
