import dayjs from 'dayjs';

const capitalizeFirstLetter = (string) => string.at(0).toUpperCase() + string.slice(1);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const FilterList = {
  EVERYTHING: (eventTripList) => eventTripList,
  FUTURE: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateFrom).isAfter(dayjs())),
  PRESENT: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateFrom).isBefore(dayjs()) && dayjs(event.dateTo).isAfter(dayjs())),
  PAST: (eventTripList) => eventTripList.filter((event) => dayjs(event.dateTo).isBefore(dayjs()))
};

export {capitalizeFirstLetter, getRandomArrayElement, FilterList};
