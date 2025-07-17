import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import EmptyEventListView from '../view/empty-event-list-view';
import EventPresenter from './event-presenter';
import {render} from '../framework/render';
import {updateItem} from '../utils';
import {SortType} from '../constants';


export default class EventListPresenter {
  #container = null;
  #eventListModel = null;
  #eventList = [];
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sourcedEventList = [];
  #eventListComponent = new EventListView();
  #emptyEventListComponent = new EmptyEventListView();
  #eventPresenters = new Map();


  constructor({container, eventListModel}) {
    this.#container = container;
    this.#eventListModel = eventListModel;
  }


  init() {
    this.#eventList = [...this.#eventListModel.eventList];
    this.#sourcedEventList = [...this.#eventListModel.eventList];
    this.#renderEventList();
  }


  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortChange
    });

    render(this.#sortComponent, this.#container);
  }


  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.EVENT:
      case SortType.TIME:
      case SortType.PRICE:
      case SortType.OFFERS:
      default:
        this.#eventList = this.#sourcedEventList;
    }

    this.#currentSortType = sortType;
  }


  #renderEmptyList() {
    render(this.#emptyEventListComponent, this.#eventListComponent.element);
  }


  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
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
    this.#sourcedEventList = updateItem(this.#sourcedEventList, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };


  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleSortChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
  };
}
