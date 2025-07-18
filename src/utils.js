import dayjs from 'dayjs';

const capitalizeFirstLetter = (string) => string.at(0).toUpperCase() + string.slice(1);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const calcFullPrice = (event) => event.offers.length === 0 ? event.basePrice :
  event.offers.reduce((acc, current) => acc + (current.price || 0), event.basePrice);

const FilterList = {
  EVERYTHING: (eventTripList) => eventTripList,
  FUTURE: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateFrom).isAfter(dayjs())),
  PRESENT: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateFrom).isBefore(dayjs()) && dayjs(event.dateTo).isAfter(dayjs())),
  PAST: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateTo).isBefore(dayjs()))
};

const SortList = {
  TIME: (a, b) => (dayjs(b.dateTo) - dayjs(b.dateFrom)) - (dayjs(a.dateTo) - dayjs(a.dateFrom)),
  PRICE: (a, b) => calcFullPrice(b) - calcFullPrice(a)
};

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);


export {capitalizeFirstLetter, getRandomArrayElement, FilterList, SortList, updateItem};
