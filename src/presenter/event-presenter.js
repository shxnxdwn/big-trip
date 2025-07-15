import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import {remove, render, replace} from '../framework/render';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};


export default class EventPresenter {
  #container = null;
  #event = null;
  #mode = Mode.DEFAULT;
  #eventComponent = null;
  #editEventComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;


  constructor({container, onDataChange, onModeChange}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }


  init (event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEditEventComponent = this.#editEventComponent;


    this.#eventComponent = new EventView({
      event: event,
      onEditClick: this.#openEditForm,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editEventComponent = new EditEventView({
      event: event,
      onFormSubmit: this.#closeEditForm,
      onClickCloseButton: this.#closeEditForm
    });


    if(prevEventComponent === null || prevEditEventComponent === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventComponent, prevEditEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }


  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventComponent);
  }


  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#closeEditForm();
    }
  }


  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeEditForm();
      document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    }
  };


  #openEditForm = () => {
    replace(this.#editEventComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escapeKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #closeEditForm = () => {
    replace(this.#eventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteClick = () => this.#handleDataChange({...this.#event, isFavorite: !this.#event.isFavorite});
}
