import moment from "moment";

export const formatFilmRuntime = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const durationHours = `${duration.hours() > 0 ? `${duration.hours()}h` : ``}`;
  const durationMinutes = `${duration.minutes() > 0 ? `${duration.minutes()}m` : ``}`;

  return `${durationHours} ${durationMinutes}`;
};

export const formatFilmDate = (dateTime, dateType) => {
  return moment(dateTime).format(dateType);
};

export const formatCommentDate = (date) => {
  return moment(date).fromNow();
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


