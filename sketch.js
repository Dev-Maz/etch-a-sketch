let currentSize;
let penColor = 'black-pen';
let mouseIsDown = false;
let shadeLightness = 0;
const sketchBoard = document.querySelector('#sketch-board');
createSketchBoard(50);

// Menu functionality
const resetSketchBoardBtn = document.querySelector('#erase-all');
resetSketchBoardBtn.addEventListener('click', () => {
    sketchBoard.innerHTML = '';
    createSketchBoard(currentSize);
});

const newSketchBoardBtn = document.querySelector('#new-sketch');
newSketchBoardBtn.addEventListener('click', () => {
    sketchBoard.innerHTML = '';
    let userSizeChoice;
    do {
        userSizeChoice = prompt('What should the new sketch board\'s size be?');
        if (isNaN(userSizeChoice) || userSizeChoice === 0 || userSizeChoice === '') alert('Enter a valid number!');
        console.log(userSizeChoice);
    } while (isNaN(userSizeChoice) || userSizeChoice === 0 || userSizeChoice === '')
    createSketchBoard(userSizeChoice);
})

const blueBtn = document.querySelector('#blue');
blueBtn.addEventListener('click', () => penColor = 'blue-pen');

const blackBtn = document.querySelector('#black');
blackBtn.addEventListener('click', () => penColor = 'black-pen');

const yellowBtn = document.querySelector('#yellow');
yellowBtn.addEventListener('click', () => penColor = 'yellow-pen');

const redBtn = document.querySelector('#red');
redBtn.addEventListener('click', () => penColor = 'red-pen');

const greenBtn = document.querySelector('#green');
greenBtn.addEventListener('click', () => penColor = 'green-pen');

const randomColorBtn = document.querySelector('#random');
randomColorBtn.addEventListener('click', () => penColor = 'random-pen');

const eraseBtn = document.querySelector('#eraser');
eraseBtn.addEventListener('click', () => penColor = 'eraser');

const shadeBtn = document.querySelector('#shade');
shadeBtn.addEventListener('click', () => {
    shadeLightness = 0;
    penColor = 'shade';
});


// Function definitions
function createSketchBoard(girdSize) {
    // Optimization check
    if (girdSize > 100) {
        girdSize = 100;
        alert('The maximum size of the sketch board is 100 for optimization purposes. A sketch board of size 100 was created.');
    }

    currentSize = girdSize;

    // Sketch board creation
    for (let i = 0; i < girdSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        if (i !== (girdSize - 1)) {
            row.classList.add('border-bottom');
        }
        for (let j = 0; j < girdSize; j++) {
            const column = document.createElement('div');
            column.classList.add('column');
            if (j !== (girdSize - 1)) {
                column.classList.add('border-right');
            }
            column.addEventListener('mouseover', penEffect);
            row.appendChild(column);
        }
        sketchBoard.appendChild(row);
    }
    sketchBoard.addEventListener('mousedown', updateMouseState);
    sketchBoard.addEventListener('mouseup', updateMouseState);
}

function penEffect(event) {
    if (mouseIsDown) {
        if (penColor === 'random-pen') {
            event.target.setAttribute('style', `background-color: ${randomColor()};`);
        } else if (penColor === 'eraser') {
            erase(event);
        } else if (penColor === 'shade') {
            drawShade(event);
        } else {
            event.target.classList.add(penColor);
        }
    }
}

function updateMouseState(event) {
    if (event.type === 'mousedown') {
        mouseIsDown = true;
    } else if (event.type === 'mouseup') {
        mouseIsDown = false;
    }
}

function randomColor() {
    return `rgb(${randomNumber(256)}, ${randomNumber(256)}, ${randomNumber(256)})`;
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function erase(event) {
    event.target.removeAttribute('style');
    event.target.classList.remove(
        'black-pen',
        'blue-pen',
        'red-pen',
        'yellow-pen',
        'green-pen'
    );
}

function drawShade(event) {
    event.target.setAttribute('style', `background-color: hsl(0 , 0%, ${shadeLightness}%);`);
    shadeLightness += 10;
}