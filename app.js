
const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player');
const modal = new bootstrap.Modal('#myModal');
const modal_01 = new bootstrap.Modal(`#myModal-01`);
const beyonce = document.querySelectorAll(`#beyonce`)[0]
const audio = document.querySelector('audio');
const soundtrack = document.querySelector(`#soundtrack`);
const villian = document.querySelector(`#villian`);
let time = 5;
let mode;

beyonce.style.backgroundImage = 'url(images/Villian_Images/beyonce.jpg)';
audio.play();

let playerSpeed = 35
let beyonceSpeed = 0

let isPlaying = true
let playerPosition = { x: 0, y: 0 }
let beyoncePosition = { x: 300, y: 300 }

function detectCollision () {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x)
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y)

    if (deltaX <= 50 && deltaY <= 50) {
        if(confirm('Beyonce te atrapó! Rápido, dale las gracias para salvar tu vida')) {
            playerPosition.x = Math.floor(Math.random() * (gameArea.clientWidth - 70))
            playerPosition.y = Math.floor(Math.random() * (gameArea.clientHeight - 70))
        } else {
            alert('Perdiste :(')
            isPlaying = false
            audio.pause()
        }
    }
}

function gameLoop () {
    moveBeyonce()
    requestAnimationFrame(gameLoop)
}

function moveBeyonce () {
    if (beyoncePosition.x < playerPosition.x) 
        beyoncePosition.x += beyonceSpeed
    else if (beyoncePosition.x > playerPosition.x)
        beyoncePosition.x -= beyonceSpeed

    if (beyoncePosition.y < playerPosition.y) 
        beyoncePosition.y += beyonceSpeed
    else if (beyoncePosition.y > playerPosition.y)
        beyoncePosition.y -= beyonceSpeed

    updatePosition()
    if (isPlaying)
        detectCollision()
}

function movePlayer (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 25) 
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if(playerPosition.y < gameArea.clientHeight - 70)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x >= 25) 
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if(playerPosition.x < gameArea.clientWidth - 70)
                playerPosition.x += playerSpeed
            break
    }

    updatePosition()
}

function pause () {
    playerSpeed = 0;
    beyonceSpeed = 0;
}

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
};

function showModal () {
    pause();
    audio.pause();
    modal.show();
};

function exitConfigurations() {
    playerSpeed = 35;
    beyonceSpeed = 1;
    audio.play();
};

function setConfigurations() {
    playerSpeed = 35;
    beyonceSpeed = 1;
    setDarkTheme();
    checkDificult();
    modal.hide();
    audio.play();
};

function setBeyonceImg() {
    beyonce.style.backgroundImage = 'url(images/Villian_Images/beyonce.jpg)';
    villian.innerHTML = "Beyonce";
};

function setClaudiaImg() {
    beyonce.style.backgroundImage = 'url(images/Villian_Images/claudia_shembaun.jpg)';
    beyonce.style.backgroundSize = "cover";
    beyonce.style.backgroundPosition = "center";
    villian.innerHTML = "Claudia Shembaun";
}

function setLinuxImg() {
    beyonce.style.backgroundImage = 'url(images/Villian_Images/penguin.png)';
    beyonce.style.backgroundSize = "cover";
    beyonce.style.backgroundPosition = "center";
    villian.innerHTML = "Linux";
}

function setSingleSong() {
    audio.src = "music/single.mp3";
    soundtrack.innerHTML = "Im a single lady";

};

function setGasSong() {
    audio.src = "music/gas_gas_gas.mp3";
    player.style.backgroundImage = "url(images/Player_Images/car-drift.gif)";
    player.style.backgroundSize = "cover";
    player.style.backgroundPosition = "center";
    player.style.backgroundColor = "White"
    soundtrack.innerHTML = "Gas Gas Gas";
};

function setMarioSong() {
    audio.src = "music/mario_song.mp3";
    player.style.backgroundImage = "url(images/Player_Images/yoshi_kart.gif)";
    player.style.backgroundSize = "cover";
    player.style.backgroundPosition = "center";
    player.style.backgroundColor = "White"
    soundtrack.innerHTML = "Mario race 64";
};

function setDarkTheme () {
    const checkBox = document.getElementById("flexSwitchCheckDefault");

    if (checkBox.checked) {
        document.body.classList.add("dark-theme-body");
        document.querySelector(`#title`).classList.add("dark-theme-title");
    } else {
        document.body.classList.remove("dark-theme-body");
        document.querySelector(`#title`).classList.remove("dark-theme-title");
    }

    console.log(checkBox.checked);
}

function checkDificult () {
    if (mode) {
        document.querySelector(`#countdown`).style.display = "flex";
        setInterval(countdown, 1000);
    } else {
        document.querySelector(`#countdown`).style.display = "none";
    }
}

function setTSMode() {
    mode = true;
}

function setISMode() {
    mode = false;
}


function countdown() {
    if (time > 0) {
        time--;
        document.getElementById("seconds").innerHTML = time;
        if (time === 0) {
            modal_01.show();
            pause(); 
        }
    } else {
        clearInterval(interval);
    }
}








window.addEventListener('keydown', movePlayer)
window.addEventListener('load', () => {
    audio.play()
    gameLoop()
})