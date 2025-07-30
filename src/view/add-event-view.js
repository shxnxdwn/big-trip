import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {BLANK_EVENT} from '../constants';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';


const createEventTypeListTemplate = (currentType) => `
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      <div class="event__type-item">
        <input id="event-type-taxi-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="taxi" ${currentType === 'taxi' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-new">Taxi</label>
      </div>
       <div class="event__type-item">
        <input id="event-type-bus-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="bus" ${currentType === 'bus' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--bus" for="event-type-bus-new">Bus</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-train-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="train" ${currentType === 'train' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--train" for="event-type-train-new">Train</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-ship-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="ship" ${currentType === 'ship' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--ship" for="event-type-ship-new">Ship</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-drive-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="drive" ${currentType === 'drive' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--drive" for="event-type-drive-new">Drive</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-flight-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="flight" ${currentType === 'flight' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--flight" for="event-type-flight-new">Flight</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-check-in-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="check-in" ${currentType === 'check-in' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-new">Check-in</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-sightseeing-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="sightseeing" ${currentType === 'sightseeing' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-new">Sightseeing</label>
      </div>
      <div class="event__type-item">
        <input id="event-type-restaurant-new" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="restaurant" ${currentType === 'restaurant' ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-new">Restaurant</label>
      </div>
    </fieldset>
  </div>
`;


const createEventTypeTemplate = ({type}) => `
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-new">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-new" type="checkbox">
    ${createEventTypeListTemplate(type)}
  </div>
`;


const createEventDestinationTemplate = (type, destination, allDestinations) => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-new">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-new" type="text"
           name="event-destination" value="${destination?.name || ''}" list="destination-list-new" required>
    <datalist id="destination-list-new">
      ${allDestinations.map((dest) => `<option value="${dest.name}"></option>`).join('')}
    </datalist>
  </div>`;


const createEventDurationTemplate = ({dateFrom, dateTo}) => {
  const startTime = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const endTime = dayjs(dateTo).format('DD/MM/YY HH:mm');
  return `
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-new">From</label>
        <input class="event__input  event__input--time" id="event-start-time-new" type="text" name="event-start-time" value="${startTime}">
        —
        <label class="visually-hidden" for="event-end-time-new">To</label>
        <input class="event__input  event__input--time" id="event-end-time-new" type="text" name="event-end-time" value="${endTime}">
      </div>`;
};


const createEventPriceTemplate = ({basePrice}) => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-new">
      <span class="visually-hidden">Price</span>
      €
    </label>
    <input class="event__input  event__input--price" id="event-price-new" type="number" name="event-price" value="${basePrice}" min="0">
  </div>
`;


const createEventOffersTemplate = (availableOffers, checkedOffers) => {
  if (!availableOffers || availableOffers.length === 0) {
    return '';
  }

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${availableOffers.map((offer) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${offer.id}-new" type="checkbox" name="event-offer" value="${offer.id}" ${checkedOffers.includes(offer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="${offer.id}-new">
              <span class="event__offer-title">${offer.title}</span>
              +€
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('')}
      </div>
    </section>`;
};


const createEventDetailsTemplate = (destination, availableOffers, checkedOffers) => {
  const destinationInfo = destination ? `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        ${destination.pictures.length > 0 ? `
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}"
              alt="${picture.description}">`).join('')}
            </div>
          </div>` : ''}
      </section>` : '';


  const offersInfo = createEventOffersTemplate(availableOffers, checkedOffers);


  if (!destinationInfo && !offersInfo) {
    return '';
  }


  return `
      <section class="event__details">
        ${offersInfo}
        ${destinationInfo}
      </section>`;
};


const createAddEventTemplate = (state, allDestinations, allOffers) => {
  const { type, destination, offers } = state;
  const availableOffers = allOffers.find((offer) => offer.type === type)?.offers || [];

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createEventTypeTemplate(state)}
          ${createEventDestinationTemplate(type, destination, allDestinations)}
          ${createEventDurationTemplate(state)}
          ${createEventPriceTemplate(state)}
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        ${createEventDetailsTemplate(destination, availableOffers, offers)}
      </form>
    </li>`;
};


export default class AddEventView extends AbstractStatefulView {
  #allDestinations = null;
  #allOffers = null;
  #handleSave = null;
  #handleCancel = null;
  #datepickerFrom = null;
  #datepickerTo = null;


  constructor({allDestinations, allOffers, onSave, onCancel}) {
    super();
    this._state = BLANK_EVENT;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleSave = onSave;
    this.#handleCancel = onCancel;

    this._restoreHandlers();
  }


  get template() {
    return createAddEventTemplate(this._state, this.#allDestinations, this.#allOffers);
  }


  removeElement() {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }


  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#saveHandler);
    this.element.querySelector('form').addEventListener('reset', this.#cancelHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offerChangeHandler);
    }

    this.#setDatepickers();
  }


  #setDatepickers() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-new'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
      },
    );


    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-new'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #saveHandler = (evt) => {
    evt.preventDefault();
    if (!this._state.destination) {
      return;
    }

    this.#handleSave(this._state);
  };


  #cancelHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancel();
  };


  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };


  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.#allDestinations.find((destintaion) => destintaion.name === evt.target.value);
    this.updateElement({
      destination: newDestination ? { ...newDestination, id: newDestination.id } : null
    });
  };


  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'))
      .map((item) => item.value);

    this._setState({
      offers: checkedOffers
    });
  };


  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: parseInt(evt.target.value, 10) || 0,
    });
  };


  #dateFromChangeHandler = ([userDate]) => {
    this._setState({ dateFrom: userDate.toISOString() });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };


  #dateToChangeHandler = ([userDate]) => {
    this._setState({ dateTo: userDate.toISOString() });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };
}
