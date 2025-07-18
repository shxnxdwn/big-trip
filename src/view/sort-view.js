import AbstractView from '../framework/view/abstract-view';
import {capitalizeFirstLetter} from '../utils';
import {SortType} from '../constants';


const createSortItemTemplate = (type, currentSortType) => `
  <div class="trip-sort__item  trip-sort__item--${type}" data-sort-type="${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"
      ${type === 'event' || type === 'offers' ? 'disabled' : ''}
      ${type === currentSortType ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${type}">${capitalizeFirstLetter(type)}</label>
  </div>
`;


const createSortTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((type) => createSortItemTemplate(type, currentSortType)).join('')}
  </form>
`;


export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    const sortTypeElement = evt.target.closest('[data-sort-type]');

    if (sortTypeElement) {
      evt.preventDefault();
      this.#handleSortTypeChange(sortTypeElement.dataset.sortType);
    }
  };
}
