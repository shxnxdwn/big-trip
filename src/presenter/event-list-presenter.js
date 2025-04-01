import AddEventView from '../view/add-event-view';
import EditEventView from '../view/edit-event-view';
import SortView from '../view/sort-view';
import TripEventView from '../view/trip-event-view';
import TripListView from '../view/trip-list-view';
import {render} from '../framework/render';


export default class EventListPresenter {
  #container = null;
  #eventListModel = null;
  #eventList = null;
  #tripListElement = new TripListView();

  constructor({container, eventListModel}) {
    this.#container = container;
    this.#eventListModel = eventListModel;
  }

  init() {
    this.#eventList = [...this.#eventListModel.eventList];

    render(new SortView(), this.#container);
    render(this.#tripListElement, this.#container);
    render(new AddEventView({tripEvent: this.#eventList[0]}), this.#tripListElement.element);
    render(new EditEventView({tripEvent: this.#eventList[1]}), this.#tripListElement.element);

    for (let i = 2; i < this.#eventList.length; i++) {
      render(new TripEventView({tripEvent: this.#eventList[i]}), this.#tripListElement.element);
    }
  }
}
