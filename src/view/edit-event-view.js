import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';


const createEventTypeListTemplate = () => `
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      <div class="event__type-item">
        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
               value="taxi">
        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
               value="bus">
        <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
               value="train">
        <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
               value="ship">
        <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
               value="drive">
        <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
               value="flight">
        <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio"
               name="event-type" value="check-in">
        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio"
               name="event-type" value="sightseeing">
        <label class="event__type-label  event__type-label--sightseeing"
               for="event-type-sightseeing-1">Sightseeing</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio"
               name="event-type" value="restaurant">
        <label class="event__type-label  event__type-label--restaurant"
               for="event-type-restaurant-1">Restaurant</label>
      </div>
    </fieldset>
  </div>
`;


const createEventTypeTemplate = ({type}) => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    ${createEventTypeListTemplate()}
  </div>
`;


const createEventDestinationTemplate = ({type, destination}) => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text"
           name="event-destination" value="${destination.name}" list="destination-list-1">
    <datalist id="destination-list-1">
      <option value="Amsterdam"></option>
      <option value="Geneva"></option>
      <option value="Chamonix"></option>
    </datalist>
  </div>`;


const createEventDurationTemplate = ({dateFrom, dateTo}) => {
  const startTime = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const endTime = dayjs(dateTo).format('DD/MM/YY HH:mm');

  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
             value="${startTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
             value="${endTime}">
    </div>`;
};


const createEventPriceTemplate = ({basePrice}) => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro; ${basePrice}
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
  </div>
`;


const createEventOffersTemplate = ({offers}) => `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">

    ${offers.map((offer) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox"
               name="event-offer-luggage">
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')}
    </div>
  </section>
`;


const createEventDestinationInfoTemplate = ({destination: {description}}) => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
  </section>
`;


const createEditEventTemplate = (event) => `
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${createEventTypeTemplate(event)}

      ${createEventDestinationTemplate(event)}

      ${createEventDurationTemplate(event)}

      ${createEventPriceTemplate(event)}

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
      ${createEventOffersTemplate(event)}

      ${createEventDestinationInfoTemplate(event)}
    </section>
  </form>
</li>
`;


export default class EditEventView extends AbstractView {
  #event = null;
  #handleFormSubmit = null;
  #handleCloseButtonClick = null;

  constructor({event, onFormSubmit, onClickCloseButton}) {
    super();
    this.#event = event;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseButtonClick = onClickCloseButton;
    this.#setEventListeners();
  }

  get template() {
    return createEditEventTemplate(this.#event);
  }

  #setEventListeners() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#clickSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickCloseButtonHandler);
  }

  #clickSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #clickCloseButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseButtonClick();
  };
}
