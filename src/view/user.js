const checkProfileName = (number) => {
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

export const createUserBar = (filters) => {
  const watchlistArray = filters.filter((filter) => filter.title === `Watchlist`);
  const profileName = checkProfileName(watchlistArray[0].count);

  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${profileName}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `);
};
