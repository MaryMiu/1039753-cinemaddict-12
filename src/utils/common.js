export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const convertMinutesToHours = (currentMinutes) => {
  const minutes = currentMinutes % 60;
  const hours = (currentMinutes - minutes) / 60;

  return {hours, minutes};
};

export const checkProfileName = (number) => {
  if (number === 0) {
    return ``;
  } else if (number >= 1 && number <= 10) {
    return `Novice`;
  } else if (number >= 11 && number <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};

