"use strict";

const CARDS_NUMBER = 7;
const COUNTS = [1, 2, 3, 4, 5, 6, 7];
const IMAGES = [
  './img/1st-item.jpg',
  './img/2nd-item.jpg',
  './img/3rd-item.jpg',
  './img/4th-item.jpg',
  './img/5th-item.jpg',
  './img/6th-item.jpg',
  './img/7th-item.jpg',
];

const popupTemplate = document.querySelector('#popup');
const cardTemplate = document.querySelector('#card');
const cardsList = document.querySelector('.list')

const getCount = (i) => (COUNTS[i]);
const getImage = (i) => (IMAGES[i]);

const generateCards = (number) => {
  const cards = [];

  for (let i = 1; i <= number; i++) {
    cards.push({
      count: getCount(i),
      image: getImage(i)
    })
  }
  return cards;
};

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const counter = cardElement.querySelector('.counter');
  const image = cardElement.querySelector('img');

  console.log(cardElement);
  console.log(counter);

  counter.textContent = card.count.toString();

  image.src = card.image;

  return cardElement;
};

const renderCards = (array) => {
  const fragment = document.createDocumentFragment();

  array.forEach((item) => fragment.appendChild(createCard(item)));

  cardsList.appendChild(fragment);
};

const cards = generateCards(CARDS_NUMBER);
renderCards(cards);

// const cards = document.querySelectorAll('.button__img');
// const popupCounter = document.querySelector('.popup__counter')
// const popupTemplate = document.querySelector('#popup')
//   .content
//   .querySelector('popup');
//
// let popupData = [];
//
// const getPopupData = () => {
//   for (let i = 1; i <= cards.length; i++) {
//     let counter = i++;
//     let cardPic = cards[i].src;
//     popupData.push({
//         counter,
//         cardPic
//       })
//   }
// };
//
// const renderPopup = (popupDataItem) => {
//   popupData.forEach((item) => )
// }
