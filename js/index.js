//Game Constants & Varibable 
let inputDir = { x : 0, y : 0 };

const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');

let speed = 5;
let lastPaintTime = 0;

let score = 0;
let snakeArr = [
    { x : 13, y : 15 }
];

let food = { x : 6, y : 7 };

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if( (ctime - lastPaintTime)/1000 < 1/speed ){
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake){
    //If bum into yourself
    for(let index = 1; index < snakeArr.length; index++){
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y ){
            return true
        }
    }
}

function gameEngine(){
    //Part 1: Updating Snake Array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();

        inputDir = { x : 0, y : 0};
        alert('Game Over, Press any key to play again!');
        snakeArr = [{ x : 13,  y : 15}];
        //musicSound.play();
        score = 0;
    }

    //If you have eaten the food 
    if( snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
        foodSound.play()
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b-a)* Math.random()), y : Math.round(a + (b-a)* Math.random())  }
    }

    //Move Snake 
    for(let i = snakeArr.length - 2; i >= 0; i-- ){
        snakeArr[ i + 1 ] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    

    //Part 2: Render the Snake 
    board.innerHTML = "";
    snakeArr.forEach((e, i) => {

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(i == 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement)
    }); 

    //Render The Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    board.appendChild(foodElement)
}

//Main Logic Starts Here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x : 0, y : 1}; //Start Game
    //musicSound.play();

    switch (e.key) {
        case "ArrowUp":
            moveSound.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})

