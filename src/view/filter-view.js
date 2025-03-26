import {createElement} from '../render';
import {FILTER_TYPES} from '../constants';
import {capitalizeFirstLetter} from '../utils/capitalize-first-letter';


const createFilterItemTemplate = (type) => `
<div class="trip-filters__filter">
  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
         value="${type}" checked>
  <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
</div>
`;


const createFilterTemplate = () => `
<form class="trip-filters" action="#" method="get">
  ${FILTER_TYPES.map((type) => createFilterItemTemplate(type)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;


export default class FilterView {
  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
