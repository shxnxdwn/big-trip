import dayjs from 'dayjs';

const capitalizeFirstLetter = (string) => string.at(0).toUpperCase() + string.slice(1);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const FilterList = {
  EVERYTHING: (eventTripList) => eventTripList,
  FUTURE: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateFrom).isAfter(dayjs())),
  PRESENT: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateFrom).isBefore(dayjs()) && dayjs(event.dateTo).isAfter(dayjs())),
  PAST: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateTo).isBefore(dayjs()))
};

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);


export {capitalizeFirstLetter, getRandomArrayElement, FilterList, updateItem};
