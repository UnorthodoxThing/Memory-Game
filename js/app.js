/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube",
"fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Create cards

const cardContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

/*
* Initialize game
*/
function init() {
  // Shuffle items
  // shuffle(icons);

  // Reset timer
  var timerContainer = document.querySelector(".timer");
  timerContainer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);

  // Append cards to html
  for(let i = 0; i <icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card"); // Add new class name "card"
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardContainer.appendChild(card);

    // Add Click Event to card
    click(card);
  }
}

/*
* Click Event
*/
function click(card) {
  // Card click event
  card.addEventListener("click", function() {

    const currentCard = this;
    const previousCard = openedCards[0];

    // There's an existing OPENED card
    if(openedCards.length === 1) {
      card.classList.add("open", "show", "disabled");
      openedCards.push(this);

      // Compared 2 opened opened cards

      comparePair(currentCard, previousCard);

    } else {
      // No opened openedCards
      currentCard.classList.add("open", "show", "disabled");
      openedCards.push(this);
    }
  });
}

/*
* Compare the cards
*/
function comparePair(currentCard, previousCard) {
  if(currentCard.innerHTML === previousCard.innerHTML) {

    // Shown matched
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);

    openedCards = [];


      // Count moves
      countMove();

    // Check if game is game is over
    gameOver();

  } else {
    setTimeout(function () {
      currentCard.classList.remove("open", "show", "disabled");
      previousCard.classList.remove("open", "show", "disabled");

    }, 600)

    openedCards = [];

    // Count moves
    countMove();

  }
}

/*
* Check if the game is over
*/
function gameOver() {
  if(matchedCards.length === icons.length) {
    // Congratulate player and ask to play again
    // time taken, and star rating
    // add Delay func

    // setTimer STOPS
    clearTimeout(interval);

    // Display End Menu
    let endMenu = document.querySelector(".endmenu");
    endMenu.style.display = "block";

    const clnStarsContainer = starsContainer.cloneNode(true);
    endMenu.appendChild(clnStarsContainer);
  }
}

/*
* Play Again Button
*/
function playAgain(){
    let endMenu = document.querySelector(".endmenu");
    endMenu.style.display = "none";
    restart();
    init();
}

/*
* Count move
*/
const moveContainer = document.querySelector(".moves");
let moves = 0;
function countMove() {
  moves++;
  moveContainer.innerHTML = moves;

  // Start Rating
  rating();

  //Start timer on FIRST MOVE
  if(moves == 1){
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

/*
* Star rating
*/
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;
function rating() {
  if(moves < 20) {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  } else if(moves < 27){
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  } else {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}

/*
* Timer
*/
let second = 0, minute = 0;
let timerContainer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function() {
        timerContainer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

/*
* Restart button
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  // Delete deck
  cardContainer.innerHTML = "";

  // Call `init` to create new cards
  init();

  // Reset any old/ used variables
  matchedCards = [];

  moves = 0;
  moveContainer.innerHTML = moves;
})

/*
* Restart function
*/
function restart() {
  // Delete deck
  cardContainer.innerHTML = "";

  // Reset any old/ used variables
  matchedCards = [];

  moves = 0;
  moveContainer.innerHTML = moves;

  const clnStarsContainer = document.querySelector(".endmenu .stars");
  clnStarsContainer.remove(clnStarsContainer);
}

// Starts the game
init();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
