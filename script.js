function init(){
    showMainMenu();
}

function showMainMenu(){
    let content = document.getElementById('content');
    content.innerHTML = ``;
    content.innerHTML += templateMainMenu();
}

function loadGame(){
    drawField();
}

function drawField(){
    let content = document.getElementById('content');
    content.innerHTML = ``;
    content.innerHTML += templatePlayfield();
}

//Templates-----------------------------------------------------------------------------------

function templateMainMenu(){
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

function templatePlayfield(){
    return /* html */ `
    <div class="playfieldContent">
        <table>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
    `;
}