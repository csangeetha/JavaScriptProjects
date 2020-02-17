/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores , activePlayer , currentScore , activeGame;
init();

// on click of roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(activeGame){
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice)
        var diceDOM = document.querySelector('.dice');
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM.style.display = 'block';
        if(dice!== 1){
            currentScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        }
        else{
            nextPlayer();
        }
    }
});

//on click of hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(activeGame){
        scores[activePlayer] += currentScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >=20){
            document.querySelector('#name-'+activePlayer).textContent="Winner";
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            activeGame = false;
        }
        else{
            nextPlayer();
        }
    }
});

// on click of new game
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
        //change the active player and it's styles
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('#current-0').textContent = 0;
        document.querySelector('#current-1').textContent = 0;
        currentScore = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
}


function init(){
    //reset all the values of the game
    scores = [0 , 0];
    currentScore = 0;
    activePlayer = 0;
    activeGame = true;

    //remove any previous changes made to the game and reset the board
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}