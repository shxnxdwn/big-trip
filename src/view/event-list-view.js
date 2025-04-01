import AbstractView from '../framework/view/abstract-view';


const createTripListTemplate = () => '<ul class="trip-events__list"></ul>';


export default class EventListView extends AbstractView {
  get template() {
    return createTripListTemplate();
  }
}
