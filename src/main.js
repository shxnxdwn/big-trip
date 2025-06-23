import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import EventListPresenter from './presenter/event-list-presenter';
import EventListModel from './model/event-list-model';
import {FilterList} from './utils';
import {render, RenderPosition} from './framework/render';


const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');
const eventListModel = new EventListModel();
const eventListPresenter = new EventListPresenter({
  container: eventContainer,
  eventListModel
});
/* eslint-disable */

const generateFilters = (eventList) => Object.entries(FilterList).map(([filterType, filterPatternByType]) => ({
  type: filterType,
  count: filterPatternByType(eventList).length
}));


const filters = generateFilters(eventListModel.eventList);


render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView({filters}), filterContainer);


eventListPresenter.init();
