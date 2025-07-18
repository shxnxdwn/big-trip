import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import EmptyEventListView from '../view/empty-event-list-view';
import EventPresenter from './event-presenter';
import {render} from '../framework/render';
import {SortList, updateItem} from '../utils';
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
    this.#renderSort();
    this.#renderEventList();
  }


  #renderSort() {
    if (this.#sortComponent !== null) {
      this.#sortComponent.element.remove();
      this.#sortComponent = null;
    }

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#container, 'afterbegin');
  }


  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#eventList.sort(SortList.TIME);
        break;
      case SortType.PRICE:
        this.#eventList.sort(SortList.PRICE);
        break;
      default:
        this.#eventList = [...this.#sourcedEventList];
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
    if (this.#eventList.length === 0) {
      this.#renderEmptyList();
      return;
    }

    render(this.#eventListComponent, this.#container);

    this.#eventList.forEach((event) => this.#renderEvent(event));
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
    if (sortType === 'event' || sortType === 'offers') {
      return;
    }

    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderSort();
    this.#renderEventList();
  };
}
