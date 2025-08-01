const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};


const EmptyEventListMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now'
};


const BLANK_EVENT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  offers: [],
  type: 'flight'
};


export {SortType, BLANK_EVENT, EmptyEventListMessages};
