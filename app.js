const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player');
const modal = new bootstrap.Modal('#myModal');
// const modal = document.querySelector(`#myModal`);
const beyonce = document.querySelectorAll(`#beyonce`)[0]
const audio = document.querySelector('audio')

beyonce.style.backgroundImage = 'url(images/Villian_Images/beyonce.jpg)';

const playerSpeed = 35
const beyonceSpeed = 0

let isPlaying = true
let playerPosition = { x: 0, y: 0 }
let beyoncePosition = { x: 300, y: 300 }

/**
 * Esta función detecta cuando Beyonce ya te alcanzó
 */
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

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
};

function showModal () {
    modal.show();
};

function setBeyonceImg() {
    beyonce.style.backgroundImage = 'url(images/Villian_Images/beyonce.jpg)';
};

function setClaudiaImg() {
    beyonce.style.backgroundImage = 'url(images/Villian_Images/claudia_shembaun.jpg)';
    beyonce.style.backgroundSize = "cover";
    beyonce.style.backgroundPosition = "center";
}

function setLinuxImg() {
    beyonce.style.backgroundImage = 'url(images/Villian_Images/penguin.png)';
    beyonce.style.backgroundSize = "cover";
    beyonce.style.backgroundPosition = "center";
}

function setSingleSong() {
    audio.src = "music/single.mp3";
    audio.play();
};

function setGasSong() {
    audio.src = "music/gas_gas_gas.mp3";
    audio.play();
};

function setMarioSong() {
    audio.src = "music/mario_song.mp3";
    audio.play();
};

window.addEventListener('keydown', movePlayer)
window.addEventListener('load', () => {
    audio.play()
    gameLoop()
})