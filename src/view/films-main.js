import AbstractView from "./abstract.js";

const createFilms = () => {
  return (
    `<section class="films">
  </section>`
  );
};
export default class FilmsMain extends AbstractView {
  getTemplate() {
    return createFilms();
  }
}
