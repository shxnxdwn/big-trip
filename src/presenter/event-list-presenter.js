import AddEventView from "../view/add-event-view";
import EditEventView from "../view/edit-event-view";
import SortView from "../view/sort-view";
import TripEventView from "../view/trip-event-view";
import TripListView from "../view/trip-list-view";
import {render} from "../render";

export default class EventListPresenter {
  constructor({container}) {
    this.container = container;
  }

  tripList = new TripListView();

  init() {
    render(new SortView(), this.container);
    render(this.tripList, this.container);
    render(new EditEventView(), this.tripList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), this.tripList.getElement());
    }
  }
}
