let streetsNightTheme = document.querySelector('.streets-night')
let visitsTheme = document.querySelector('.visits')
let gyeongbokgungTheme = document.querySelector('.gyeongbokgung')
let yongmalandTheme = document.querySelector('.yongmaland')
let bukchonTheme = document.querySelector('.bukchon')

const startButton = document.getElementById('start')
const winnerDialog = document.querySelector('#winner');
const loserDialog = document.querySelector('#loser');

import {cardsBukchon, cardsGyeongbokgung, cardsStreetsNight, cardsVisits, cardsYongmaland} from './data.js'
import MemoryGame from './MemoryGame.js'

let pickedTheme = null
let memoryGame = null
let gameHasStarted = false;

startButton.addEventListener('click', () => {
  gameHasStarted = true;
  memoryGame = new MemoryGame(pickedTheme)
  memoryGame.shuffleCards()

  let counter = 90;
  let timerElement = document.querySelector(".timer-count");

  const timer = setInterval(function() {
    counter--
    timerElement.innerHTML = counter

    if (counter === 0) {
      clearInterval(timer)
        loserDialog.showModal()
    } 
  }, 1000);


  let html = '';
  memoryGame.cards.forEach((card) => {
    html += `
      <div class="card" data-card-name="${card.name}">
        <div class="back" name="${card.img}"></div>
        <div class="front" style="background: url(img/${card.img}) no-repeat"></div>
      </div>
    `;
  });

  document.getElementById('boards-game').innerHTML = html;

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
       card.classList.add("turned")
      memoryGame.pickedCards.push(card)

      if (memoryGame.pickedCards.length === 2) {
        const cardOne = memoryGame.pickedCards[0]
        const cardTwo = memoryGame.pickedCards[1]
        const cardOneElement = memoryGame.pickedCards[0].getAttribute('data-card-name')
        const cardTwoElement = memoryGame.pickedCards[1].getAttribute('data-card-name')
        
        if (memoryGame.checkIfPair(cardOneElement, cardTwoElement)) {
          memoryGame.pickedCards = []
        } else {
          setTimeout(() => {
            cardOne.classList.remove('turned')
            cardTwo.classList.remove('turned')
          }, 600)
          memoryGame.pickedCards = []
        }
      }
      
      if (memoryGame.checkIfFinished()) {
          clearInterval(timer)
            winnerDialog.showModal()
      }

    });
  });
})

  bukchonTheme.addEventListener('click', (event) => {
    if (gameHasStarted) return
    pickedTheme = cardsBukchon
    unselectAll()
    bukchonTheme.classList.add('selected')
  })

  yongmalandTheme.addEventListener('click', (event) => {
    if (gameHasStarted) return
    pickedTheme = cardsYongmaland
    unselectAll()
    yongmalandTheme.classList.add('selected')
  })

  gyeongbokgungTheme.addEventListener('click', (event) => {
    if (gameHasStarted) return
    pickedTheme = cardsGyeongbokgung
    unselectAll()
    gyeongbokgungTheme.classList.add('selected')
  })

  visitsTheme.addEventListener('click', (event) => {
    if (gameHasStarted) return
    pickedTheme = cardsVisits
    unselectAll()
    visitsTheme.classList.add('selected')
  })

  streetsNightTheme.addEventListener('click', (event) => {
    if (gameHasStarted) return
    pickedTheme = cardsStreetsNight
    unselectAll()
    streetsNightTheme.classList.add('selected')
  })


function unselectAll(){
  let selectedElements = document.querySelectorAll('.selected')
  selectedElements.forEach(element =>  {
    element.classList.remove('selected')
  })
}

document.querySelector('#winner .close').addEventListener('click', function() {
  winnerDialog.close()
  location.reload()
});

document.querySelector('#loser .close').addEventListener('click', function() {
  loserDialog.close()
  location.reload()
});
  

