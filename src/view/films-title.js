import AbstractView from "./abstract.js";

const createFilmTitle = () => {
  return (
    `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
  );
};
export default class FilmTitle extends AbstractView {
  getTemplate() {
    return createFilmTitle();
  }
}
