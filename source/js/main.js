"use strict";

const CARDS_NUMBER = 7;
const COUNTS = [1, 2, 3, 4, 5, 6, 7];
const IMAGES = [
  `./img/1st-item.jpg`,
  `./img/2nd-item.jpg`,
  `./img/3rd-item.jpg`,
  `./img/4th-item.jpg`,
  `./img/5th-item.jpg`,
  `./img/6th-item.jpg`,
  `./img/7th-item.jpg`,
];

const popupTemplate = document.querySelector(`#popup`)
  .content
  .querySelector(`.popup`);
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.item`);
const list = document.querySelector(`.list`);
const body = document.querySelector(`body`);

const getCount = (i) => (COUNTS[i]);
const getImage = (i) => (IMAGES[i]);

const generateCards = (number) => {
  const cards = [];

  for (let i = 0; i < number; i++) {
    cards.push({
      count: getCount(i),
      image: getImage(i)
    })
  }
  return cards;
};

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardCounter = cardElement.querySelector(`.counter`);
  const cardImage = cardElement.querySelector(`img`);

  cardCounter.textContent = card.count;
  cardElement.id = card.count;
  cardImage.src = card.image;

  return cardElement;
};

const createPopup = (card) => {
  const popupElement = popupTemplate.cloneNode(true)
  const popupCounter = popupElement.querySelector(`.popup__counter`);
  const popupImage = popupElement.querySelector(`.popup__image`);
  const popupClose = popupElement.querySelector(`.popup__close`);
  const cardCounter = card.querySelector(`.counter`);
  const cardImage = card.querySelector(`img`);

  popupCounter.textContent = cardCounter.textContent;
  popupImage.src = cardImage.src;

  document.addEventListener(`keydown`, onPopupClose);
  popupClose.addEventListener(`click`, onCrossClick);

  return popupElement;
};

const renderCards = (array) => {
  const fragment = document.createDocumentFragment();

  array.forEach((item) => fragment.appendChild(createCard(item)));
  fragment.querySelectorAll(`.item`).forEach((item) => {
    item.addEventListener(`click`, (evt) => onCardClick(item));
  })
  list.appendChild(fragment);
};

const renderPopup = (card) => {
  const fragment = document.createDocumentFragment();
  const element = body.querySelector(`.popup`);

  if (element) {
    body.removeChild(element);
    fragment.appendChild(createPopup(card));
    body.appendChild(fragment);
  } else {
    fragment.appendChild(createPopup(card));
    body.appendChild(fragment);
  }
}

const reRenderCards = () => {
  let items = document.querySelectorAll(`li`);

  if (items.length > 0) {
    while (items.length > 0) {
      list.removeChild(list.firstChild);
      items = document.querySelectorAll(`li`);
    }

    renderCards(cards);
  } else {
    renderCards(cards);
  }
};

const onCardClick = (item) => {
  reRenderCards()
  renderPopup(item);
};

const onPopupClose = (evt) => {
  const element = body.querySelector(`.popup`);
  evt.preventDefault();

  if (evt.key === `Escape` && element) {
    body.removeChild(element);
    document.removeEventListener(`keydown`, onPopupClose);
  }
};

const onCrossClick = () => {
  const element = body.querySelector(`.popup`);

  body.removeChild(element);
}

const cardsList = document.querySelectorAll(`.item`);
const cards = generateCards(CARDS_NUMBER);
renderCards(cards);
