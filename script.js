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
    if (currentShape == 'cross') {
        currentShape = 'circle';
    } else {
        currentShape = 'cross';
    }
    fields[id] = currentShape;
    drawShape();
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