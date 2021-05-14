let interval;
//Cover handling
const cover = document.querySelector('.intro');
const startButton = document.querySelector('.startBtn');

startButton.addEventListener("click", ()=>{
    cover.style.top="-100%";
    startButton.style.pointerEvents = 'none';
    interval = setInterval(updateCountdown,1000);
});


// Game handling

let flippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;


const cards = document.querySelectorAll('.memoryCard');

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
 if(!flippedCard) {
     // card has been clicked the first time?
     flippedCard = true;
     firstCard=this;
    //  console.log({flippedCard,firstCard})

    return;
 }
 else {
     flippedCard=false;
     secondCard = this;
    //  console.log({flippedCard,firstCard})

    // matching the cards
    // console.log(firstCard.dataset.name);
    // console.log(secondCard.dataset.name);
    checkForMatch();
}
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name===secondCard.dataset.name;

    isMatch ? cardsLock() : unflipCards() ;

}

function cardsLock(){
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard);
    addScore();
}

function unflipCards() {
    lockBoard = true;
    setTimeout (()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1500);
}

function resetBoard () {
    [hasFlippedCard,lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener("click",flipCard));

// Scoreboard handling

let number = 0;
let score = document.querySelector('.score');


function addScore () {
    number++;
    score.textContent = number;
    if(number === 6){
        winnerPopup();
        clearInterval(interval);
        console.log("wygrałeś")
    }
}

// Timer handling

const startTime = 1;
let time = startTime * 60;

const countdown= document.querySelector('.time');

function updateCountdown() {  
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 1 ? '0' + seconds : seconds;
    time = time < 0 ? 0 : time; 
    countdown.innerHTML=`${minutes}:${seconds}`;
    if (time <= 0){
        looserPopup();
        clearInterval(interval);
        return;
    } else {
    time--;
}
};

// Pop up handling

const popUp = document.querySelector(".popup");
const title = document.querySelector(".popupTitle");
const text = document.querySelector(".popupText");
const winningTime = document.querySelector(".popupTime");
const playAgain = document.querySelector('.playAgain');
const restartBtn = document.querySelector('.restart');

function looserPopup(){
    lockCards();
    popUp.style.display="flex";
}


function winnerPopup(){
    popUp.style.display="flex";
    popUp.style.transition="0.5s";
    title.innerHTML="Congratulations!";
    text.innerHTML="We have a winner!";
    winningTime.innerHTML=`You won in ${59 - time} seconds!`;
    // console.log(`You won in ${60 - time} seconds!`)
}

restartBtn.addEventListener("click", ()=>{
    location.reload();
})

playAgain.addEventListener("click", ()=>{
    location.reload();
});

function lockCards(){
    cards.forEach(card => {
        card.addEventListener('click',()=>
        card.classList.remove('flip'));
    })
}