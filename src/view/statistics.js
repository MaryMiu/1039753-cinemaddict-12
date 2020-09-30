import {
  convertMinutesToHours,
  checkProfileName
} from '../utils/common.js';
import SmartView from './smart.js';
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Period
} from '../constants.js';

const BAR_HEIGHT = 50;

const renderStatistics = (statisticCtx, genres, countByGenre) => {
  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: countByGenre,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

};

const createStatisticsRank = (count) => {
  const status = checkProfileName(count);

  return (`<p class="statistic__rank">
            Your rank
              <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              <span class="statistic__rank-label">${status}</span>
            </p>`);
};

const createStatisticsTemplate = (period, watchedFilms, favoriteGenre = ``, rank) => {
  const count = watchedFilms.length;
  const rankTemplate = createStatisticsRank(count);
  const totalMinutesRuntime = watchedFilms.reduce((num, film) => film.runtime + num, 0);
  const watchTime = convertMinutesToHours(totalMinutesRuntime);
  const hours = watchTime.hours;
  const minutes = watchTime.minutes;

  return (`<section class="statistic">
  ${rank ? rankTemplate : ``}

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${Period.ALLTIME}"
    ${Period.ALLTIME === period ? `checked` : ``}>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${Period.TODAY}" ${Period.TODAY === period ? `checked` : ``}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${Period.WEEK}" ${Period.WEEK === period ? `checked` : ``}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${Period.MONTH}" ${Period.MONTH === period ? `checked` : ``}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${Period.YEAR}" ${Period.YEAR === period ? `checked` : ``}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${count} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${favoriteGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`);
};

export default class Statistics extends SmartView {
  constructor(period, films, rank) {
    super();

    this._films = films;
    this._period = period;
    this._rank = rank;

    this._setCharts();
    this._periodClickHandler = this._periodClickHandler.bind(this);
  }

  _setCharts() {
    this._calculateUserStatistics(this._films);
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    renderStatistics(statisticCtx, this._genres, this._countByGenre);
  }

  getTemplate() {
    return createStatisticsTemplate(this._period, this._films, this._favoriteGenre, this._rank);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _calculateUserStatistics(watchedFilms) {
    const countFilmsGenres = new Map();
    let genres = new Set();

    watchedFilms.forEach((film) => {
      genres.add(...film.genres);
    });
    genres.delete(undefined);
    genres = [...genres];

    const countByGenre = genres.map((genre) => {
      const count = watchedFilms.filter((film) => film.genres.includes(genre)).length;
      countFilmsGenres.set(count, genre);

      return count;
    });

    const maxCount = Math.max(...countByGenre);
    const favoriteGenre = countFilmsGenres.get(maxCount);

    this._genres = genres;
    this._favoriteGenre = favoriteGenre;
    this._countByGenre = countByGenre;
  }

  _periodClickHandler(event) {
    this._callback.clickPeriod(event.target.value);
  }

  setClickPeriodHandler(callback) {
    this._callback.clickPeriod = callback;
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._periodClickHandler.bind(this));
  }
}
