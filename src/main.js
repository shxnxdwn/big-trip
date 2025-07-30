import InfoView from './view/info-view';
import FilterView from './view/filter-view';
import EventListPresenter from './presenter/event-list-presenter';
import EventListModel from './model/event-list-model';
import {render, RenderPosition} from './framework/render';
import {FilterList} from './utils';


const infoContainer = document.querySelector('.trip-main');
const filterContainer = infoContainer.querySelector('.trip-controls__filters');
const eventContainer = document.querySelector('.trip-events');
const eventListModel = new EventListModel();
const eventListPresenter = new EventListPresenter({
  container: eventContainer,
  eventListModel
});


const generateFilters = (eventList) => Object.entries(FilterList).map(([filterType, filterPatternByType]) => ({
  type: filterType,
  count: filterPatternByType(eventList).length
}));


const filters = generateFilters(eventListModel.eventList);


render(new InfoView(), infoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView({filters}), filterContainer);


eventListPresenter.init();
