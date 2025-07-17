import AbstractView from '../framework/view/abstract-view';
import {capitalizeFirstLetter} from '../utils';
import {SortType} from '../constants';


const createSortItemTemplate = (type) => `
  <div class="trip-sort__item  trip-sort__item--${type}" data-sort-type="${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"
           checked>
    <label class="trip-sort__btn" for="sort-${type}">${capitalizeFirstLetter(type)}</label>
  </div>
`;


const createSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((type) => createSortItemTemplate(type)).join('')}
  </form>
`;


export default class SortView extends AbstractView {
  #handleSortTypeChange = null;


  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.closest('.trip-sort__item')) {
      evt.preventDefault();
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };
}
