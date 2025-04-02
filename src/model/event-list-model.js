import {getTripEventsData} from '../mock/events';


export default class EventListModel {
  #eventList = getTripEventsData();

  get eventList() {
    return this.#eventList;
  }
}
