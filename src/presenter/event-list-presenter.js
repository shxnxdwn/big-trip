import AddEventView from '../view/add-event-view';
import EditEventView from '../view/edit-event-view';
import SortView from '../view/sort-view';
import TripEventView from '../view/trip-event-view';
import TripListView from '../view/trip-list-view';
import {render} from '../framework/render';


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
    render(new AddEventView({tripEvent: this.eventList[0]}), this.tripList.getElement());
    render(new EditEventView({tripEvent: this.eventList[1]}), this.tripList.getElement());

    for (let i = 2; i < this.eventList.length; i++) {
      render(new TripEventView({tripEvent: this.eventList[i]}), this.tripList.getElement());
    }
  }
}
