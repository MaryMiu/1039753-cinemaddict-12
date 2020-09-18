export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizeCardReleaseDate = (releaseDate) => {
  return releaseDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

export const humanizePopupReleaseDate = (releaseDate) => {
  return releaseDate.toLocaleString(`en-US`, {hour12: false});
};

export const groupNumber = (number) => {
  return number.toLocaleString(`ru-RU`);
};