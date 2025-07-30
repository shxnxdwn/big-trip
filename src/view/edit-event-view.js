import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
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
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
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


const createEventDestinationInfoTemplate = ({destination: {description, pictures}}) => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo"/>`).join('')}
      </div>
    </div>
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


export default class EditEventView extends AbstractStatefulView {
  #event = null;
  #handleFormSubmit = null;
  #handleCloseButtonClick = null;
  #allDestinations = null;
  #allOffers = null;
  #flatpickrStart = null;
  #flatpickrEnd = null;


  constructor({event, allDestinations, allOffers, onFormSubmit, onClickCloseButton}) {
    super();
    this._setState(EditEventView.parseEventToState(event));
    this.#event = event;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseButtonClick = onClickCloseButton;
    this._restoreHandlers();
  }


  get template() {
    return createEditEventTemplate(this._state);
  }


  removeElement() {
    super.removeElement();

    if (this.#flatpickrStart) {
      this.#flatpickrStart.destroy();
      this.#flatpickrStart = null;
    }

    if (this.#flatpickrEnd) {
      this.#flatpickrEnd.destroy();
      this.#flatpickrEnd = null;
    }
  }


  reset() {
    // this.updateElement();
    // TODO: END
  }


  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#clickSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickCloseButtonHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#changePriceHandler);

    this.#setFlatpickrStart();
    this.#setFlatpickrEnd();
  }


  #setFlatpickrStart() {
    this.#flatpickrStart = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#changeDateFromHandler
      });
  }


  #setFlatpickrEnd() {
    this.#flatpickrStart = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#changeDateToHandler
      });
  }


  #clickSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditEventView.parseStateToEvent(this.#event));
  };


  #clickCloseButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseButtonClick(EditEventView.parseStateToEvent(this.#event));
  };


  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    const typeOffers = this.#allOffers.find((item) => item.type === targetType).offers;

    this.updateElement({type: targetType, offers: typeOffers});
  };


  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === currentDestination);

    this.updateElement({destination: newDestination});
  };


  #changePriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({basePrice: evt.target.value});
  };


  #changeDateFromHandler = ([userDate]) => {
    this._setState({dateFrom: userDate});
  };


  #changeDateToHandler = ([userDate]) => {
    this._setState({dateTo: userDate});
  };


  static parseEventToState(event) {
    return {
      ...event,
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};

    return event;
  }
}
