const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGabeBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create a function to initialise the game
function initGame(){
    currentPlayer="X";
    // update in our database
    gameGrid=["","","","","","","","","",];
    // update in UI
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all";
        // to remove the green color, jst remove win class from box or reinitialise the classlist of box
        // box.classList.remove('win');
        box.classList=`box box${index+1}`;  // reinitialising the class
    })
    newGabeBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        // update on UI
        boxes[index].innerText=currentPlayer;
        // update in our database
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap kro turn ko
        swapTurn();
        // check kro koi jeet to nhi gya
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O"
    }
    else{
        currentPlayer="X";
    }
    // UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!="" && gameGrid[position[1]]!="" && gameGrid[position[2]]!="") && (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){
            // check winner is X or O
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            // Now we know X or O is winner, so green it on UI
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            // Now disable the pointer events so that the game stops
            boxes.forEach((box)=>{
                box.style.pointerEvents='none';
            })
        }
    })

    // it means we have a winner
    if(answer!=""){
        gameInfo.innerText=`Winner - ${answer}`;
        newGabeBtn.classList.add('active');
        return;
    }

    // Winner not found, let's check whether the game is tied
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillCount++;
        }
    })

    // board is filled, game is TIE
    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGabeBtn.classList.add('active');
    }
}

newGabeBtn.addEventListener('click',initGame);