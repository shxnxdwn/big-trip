import {RenderPosition} from './constants';

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

const capitalizeFirstLetter = (string) => string.at(0).toUpperCase() + string.slice(1);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export {RenderPosition, createElement, render, capitalizeFirstLetter, getRandomArrayElement};
