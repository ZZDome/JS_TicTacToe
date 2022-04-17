let fields = [];

let currentShape = '';

function init() {
    showMainMenu();
}

function showMainMenu() {
    let content = document.getElementById('content');
    content.innerHTML = ``;
    content.innerHTML += templateMainMenu();
}

function loadGame() {
    drawField();
}

function drawField() {
    let content = document.getElementById('content');
    content.innerHTML = ``;
    content.innerHTML += templatePlayfield();
}

function fillShape(id) {
    if (!fields[id]) {
        if (currentShape == 'cross') {
            currentShape = 'circle';
            document.getElementById('player2').classList.remove('playerInactive');
            document.getElementById('player1').classList.add('playerInactive');
        } else {
            currentShape = 'cross';
            document.getElementById('player1').classList.remove('playerInactive');
            document.getElementById('player2').classList.add('playerInactive');
        }
        fields[id] = currentShape;
        drawShape();
        checkWin();
    }
}

function drawShape() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle' + i).classList.remove('d-none');
        }

        if (fields[i] == 'cross') {
            document.getElementById('cross' + i).classList.remove('d-none');
        }
    }
}

function checkWin() {
    let winner;

    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
    }

    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
    }

    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
    }

    if (!!winner) {
        console.log('GEWONNEN', winner);
    }
}

//Templates-----------------------------------------------------------------------------------

function templateMainMenu() {
    return /* html */ `
    <div class="mainMenuContent">
        <h1>Tic Tac Toe</h1>
        <button onclick="loadGame()" type="button" class="btn btn-secondary mainMenuBtn">Play</button>
        <button type="button" class="btn btn-secondary mainMenuBtn">Placeholder</button>
        <button type="button" class="btn btn-secondary mainMenuBtn">Options</button>
        <button type="button" class="btn btn-secondary mainMenuBtn">Credits</button>
    </div>
    `;
}

function templatePlayfield() {
    return /* html */ `
    <div class="playfieldContent">
        <div class="playfieldHeader">
            <div id="player1" class="displayPlayer playerInactive">
                <img src="img/circle.png">
                <span>Player 1</span>
            </div>
            <div id="player2" class="displayPlayer">
                <img src="img/cross.png">
                <span>Player 2</span>
            </div>
        </div>
        <div class="line" style="top: 326px;"></div>
        <div class="line" style="top: 528px;"></div>
        <div class="line" style="top: 728px;"></div>
        <div class="line spin90" style="top: 528px; left: 200px"></div>
        <div class="line spin90" style="top: 528px;"></div>
        <div class="line spin90" style="top: 528px; left: 602px"></div>
        <div class="line spin45" style="top: 528px;"></div>
        <div class="line spinNeg45" style="top: 528px;"></div>
        <table>
            <tr>
                <td onclick = "fillShape(0)">
                    <img id="circle0" class="shape d-none" src="img/circle.png">
                    <img id="cross0" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "fillShape(1)">
                    <img id="circle1" class="shape d-none" src="img/circle.png">
                    <img id="cross1" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "fillShape(2)">
                    <img id="circle2" class="shape d-none" src="img/circle.png">
                    <img id="cross2" class="shape d-none" src="img/cross.png">
                </td>
            </tr>
            <tr>
                <td onclick = "fillShape(3)">
                    <img id="circle3" class="shape d-none" src="img/circle.png">
                    <img id="cross3" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "fillShape(4)">
                    <img id="circle4" class="shape d-none" src="img/circle.png">
                    <img id="cross4" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "fillShape(5)">
                    <img id="circle5" class="shape d-none" src="img/circle.png">
                    <img id="cross5" class="shape d-none" src="img/cross.png">
                </td>
            </tr>
            <tr>
                <td onclick = "fillShape(6)">
                    <img id="circle6" class="shape d-none" src="img/circle.png">
                    <img id="cross6" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "fillShape(7)">
                    <img id="circle7" class="shape d-none" src="img/circle.png">
                    <img id="cross7" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "fillShape(8)">
                    <img id="circle8" class="shape d-none" src="img/circle.png">
                    <img id="cross8" class="shape d-none" src="img/cross.png">
                </td>
            </tr>
        </table>
    </div>
    `;
}