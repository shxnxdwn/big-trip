import AbstractView from '../framework/view/abstract-view';
import {EmptyEventListMessages} from '../constants';


const createEmptyEventListViewTemplate = () => `<p class="trip-events__msg">${EmptyEventListMessages.EVERYTHING}</p>`;


export default class EmptyEventListView extends AbstractView {
  get template() {
    return createEmptyEventListViewTemplate();
  }
}
