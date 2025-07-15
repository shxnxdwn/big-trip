import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import EmptyEventListView from '../view/empty-event-list-view';
import EventPresenter from './event-presenter';
import {render} from '../framework/render';
import {updateItem} from '../utils';


export default class EventListPresenter {
  #container = null;
  #eventListModel = null;
  #eventList = [];
  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #emptyEventListComponent = new EmptyEventListView();
  #eventPresenters = new Map();


  constructor({container, eventListModel}) {
    this.#container = container;
    this.#eventListModel = eventListModel;
  }


  init() {
    this.#eventList = [...this.#eventListModel.eventList];
    this.#renderEventList();
  }


  #renderSort() {
    render(this.#sortComponent, this.#container);
  }


  #renderEmptyList() {
    render(this.#emptyEventListComponent, this.#eventListComponent.element);
  }


  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventListComponent.element
    });

    this.#eventPresenters.set(event.id, eventPresenter);

    eventPresenter.init(event);
  }


  #renderEventList() {
    this.#renderSort();
    render(this.#eventListComponent, this.#container);

    if (this.#eventList.length === 0) {
      this.#renderEmptyList();
      return;
    }

    for (let i = 0; i < this.#eventList.length; i++) {
      this.#renderEvent(this.#eventList[i]);
    }
  }


  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }


  #handleEventChange = (updatedEvent) => {
    this.#eventList = updateItem(this.#eventList, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };
}
