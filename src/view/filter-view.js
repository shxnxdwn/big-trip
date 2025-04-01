import AbstractView from '../framework/view/abstract-view';
import {capitalizeFirstLetter} from '../utils';
import {FILTER_TYPES} from '../constants';


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


export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
