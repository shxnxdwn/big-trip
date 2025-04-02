const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];

const EmptyEventListMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now'
};

// TODO: remove or edit blanc event
const BLANK_EVENT = {
  type: 'flight',
  destination: {
    'description': 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Geneva',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=3',
        'description': 'Geneva parliament building'
      }
    ]
  },
  duration: {
    start: new Date('2019-03-19 00:00:00'),
    end: new Date('2019-03-19 00:00:00')
  },
  cost: '',
  offers: [
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
  ],
  isFavorite: false
};


export {BLANK_EVENT, FILTER_TYPES, SORT_TYPES, EmptyEventListMessages};
