import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {render, replace} from '../framework/render';


export default class EventPresenter {
  #container = null;
  #eventComponent = null;
  #editEventComponent = null;
  #event = null;


  constructor({container}) {
    this.#container = container;
  }


  init (event) {
    this.#event = event;

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

    render(this.#eventComponent, this.#container);
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
