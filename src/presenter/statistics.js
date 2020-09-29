import moment from 'moment';
import StatisticsView from "../view/statistics.js";
import {
  render,
  renderPosition,
  replace,
  remove
} from "../utils/render.js";
import {
  Period
} from '../constants.js';

export default class Statistics {
  constructor(statisticsContainer, filmsModel) {
    this._statisticsContainer = statisticsContainer;
    this._filmsModel = filmsModel;
    this.watchedFilms = null;
    this._rank = false;

    this._statisticsComponent = null;

    this._handleStatisticsPeriodClick = this._handleStatisticsPeriodClick.bind(this);
  }

  init() {
    this.watchedFilms = this._filmsModel.getFilms().filter((film) => film.isHistory);
    this._rank = Boolean(this.watchedFilms.length);
    this._renderStatistics(null, this.watchedFilms, this._rank);
  }

  destroy() {
    remove(this._statisticsContainer);
    remove(this._statisticsComponent);
  }

  _renderStatistics(period = `all-time`, films, rank) {
    const prevStatisticsComponent = this._statisticsComponent;

    this._statisticsComponent = new StatisticsView(period, films, rank);
    this._statisticsComponent.setClickPeriodHandler(this._handleStatisticsPeriodClick);

    if (prevStatisticsComponent === null) {
      render(this._statisticsContainer, this._statisticsComponent, renderPosition.BEFOREEND);
      return;
    }

    replace(this._statisticsComponent, prevStatisticsComponent);
    remove(prevStatisticsComponent);
  }

  _handleStatisticsPeriodClick(period) {
    let films = [];
    switch (period) {
      case Period.TODAY:
        films = this._filterPeriod(this.watchedFilms, `today`);
        break;
      case Period.WEEK:
        films = this._filterPeriod(this.watchedFilms, `weeks`);
        break;
      case Period.MONTH:
        films = this._filterPeriod(this.watchedFilms, `months`);
        break;
      case Period.YEAR:
        films = this._filterPeriod(this.watchedFilms, `years`);
        break;
      default:
        films = this.watchedFilms;
    }
    this._renderStatistics(period, films, this._rank);
  }

  _filterPeriod(films, period) {
    let watchedFilms = [];
    if (period === `today`) {
      watchedFilms = films
        .filter((film) => moment(film.watchingDate)
          .isSame(moment(), `day`));
    } else {
      watchedFilms = films
        .filter((film) => moment(film.watchingDate)
          .isBetween(moment().subtract(1, period), moment(), `day`, `[]`));
    }

    return watchedFilms;
  }
}
