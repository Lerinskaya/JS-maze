const field = document.querySelector('.canvas').getContext('2d');

let mazeArray = [[0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
[1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
[0, 0, 0, 1, 1, 0, 0, 1, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
[1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
[1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

let person = {};
let finish = {};

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
        for (let a = 0; a < mazeArray[0].length; a++) {
            if (mazeArray[i][a] !== 0) {
                field.fillStyle = 'SaddleBrown';
                field.fillRect(a * blockWidth, i * blockHeight, blockWidth, blockHeight);
                field.fillStyle = 'Peru';
                field.fillRect(a * blockWidth + blockWidth / 4, i * blockHeight + blockHeight / 4, blockWidth / 2, blockHeight / 2);
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
        case 65: person.x--;
            if (collision()) {
                person.x++;
            }
            break;
        case 87: person.y--;
            if (collision()) {
                person.y++;
            }
            break;
        case 68: person.x++;
            if (collision()) {
                person.x--;
            }
            break;
        case 83: person.y++;
            if (collision()) {
                person.y--;
            }
            break;
    }
    function collision() {
        if (mazeArray[person.y][person.x] === 1) {
            return true;
        } else {
            return false;
        }
    }
    console.log(person.x, person.y);
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
function mixMaze() {
    mazeArray[7][6] = 1;
    mazeArray.map(i => [Math.random(), i]).sort().map(i => i[1]);
    console.log(mazeArray);
    console.log(mazeArray[7][6]);
}



// (mazeArray[person.y] === 1 && mazeArray[person.x] === 1)
// person.x < 0 || person.x > mazeArray[0].length - 1 || person.y < 0 || person.y > mazeArray.length - 1 ||

// case 37: person.x--;
//             break;
//         case 38: person.y--;
//             break;
//         case 39: person.x++;
//             break;
//         case 40: person.y++;
//             break;