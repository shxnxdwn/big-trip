import {getRandomArrayElement} from '../utils';


const mockEventTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];


const mockEventDestinations = [
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


const mockEventOffers = [
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


const mockEvents = [
  {
    type: getRandomArrayElement(mockEventTypes),
    destination: getRandomArrayElement(mockEventDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '100',
    offers: [
      getRandomArrayElement(mockEventOffers),
      getRandomArrayElement(mockEventOffers),
    ],
    isFavorite: false
  },
  {
    type: getRandomArrayElement(mockEventTypes),
    destination: getRandomArrayElement(mockEventDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '50',
    offers: [
      getRandomArrayElement(mockEventOffers),
      getRandomArrayElement(mockEventOffers),
    ],
    isFavorite: true
  },
  {
    type: getRandomArrayElement(mockEventTypes),
    destination: getRandomArrayElement(mockEventDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '300',
    offers: [
      getRandomArrayElement(mockEventOffers),
      getRandomArrayElement(mockEventOffers),
    ],
    isFavorite: false
  },
  {
    type: getRandomArrayElement(mockEventTypes),
    destination: getRandomArrayElement(mockEventDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '500',
    offers: [
      getRandomArrayElement(mockEventOffers),
      getRandomArrayElement(mockEventOffers),
    ],
    isFavorite: false
  },
  {
    type: getRandomArrayElement(mockEventTypes),
    destination: getRandomArrayElement(mockEventDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '200',
    offers: [
      getRandomArrayElement(mockEventOffers),
      getRandomArrayElement(mockEventOffers),
    ],
    isFavorite: false
  },
  {
    type: getRandomArrayElement(mockEventTypes),
    destination: getRandomArrayElement(mockEventDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '300',
    offers: [
      getRandomArrayElement(mockEventOffers),
      getRandomArrayElement(mockEventOffers),
    ],
    isFavorite: true
  },
  {
    type: getRandomArrayElement(mockEventTypes),
    destination: getRandomArrayElement(mockEventDestinations),
    duration: {
      start: new Date('2025-04-20 10:00:00'),
      end: new Date('2025-05-20 20:00:00')
    },
    cost: '100',
    offers: [
      getRandomArrayElement(mockEventOffers),
      getRandomArrayElement(mockEventOffers),
    ],
    isFavorite: true
  }
];

export const getRandomTripEvent = () => getRandomArrayElement(mockEvents);
