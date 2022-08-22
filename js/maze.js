const field = document.querySelector('.canvas').getContext('2d');
let level = document.querySelector('.level');

let levelNumber = 1;
level.innerHTML = 'Level ' + levelNumber;

let person = {};
let finish = {};

let mazeArray = [[2, 1, 0, 0, 1, 1, 1, 1, 1, 0],
[2, 1, 0, 1, 0, 2, 2, 2, 2, 0],
[2, 2, 2, 1, 0, 2, 1, 1, 2, 0],
[1, 1, 2, 2, 2, 2, 0, 1, 2, 1],
[0, 0, 0, 1, 1, 0, 0, 1, 2, 1],
[0, 0, 0, 0, 0, 0, 0, 1, 2, 1],
[1, 0, 1, 1, 1, 0, 2, 2, 2, 0],
[1, 0, 1, 0, 1, 0, 0, 2, 0, 0],
[1, 0, 0, 0, 1, 1, 1, 2, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 2, 2, 2]];

function mixMaze() {
    let randomI = Math.floor(Math.random() * mazeArray.length);
    let randomJ = Math.floor(Math.random() * mazeArray[0].length);
    let i = randomI;
    let j = randomJ;
    level.innerHTML = 'Level ' + ++levelNumber;
    for (i; i < 10; i++) {
        for (j; j < 10; j++) {
            if (mazeArray[i][j] === 0) {
                mazeArray[i][j] = 1;
                break;
            } else if (mazeArray[i][j] !== 0) {
                i = Math.floor(Math.random() * mazeArray.length);
            }
        } break;
    }
}

let avatarPerson = document.createElement('img'),
    avatarFinish = document.createElement('img');
avatarPerson.src = 'simba.png';
avatarFinish.src = 'meat.png';
avatarPerson.addEventListener('load', function () {
    setField();
    drawField();
    drawPerson();
    drawFinish();
});

document.body.addEventListener('keydown', personeMove);
function personeMove() {
    clearPerson();
    move();
    drawPerson();
    fieldOut();
    winMaze();
}

field.canvas.width = 600;
field.canvas.height = 600;

let blockWidth = field.canvas.width / mazeArray[0].length;
let blockHeight = field.canvas.height / mazeArray.length;
function drawField() {
    field.fillStyle = 'PeachPuff';
    field.fillRect(0, 0, field.canvas.width, field.canvas.height);
    for (let i = 0; i < mazeArray.length; i++) {
        for (let j = 0; j < mazeArray[0].length; j++) {
            if (mazeArray[i][j] === 1) {
                field.fillStyle = 'SaddleBrown';
                field.fillRect(j * blockWidth, i * blockHeight, blockWidth, blockHeight);
                field.fillStyle = 'Peru';
                field.fillRect(j * blockWidth + blockWidth / 4, i * blockHeight + blockHeight / 4, blockWidth / 2, blockHeight / 2);
            }
        }
    }
}

function setField() {
    person.x = 0;
    person.y = 0;
    finish.x = 9;
    finish.y = 9;
    person.width = field.canvas.width / mazeArray[0].length;
    person.height = field.canvas.height / mazeArray.length;
    finish.width = field.canvas.width / mazeArray[0].length;
    finish.height = field.canvas.height / mazeArray.length;
}

function move() {
    switch (event.keyCode) {
        case 37: person.x--;
            if (collision()) {
                person.x++;
            }
            break;
        case 38: person.y--;
            if (collision()) {
                person.y++;
            }
            break;
        case 39: person.x++;
            if (collision()) {
                person.x--;
            }
            break;
        case 40: person.y++;
            if (collision()) {
                person.y--;
            }
            break;
    }
}

function collision() {
    if (mazeArray[person.y] && mazeArray[person.y][person.x] === 1) {
        return true;
    } else {
        return false;
    }
}

function drawPerson() {
    field.drawImage(avatarPerson, 0, 0, 1280, 966, person.x * blockWidth, person.y * blockHeight, blockWidth, blockHeight);
}
function drawFinish() {
    field.drawImage(avatarFinish, 9, 0, 600, 391, finish.x * blockWidth, finish.y * blockHeight, blockWidth, blockHeight);
}

function clearPerson() {
    field.fillStyle = 'PeachPuff';
    field.fillRect(person.x * blockWidth, person.y * blockHeight, blockWidth, blockHeight);
}
function fieldOut() {
    if (person.x < 0 || person.x > mazeArray[0].length - 1 || person.y < 0 || person.y > mazeArray.length - 1) {
        alert('Вы проиграли!');
        clearPerson();
        setField();
        drawPerson();
        drawFinish();
    }
}

function winMaze() {
    if (person.x === mazeArray[0].length - 1 && person.y === mazeArray.length - 1) {
        alert('Вы выиграли!');
        clearPerson();
        setField();
        mixMaze();
        drawField();
        drawPerson();
        drawFinish();
    }
}