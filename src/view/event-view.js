import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';


const createEventDateTemplate = ({dateFrom}) => {
  const className = dayjs(dateFrom).format('YYYY-MM-DD');
  const innerText = dayjs(dateFrom).format('MMM DD');

  return `<time class="event__date" datetime="${className}">${innerText}</time>`;
};


const createEventScheduleTemplate = ({dateFrom, dateTo}) => {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);

  const diffInMinutes = endTime.diff(startTime, 'minute');
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  const formattedDuration = `${hours}H ${minutes}M`;

  return `
      <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTime.format('YYYY-MM-DDTHH:mm')}">${startTime.format('HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTime.format('YYYY-MM-DDTHH:mm')}">${endTime.format('HH:mm')}</time>
          </p>
          <p class="event__duration">${formattedDuration}</p>
        </div>
    `;
};


const createOffersTemplate = (offers) =>
  offers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');


const createEventTemplate = (event) => {
  const {type, offers, destination: {name: destinationName}, basePrice, isFavorite} = event;
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        ${createEventDateTemplate(event)}
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationName}</h3>
        ${createEventScheduleTemplate(event)}
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(offers)}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};


export default class EventView extends AbstractView {
  #event = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;


  constructor({event, onEditClick, onFavoriteClick}) {
    super();
    this.#event = event;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#setEventListeners();
  }


  get template() {
    return createEventTemplate(this.#event);
  }


  #setEventListeners() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }


  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
