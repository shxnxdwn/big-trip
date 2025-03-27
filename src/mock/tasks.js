import {getRandomArrayElement} from '../utils/get-random-array-element';


const tripTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];


const tripDestinations = [
  {
    'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=1',
        'description': 'Chamonix parliament building'
      }
    ]
  },
  {
    'description': 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=2',
        'description': 'Amsterdam parliament building'
      }
    ]
  },
  {
    'description': 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Geneva',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=3',
        'description': 'Geneva parliament building'
      }
    ]
  }
];


const tripOffers = [
  {
    title: 'Add luggage',
    price: 30
  },
  {
    title: 'Switch to comfort class',
    price: 100
  },
  {
    title: 'Add meal',
    price: 15
  },
  {
    title: 'Choose seats',
    price: 5
  },
  {
    title: 'Travel by train',
    price: 40
  }
];


const tripPoints = [
  {
    type: getRandomArrayElement(tripTypes),
    destination: getRandomArrayElement(tripDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '€100',
    offers: getRandomArrayElement(tripOffers),
    isFavorite: false
  },
  {
    type: getRandomArrayElement(tripTypes),
    destination: getRandomArrayElement(tripDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '€100',
    offers: getRandomArrayElement(tripOffers),
    isFavorite: true
  },
  {
    type: getRandomArrayElement(tripTypes),
    destination: getRandomArrayElement(tripDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '€100',
    offers: getRandomArrayElement(tripOffers),
    isFavorite: false
  }
];

export const getTripPoints = () => tripPoints;
