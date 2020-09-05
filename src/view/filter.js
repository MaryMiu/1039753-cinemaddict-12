const createFilterItemTemplate = (filter) => {
  const {
    title,
    count
  } = filter;

  return (`
    <a href="#${title}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>
  `);
};


export const createFilter = (filters) => {
  const filterItemsTemplate = filters
    .filter((filter) => filter.title !== `all`).map((filter) => createFilterItemTemplate(filter))
    .join(``);

  return `<div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterItemsTemplate}
    </div>`;
};
