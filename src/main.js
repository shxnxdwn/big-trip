import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import EventListPresenter from './presenter/event-list-presenter';
import EventListModel from './model/event-list-model';
import {RenderPosition} from './constants';
import {render} from './utils';


const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');
const eventListModel = new EventListModel();
const eventListPresenter = new EventListPresenter({
  container: eventContainer,
  eventListModel
});


render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

eventListPresenter.init();
