const capitalizeFirstLetter = (string) => string.at(0).toUpperCase() + string.slice(1);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const filterList = {
  // TODO: make filters
  everything: (eventTripList) => eventTripList,
  future: (eventTripList) => eventTripList.filter(() => 0),
  present: (eventTripList) => eventTripList.filter(() => 0),
  past: (eventTripList) => eventTripList.filter(() => 0)
};

export {capitalizeFirstLetter, getRandomArrayElement, filterList};
