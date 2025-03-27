// import AddEventView from "../view/add-event-view";
import EditEventView from '../view/edit-event-view';
import SortView from '../view/sort-view';
import TripEventView from '../view/trip-event-view';
import TripListView from '../view/trip-list-view';
import {render} from '../utils/render';

export default class EventListPresenter {
  constructor({container, eventListModel}) {
    this.container = container;
    this.eventListModel = eventListModel;
  }

  tripList = new TripListView();

  init() {
    this.eventList = [...this.eventListModel.getEventList()];

    render(new SortView(), this.container);
    render(this.tripList, this.container);
    render(new EditEventView(), this.tripList.getElement());

    for (let i = 0; i < this.eventList.length; i++) {
      render(new TripEventView({tripEvent: this.eventList[i]}), this.tripList.getElement());
    }
  }
}
