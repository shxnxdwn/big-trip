import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {remove, render, replace} from '../framework/render';


export default class EventPresenter {
  #container = null;
  #event = null;
  #eventComponent = null;
  #editEventComponent = null;


  constructor({container}) {
    this.#container = container;
  }


  init (event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#eventComponent = new EventView({
      event,
      onEditClick: () => {
        this.#openEditForm();
        document.addEventListener('keydown', this.#escapeKeyDownHandler);
      }
    });

    this.#editEventComponent = new EditEventView({
      event,
      onFormSubmit: () => {
        this.#closeEditForm();
        document.removeEventListener('keydown', this.#escapeKeyDownHandler);
      },
      onClickCloseButton: () => {
        this.#closeEditForm();
        document.removeEventListener('keydown', this.#escapeKeyDownHandler);
      }
    });


    if(prevEventComponent === null || prevEditEventComponent === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#container.contains(prevEditEventComponent.element)) {
      replace(this.#eventComponent, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }


  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
  }


  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeEditForm();
      document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    }
  };

  #openEditForm() {
    replace(this.#editEventComponent, this.#eventComponent);
  }

  #closeEditForm() {
    replace(this.#eventComponent, this.#editEventComponent);
  }
}
