class matchingGame{
  constructor(cards){
    this.cardsArray = cards; //16 cards
    this.score = document.getElementById('points');
    this.music = new Audio('music.mp3');
    this.music.loop = true;
  }

  startGame(){
    this.music.currentTime=0;
    this.music.play();
    console.log("new start \n");
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.matchedCards = [];
    this.busy = true;
    this.hideCards();
    document.getElementById('in').innerText = "You got this";
     setTimeout(() => {
      this.shuffleCard();
      this.busy = false;
    }, 500);
    console.log("first check" +this.cardToCheck);
    this.score.innerText = this.totalClicks;
  }
  
    talking(){
      console.log("working");
      if(this.totalClicks<=10){
        console.log("hey");
        document.getElementById('in').innerText = "so far so good";
      }
      else if(this.totalClicks<=18){
        console.log("hey");
        document.getElementById('in').innerText = "almost there";
      }
      else if(this.totalClicks<=28){
        console.log("hey");
        document.getElementById('in').innerText = "you can do it";
      }
      else if(this.totalClicks<=36){
        console.log("hey");
        document.getElementById('in').innerText = "this is taking a while";
      }
      else if(this.totalClicks<=42){
        console.log("hey");
        document.getElementById('in').innerText = "paimon thinks you need help";
      }
      else if(this.totalClicks<=46){
        console.log("hey");
        document.getElementById('in').innerText = "paimon thinks your memory sucks";
      }
    }
  hideCards(){
    this.cardsArray.forEach(card => {
      card.classList.remove('visible');
      card.classList.remove('matched');
    })
  }

  flipCard(card){
    if(this.canFlipCard(card)){
      this.totalClicks++;
      this.score.innerText = this.totalClicks; // changes score
      card.classList.add('visible'); // makes back of card visible 
      console.log("second check" + this.cardToCheck);
      
      if(this.cardToCheck){
        console.log(this.cardToCheck);
        this.checkForCardMatch(card);
      }else{
        console.log("picking another card ");
        this.cardToCheck= card;
      }
      console.log("end");
    }
  }
  checkForCardMatch(card){
      if(this.getCardType(card) === this.getCardType(this.cardToCheck)){
        this.cardMatch(card,this.cardToCheck);
      }
      else{
        console.log("mismatch");
        this.cardMisMatch(card,this.cardToCheck);
      }
      this.cardToCheck = null; // changes card to null
      console.log(this.cardToCheck);
  }

  cardMatch(card1,card2){
      this.matchedCards.push(card1);
      this.matchedCards.push(card2);
      card1.classList.add('matched');
      card2.classList.add('matched');
      console.log(this.matchedCards.length);
      if(this.matchedCards.length == 16){
        this.music.pause();
        this.music.currentTime = 0;
        document.getElementById('w').classList.add('visible');
      }
  }
  cardMisMatch(card1, card2){
      this.busy = true;
      this.talking();
      setTimeout(() => {
        card1.classList.remove('visible'); //hides Cards
        
        card2.classList.remove('visible');
        this.busy = false;
      },500)
      
  }

  getCardType(card){
    return card.getElementsByClassName('pic')[0].src;
  }
  shuffleCard(){
    for(let i = this.cardsArray.length -1; i > 0; i--){
      let r = Math.floor(Math.random()*(i+1));
      this.cardsArray[r].style.order = i;
      this.cardsArray[i].style.order = r;

    }

  }
  canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
  

}

function ready(){
  let overlays = Array.from(document.getElementsByClassName('overlay'));
  overlays.forEach(overlay =>overlay.classList.remove('visible'));
  document.getElementById('t').classList.add('visible');
  
  // new array of cards
  let cards = Array.from(document.getElementsByClassName('card'));
  let n = new matchingGame(cards);
  let buttons = Array.from(document.getElementsByClassName('button'));

  console.log(cards.length);

  buttons.forEach(button => {
        button.addEventListener('click', () => {
          document.getElementById('t').classList.remove('visible');
          document.getElementById('w').classList.remove('visible');
           n.startGame();
        });
    });
  
 

  //if click on card flip card
  cards.forEach(card => {
        card.addEventListener('click', () => {
            n.flipCard(card);
        });
    });
}


//checks if site is loaded
if(document.readyState=== 'loading'){
 document.addEventListener('DOMContentLoaded',ready());
}
else{
  ready();
}