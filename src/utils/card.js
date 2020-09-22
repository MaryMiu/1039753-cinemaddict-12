
export const humanizeCardReleaseDate = (releaseDate) => {
  return releaseDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

export const humanizePopupReleaseDate = (releaseDate) => {
  return releaseDate.toLocaleString(`en-US`, {hour12: false});
};

export const groupNumber = (number) => {
  return number.toLocaleString(`ru-RU`);
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortDateUp = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.releaseDate, cardB.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return cardB.releaseDate.getTime() - cardA.releaseDate.getTime();
};

const getWeightForNullRating = (ratingA, ratingB) => {
  if (ratingA === null && ratingB === null) {
    return 0;
  }

  if (ratingA === null) {
    return 1;
  }

  if (ratingB === null) {
    return -1;
  }

  return null;
};

export const sortRatingUp = (cardA, cardB) => {
  const weight = getWeightForNullRating(cardA.rating, cardB.rating);

  if (weight !== null) {
    return weight;
  }

  return cardB.rating - cardA.rating;
};


