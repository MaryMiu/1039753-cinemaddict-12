import {
  getRandomInteger
} from "../utils/common.js";

import {
  generateComment
} from "./comment.js";

const MIN_YEAR = 1994;
const MAX_YEAR = 2020;
const MIN_MONTH = 0;
const MAX_MONTH = 11;
const MIN_DAY = 1;
const MAX_DAY = 31;
const MAX_COMMENTS_COUNT = 5;
const MAX_MINUTES = 300;
const MIN_DESCRIPTION_COUNT = 1;
const MAX_DESCRIPTION_COUNT = 5;
const MIN_WRITERS_COUNT = 1;
const MAX_WRITERS_COUNT = 2;
const MIN_ACTORS_COUNT = 2;
const MAX_ACTORS_COUNT = 3;

const generateTitle = () => {
  const titles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Man with the Golden Arm`,
    `The Great Flamarion`,
    `Santa Claus Conquers the Martians`
  ];

  return titles[getRandomInteger(0, titles.length - 1)];
};

const generateImg = () => {
  const images = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

  return images[getRandomInteger(0, images.length - 1)];
};

const generateDescription = () => {
  const text = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  let description = [];
  let count = getRandomInteger(MIN_DESCRIPTION_COUNT, MAX_DESCRIPTION_COUNT);

  for (let i = 0; i < count; i++) {
    const fragment = text[getRandomInteger(0, text.length - 1)];
    description.push(fragment);
  }

  return description.join(` `);
};

const generateRating = () => {
  return `${getRandomInteger(0, 9)}.${getRandomInteger(0, 9)}`;
};

const generateDirectorName = () => {
  const directorList = [
    `Anthony Mann`,
    `Christopher Nolan`,
    `Lav Diaz`,
    `James Cameron`,
    `Gaspar Noe`,
    `Wes Anderson`,
  ];

  return directorList[getRandomInteger(0, directorList.length - 1)];
};

const generateWriterName = () => {
  const writerList = [
    `Billy Wilder`,
    `Joel Coen`,
    `Ethan Jesse Coen`,
    `Robert Towne`,
    `Quentin Tarantino`,
    `Francis Ford Coppola`,
    `William Goldman`,
    `Charlie Kaufman`,
  ];

  let writers = [];
  let count = getRandomInteger(MIN_WRITERS_COUNT, MAX_WRITERS_COUNT);

  for (let i = 0; i < count; i++) {
    const fragment = writerList[getRandomInteger(0, writerList.length - 1)];
    writers.push(fragment);
  }

  return writers.join(`, `);
};

const generateActorsName = () => {
  const actorsList = [
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`,
    `Philip Pavel`,
    `John G. Pavelec`,
    `Sharrieff Pugh`,
    `Antone Pagan`,
    `Victor Pagan`
  ];

  let actors = [];
  let count = getRandomInteger(MIN_ACTORS_COUNT, MAX_ACTORS_COUNT);

  for (let i = 0; i < count; i++) {
    const fragment = actorsList[getRandomInteger(0, actorsList.length - 1)];
    actors.push(fragment);
  }

  return actors.join(`, `);
};

const generateReleaseDate = () => {
  const currentTime = new Date();
  const year = getRandomInteger(MIN_YEAR, MAX_YEAR);
  const month = getRandomInteger(MIN_MONTH, MAX_MONTH);
  const day = getRandomInteger(MIN_DAY, MAX_DAY);

  currentTime.setFullYear(year, month, day);

  return currentTime;
};

const generateWatchingDate = () => {
  const currentTime = new Date();
  const year = getRandomInteger(MIN_YEAR, MAX_YEAR);
  const month = getRandomInteger(MIN_MONTH, MAX_MONTH);
  const day = getRandomInteger(MIN_DAY, MAX_DAY);

  currentTime.setFullYear(year, month, day);

  return currentTime;
};

const generateRuntime = () => {
  const minutes = getRandomInteger(0, MAX_MINUTES);
  return minutes;
};

const generateCountry = () => {
  const country = [
    `USA`,
    `England`,
    `Germany`,
    `Italy`,
    `Sweden`,
    `Spain`
  ];

  return country[getRandomInteger(0, country.length - 1)];
};

const generateGenre = () => {
  const genres = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`
  ];

  let genresList = [];

  const count = getRandomInteger(1, 3);

  for (let i = 0; i < count; i++) {
    const fragment = genres[getRandomInteger(0, genres.length - 1)];
    genresList.push(fragment);
  }

  return genresList;
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateComments = () => {
  const count = getRandomInteger(0, MAX_COMMENTS_COUNT);
  const comments = new Array(count).fill().map(generateComment);
  return comments;
};

const generateMaxAge = () => {
  const ageClassification = [0, 6, 12, 14, 16, 18];
  return ageClassification[getRandomInteger(0, ageClassification.length - 1)];
};

export const generateCard = () => {
  return {
    id: generateId(),
    img: generateImg(),
    title: generateTitle(),
    rating: generateRating(),
    director: generateDirectorName(),
    writers: generateWriterName(),
    actors: generateActorsName(),
    releaseDate: generateReleaseDate(),
    watchingDate: generateWatchingDate(),
    runtime: generateRuntime(),
    country: generateCountry(),
    genres: generateGenre(),
    description: generateDescription(),
    comments: generateComments(),
    maxAge: generateMaxAge(),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1))
  };
};
