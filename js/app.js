let streetsNightTheme = document.querySelector('.streets-night')
let visitsTheme = document.querySelector('.visits')
let gyeongbokgungTheme = document.querySelector('.gyeongbokgung')
let yongmalandTheme = document.querySelector('.yongmaland')
let bukchonTheme = document.querySelector('.bukchon')

const startButton = document.getElementById('start')



import {cardsBukchon, cardsGyeongbokgung, cardsStreetsNight, cardsVisits, cardsYongmaland} from './data.js'
import MemoryGame from './MemoryGame.js'



let pickedTheme = null
let memoryGame = null


startButton.addEventListener('click', () => {
  memoryGame = new MemoryGame(pickedTheme)
  memoryGame.shuffleCards()


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
        setTimeout(() => {
          location.reload()
        }, 400)
      }

    });
  });
})



  bukchonTheme.addEventListener('click', (event) => {
    pickedTheme = cardsBukchon
    unselectAll()
    bukchonTheme.classList.add('selected')
  })

  yongmalandTheme.addEventListener('click', (event) => {
    pickedTheme = cardsYongmaland
    unselectAll()
    yongmalandTheme.classList.add('selected')
  })

  gyeongbokgungTheme.addEventListener('click', (event) => {
    pickedTheme = cardsGyeongbokgung
    unselectAll()
    gyeongbokgungTheme.classList.add('selected')
  })

  visitsTheme.addEventListener('click', (event) => {
    pickedTheme = cardsVisits
    unselectAll()
    visitsTheme.classList.add('selected')
  })

  streetsNightTheme.addEventListener('click', (event) => {
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

