let penColor = 'black-pen';
let mouseIsDown = false;

function createSketchBoard(girdSize) {
    // Optimization check
    if (girdSize > 100) {
        girdSize = 100;
        alert('The maximum size of the sketch board is 100 for optimization purposes. A sketch board of size 100 was created.');
    }

    // Sketch board creation
    const sketchBoard = document.querySelector('#sketch-board');
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
        event.target.classList.add(penColor);
    }
}

function updateMouseState(event) {
    if (event.type === 'mousedown') {
        mouseIsDown = true;
    } else if (event.type === 'mouseup') {
        mouseIsDown = false;
    }
}