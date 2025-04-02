import AddEventView from '../view/add-event-view';
import EditEventView from '../view/edit-event-view';
import SortView from '../view/sort-view';
import TripEventView from '../view/trip-event-view';
import EventListView from '../view/event-list-view';
import EmptyEventListView from '../view/empty-event-list-view';
import {render, replace} from '../framework/render';


export default class EventListPresenter {
  #container = null;
  #eventListModel = null;
  #eventList = [];
  #eventListComponent = new EventListView();

  constructor({container, eventListModel}) {
    this.#container = container;
    this.#eventListModel = eventListModel;
  }


  init() {
    this.#eventList = [...this.#eventListModel.eventList];
    this.#renderEventList();
  }


  #renderEvent(tripEvent) {
    const escapeKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeEditForm();
        document.removeEventListener('keydown', escapeKeyDownHandler);
      }
    };

    const tripEventComponent = new TripEventView({
      tripEvent,
      onEditClick: () => {
        openEditForm();
        document.addEventListener('keydown', escapeKeyDownHandler);
      }
    });

    const editEventComponent = new EditEventView({
      tripEvent,
      onFormSubmit: () => {
        closeEditForm();
        document.removeEventListener('keydown', escapeKeyDownHandler);
      },
      onClickCloseButton: () => {
        closeEditForm();
        document.removeEventListener('keydown', escapeKeyDownHandler);
      }
    });

    function openEditForm () {
      replace(editEventComponent, tripEventComponent);
    }

    function closeEditForm () {
      replace(tripEventComponent, editEventComponent);
    }

    render(tripEventComponent, this.#eventListComponent.element);
  }


  #renderEventList() {
    render(new SortView(), this.#container);

    render(new AddEventView({tripEvent: this.#eventList[0]}), this.#eventListComponent.element);

    render(this.#eventListComponent, this.#container);
    if (this.#eventList.length === 0) {
      render(new EmptyEventListView, this.#eventListComponent.element);
      return;
    }

    for (let i = 1; i < this.#eventList.length; i++) {
      this.#renderEvent(this.#eventList[i]);
    }
  }
}
