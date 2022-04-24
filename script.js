let fields = [];
let gameOver = false;
let currentShape = '';
let cpuGame = false;
let cpuTime = false;
let plopSound = new Audio('sounds/plop.mp3');
let endSound = new Audio('sounds/end.mp3');
let backgroundSound = new Audio('sounds/background.mp3');
let effectVolume = 50;
let musicVolume = 50;

//options////////////////////////////////////////////////////////////////////////////////////

plopSound.volume = 0.5;
endSound.volume = 0.5;
backgroundSound.volume = 0.5;
backgroundSound.loop = true;

//functions//////////////////////////////////////////////////////////////////////////////////

function init() {
    resetGame();
    showMainMenu();
    mergeAudio();
    backgroundSound.play(); 
}

function mergeAudio() {
    plopSound.volume = effectVolume / 100;
    endSound.volume = effectVolume / 100;
    backgroundSound.volume = musicVolume / 100;
}

function calcAudioMusic(dir) {
    if (dir == 0) {
        if (musicVolume <= 0) {
            return;
        } else {
            musicVolume = musicVolume - 10;
        }
    } else if (dir == 1) {
        if (musicVolume >= 100) {
            return;
        } else {
            musicVolume = musicVolume + 10;
        }
    }
    musicVolume = Math.round(musicVolume);
    mergeAudio();
    showOptions();
}

function calcAudioEffects(dir) {
    if (dir == 0) {
        if (effectVolume <= 0) {
            return;
        } else {
            effectVolume = effectVolume - 10;
        }
    } else if (dir == 1) {
        if (effectVolume >= 100) {
            return;
        } else {
            effectVolume = effectVolume + 10;
        }
    }
    effectVolume = Math.round(effectVolume);
    mergeAudio()
    showOptions();
}


function resetGame() {
    fields = [];
    gameOver = false;
    currentShape = '';
    cpuGame = false;
}

function showMainMenu() {
    let content = document.getElementById('content');
    content.innerHTML = ``;
    content.innerHTML += templateMainMenu();
}

function loadGame(cpu) {
    drawField()
    if (cpu) {
        cpuGame = true;
    }
}

function drawField() {
    let content = document.getElementById('content');
    content.innerHTML = ``;
    content.innerHTML += templatePlayfield();
}

function checkCPU(id) {
    if (cpuGame) {
        if (!cpuTime) {
            cpuTime = true;
            fillShape(id);
        }
    } else {
        fillShape(id);
    }
}

function cpuMove() {
    let emptyFields = [];
    for (let i = 0; i < 8; i++) {
        if (!fields[i]) {
            emptyFields.push(i);
        }
    }
    let randID = emptyFields[Math.floor(Math.random() * emptyFields.length)];
    cpuTime = false;
    fillShape(randID);
}

function fillShape(id) {
    if (!fields[id] && !gameOver) {
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
        plopSound.play();
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

function checkDraw() {
    if (fields[0] && fields[1] && fields[2] && fields[3] && fields[4] && fields[5] && fields[6] && fields[7] && fields[8]) {
        gameOver = true;
        setTimeout(function () {
            document.getElementById('endCardImage').classList.remove('d-none');
            document.getElementById('endCardBtn').classList.remove('d-none');
        }, 1000);
    } else {
        return;
    }
}

function checkWin() {
    checkDraw();
    let winner;

    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('winLine0').style.transform = 'scaleX(1)';
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('winLine1').style.transform = 'scaleX(1)';
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('winLine2').style.transform = 'scaleX(1)';
    }

    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('winLine3').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('winLine4').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('winLine5').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('winLine6').style.transform = 'rotate(45deg) scaleX(1.5)';
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('winLine7').style.transform = 'rotate(135deg) scaleX(1.5)';
    }

    if (!!winner) {
        gameOver = true;
        setTimeout(function () {
            document.getElementById('endCardImage').classList.remove('d-none');
            document.getElementById('endCardBtn').classList.remove('d-none');
            endSound.play();
        }, 1000);
    }

    if (cpuTime) {
        setTimeout(function () {
            cpuMove()
        }, 1000);
    }
}

function endGame() {
    init();
}

function showCredits() {
    let content = document.getElementById('content');
    content.innerHTML = ``;
    content.innerHTML += templateCredits();
}

function showOptions() {
    let content = document.getElementById('content');
    content.innerHTML = ``;
    content.innerHTML += templateOptions();
}

//Templates///////////////////////////////////////////////////////////////////////////////////////

function templateMainMenu() {
    return /* html */ `
    <div class="mainMenuContent">
        <h1>Tic Tac Toe</h1>
        <button onclick="loadGame(false)" type="button" class="btn btn-secondary mainMenuBtn">Player vs. Player</button>
        <button onclick="loadGame(true)" type="button" class="btn btn-secondary mainMenuBtn">Player vs. CPU</button>
        <button onclick="showOptions()" type="button" class="btn btn-secondary mainMenuBtn">Options</button>
        <button onclick="showCredits()" type="button" class="btn btn-secondary mainMenuBtn">Credits</button>
    </div>
    `;
}

function templatePlayfield() {
    return /* html */ `
    <img id="endCardImage" class="endCardImage d-none" src="img/game-over.png">
    <button onclick="endGame()" id="endCardBtn" type="button" class="endCardBtn btn btn-primary btn-lg d-none">Back to main menu</button>
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
        
        <table>
        <div id="winLine0" class="line" style="top: 215px; left: 46px;"></div>
        <div id="winLine1" class="line" style="top: 401px; left: 46px;"></div>
        <div id="winLine2" class="line" style="top: 586px; left: 46px;"></div>
        <div id="winLine3" class="line spin90" style="top: 367px; left: -155px;"></div>
        <div id="winLine4" class="line spin90" style="top: 350px; left: 47px;"></div>
        <div id="winLine5" class="line spin90" style="top: 333px; left: 247px"></div>
        <div id="winLine6" class="line spin45" style="top: 328px; left: 53px;"></div>
        <div id="winLine7" class="line spinNeg45" style="top: 313px; left: 40px;"></div>
            <tr>
                <td onclick = "checkCPU(0)">
                    <img id="circle0" class="shape d-none" src="img/circle.png">
                    <img id="cross0" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "checkCPU(1)">   
                    <img id="circle1" class="shape d-none" src="img/circle.png">
                    <img id="cross1" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "checkCPU(2)">
                    <img id="circle2" class="shape d-none" src="img/circle.png">
                    <img id="cross2" class="shape d-none" src="img/cross.png">
                </td>
            </tr>
            <tr>  
                <td onclick = "checkCPU(3)">
                    <img id="circle3" class="shape d-none" src="img/circle.png">
                    <img id="cross3" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "checkCPU(4)">
                    <img id="circle4" class="shape d-none" src="img/circle.png">
                    <img id="cross4" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "checkCPU(5)">
                    <img id="circle5" class="shape d-none" src="img/circle.png">
                    <img id="cross5" class="shape d-none" src="img/cross.png">
                </td>
            </tr>
            <tr>
                <td onclick = "checkCPU(6)">
                    <img id="circle6" class="shape d-none" src="img/circle.png">
                    <img id="cross6" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "checkCPU(7)">
                    <img id="circle7" class="shape d-none" src="img/circle.png">
                    <img id="cross7" class="shape d-none" src="img/cross.png">
                </td>
                <td onclick = "checkCPU(8)">
                    <img id="circle8" class="shape d-none" src="img/circle.png">
                    <img id="cross8" class="shape d-none" src="img/cross.png">
                </td>
            </tr>
        </table>
    </div>
    `;
}

function templateCredits() {
    return /* html */ `
        <div class="mainMenuContent">
            <h1>Credits</h1>
            <div class="card" style="width: 32rem;">
                <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Creator:</b> Dominik Waldow</li>
                <li class="list-group-item"><b>Idea:</b> DeveloperAkademie</li>
                <li class="list-group-item"><b>Design:</b> DeveloperAkademie and Dominik Waldow</li>
                <li class="list-group-item"><b>Markup:</b> Dominik Waldow</li>
                <li class="list-group-item"><b>Styling:</b> Dominik Waldow</li>
                <li class="list-group-item"><b>Scripting:</b> Dominik Waldow</li>
                <li class="list-group-item">Visit my profile on <a href="https://github.com/ZZDome">GitHub</a></li>
                </ul>
            </div>
            <button onclick="showMainMenu()" type="button" class="btn btn-secondary mainMenuBtn">Back</button>
        </div>
    `;
}

function templateOptions() {
    return /* html */ `
        <div class="mainMenuContent">
            <h1>Options</h1>
            <div class="card" style="width: 32rem;">
                <div class="card-header">
                    Sound options
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        Music
                        <button onclick="calcAudioMusic(0)" type="button" class="btn btn-secondary btn-sm"><</button>
                        ${musicVolume}%
                        <button onclick="calcAudioMusic(1)" type="button" class="btn btn-secondary btn-sm">></button>
                    </li>
                    <li class="list-group-item">
                        Effect
                        <button onclick="calcAudioEffects(0)" type="button" class="btn btn-secondary btn-sm"><</button>
                        ${effectVolume}%
                        <button onclick="calcAudioEffects(1)" type="button" class="btn btn-secondary btn-sm">></button>
                    </li>
                </ul>
                <div class="card-header">
                    Game options
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        CPU Level
                        <button onclick="alert('avalable on future update')" type="button" class="btn btn-secondary btn-sm">easy</button>
                        <button onclick="alert('avalable on future update')" type="button" class="btn btn-secondary btn-sm">medium</button>
                        <button onclick="alert('avalable on future update')" type="button" class="btn btn-secondary btn-sm">hard</button>
                    </li>
                </ul>
            </div>
            <button onclick="showMainMenu()" type="button" class="btn btn-secondary mainMenuBtn">Back</button>
        </div>
    `;
}