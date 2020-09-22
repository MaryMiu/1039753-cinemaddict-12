
export const humanizeCardReleaseDate = (releaseDate) => {
  return releaseDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

export const humanizePopupReleaseDate = (releaseDate) => {
  return releaseDate.toLocaleString(`en-US`, {hour12: false});
};

export const groupNumber = (number) => {
  return number.toLocaleString(`ru-RU`);
};
