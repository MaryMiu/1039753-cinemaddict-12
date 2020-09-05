const taskToFilterMap = {
  all: (tasks) => tasks.length,
  Watchlist: (tasks) => tasks.filter((task) => task.isWatchlist).length,
  History: (tasks) => tasks.filter((task) => task.isHistory).length,
  Favorites: (tasks) => tasks.filter((task) => task.isFavorites).length
};

export const generateFilter = (tasks) => {
  return Object.entries(taskToFilterMap).map(([filterName, countTasks]) => {
    return {
      title: filterName,
      count: countTasks(tasks),
    };
  });
};
