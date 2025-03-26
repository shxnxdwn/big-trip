import TripInfoView from "./view/trip-info-view";
import FilterView from "./view/filter-view";
import {RenderPosition} from "./constants";
import {render} from "./render";
import EventListPresenter from "./presenter/event-list-presenter";


const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');
const eventListPresenter = new EventListPresenter({container: eventContainer});


render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

eventListPresenter.init();
