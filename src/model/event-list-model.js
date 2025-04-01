import {getRandomTripEvent} from '../mock/tasks';
import {EVENTS_COUNT} from '../constants';


export default class EventListModel {
  #eventList = Array.from({length: EVENTS_COUNT}, getRandomTripEvent);

  get eventList() {
    return this.#eventList;
  }
}
