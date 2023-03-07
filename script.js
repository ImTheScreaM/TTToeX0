let area = document.getElementById('map');
let cell = document.getElementsByClassName('cell');
let currentPlayer = document.getElementById('curPlyr')

// Player , WinArr and StatPlayer \\

let player = "x"
let stat = {
    'x' : 0,
    'o' : 0,
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
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

for (let i = 0 ;i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick ,false);
}

// ClickPlayer \\

function cellClick() {

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
        stat[player] += 1;
        restart('Win ' + player)
    } else {
        let draw = true
        for (let i in cell) {
            if (cell[i].innerHTML == '') draw = false;
        }
        if (draw) {
            stat.d += 1
            restart("Draw")
        }
    }

    player = player == "x" ? "o" : "x"
    currentPlayer.innerHTML = player.toUpperCase()
}

// CheckWin \\

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

// Restart \\

function restart(text) {
    console.log(stat)
    alert(text)
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = ''
    }
    newStat()
}

// Update Stats \\

function newStat() {
    document.getElementById('stats-cross').innerHTML = stat.x
    document.getElementById('stats-zero').innerHTML = stat.o
    document.getElementById('stats-draw').innerHTML = stat.d
}