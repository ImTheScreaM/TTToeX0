let area = document.getElementById('map');
let cell = document.getElementsByClassName('cell');
let currentPlayer = document.getElementById('cur-plyr');

// player , win array and player stats

let player = "X"
let stats = {
    'X' : 0,
    'O' : 0,
    'd' : 0
}
let winArr = [
    [1,2,3], 
    [4,5,6], 
    [7,8,9],
    [1,4,7], 
    [2,5,8], 
    [3,6,9], 
    [1,5,9],
    [3,5,7]
]

for (let i = 1; i <= 9 ; i++) {
    area.innerHTML += `<div class='cell' pos=${i}></div>`;
}

for (let i = 0 ;i < cell.length; i++) {
    cell[i].addEventListener('click', clickPlayer ,false);
}

// click player

function clickPlayer() {
    let data = []

    if (!this.innerHTML) {
        this.innerHTML = player;
    }else {
        alert("Error cell full");
        return;
    }

    for (let i in cell) {
        if (cell[i].innerHTML == player) {
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if(checkWin(data)) {
        stats[player] += 1;
        restart(`Win ${player}`)
    } else {
        let draw = true
        for (let i in cell) {
            if (cell[i].innerHTML == '') draw = false;
        }
        if (draw) {
            stats.d += 1
            restart("Draw")
        }
    }

    player = player == 'X' ? 'O' : 'X'
    currentPlayer.innerHTML = player.toUpperCase()
}

// cheking win

function checkWin(data) {
    for (let i in winArr) {
        let win = true;

        for (let j in winArr[i]) {
            let id = winArr[i][j]
            let ind = data.indexOf(id);
            
            if (ind == -1) {
                win = false
            }
        }
        if(win) return true   
    }
    return false;
}

// restart game

function restart(text) {
    alert(text)
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = ''
    }
    updateStats()
}

// update stats

function updateStats() {
    document.getElementById('stats-cross').innerHTML = stats.X
    document.getElementById('stats-zero').innerHTML = stats.O
    document.getElementById('stats-draw').innerHTML = stats.d
}