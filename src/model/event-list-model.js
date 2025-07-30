import {getTripEventsData, mockEventDestinations, mockEventOffers} from '../mock/events';


export default class EventListModel {
  #eventList = getTripEventsData();
  #offersList = mockEventOffers;
  #destinationsList = mockEventDestinations;

  get eventList() {
    return this.#eventList;
  }

  get offersList() {
    return this.#offersList;
  }

  get destinationsList() {
    return this.#destinationsList;
  }
}
