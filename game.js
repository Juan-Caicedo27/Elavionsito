// Variables del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let score = 0;
let fuel = 100;
let gameOver = false;
let obstacles = [];
let fuelCans = [];

const player = {
    x: 50,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    speed: 5,
    color: "red"
};

// Función para crear obstáculos
function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
        color: "green"
    };
    obstacles.push(obstacle);
}

// Función para crear objetos de combustible
function createFuel() {
    const fuelCan = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        width: 30,
        height: 30,
        color: "yellow"
    };
    fuelCans.push(fuelCan);
}

// Actualizar la pantalla
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la nave
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Actualizar obstáculos
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        obstacle.x -= 3; // Mover los obstáculos hacia la izquierda
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Colisión con la nave
        if (obstacle.x < player.x + player.width &&
            obstacle.x + obstacle.width > player.x &&
            obstacle.y < player.y + player.height &&
            obstacle.y + obstacle.height > player.y) {
            gameOver = true;
            alert("¡Game Over! Puntos: " + score);
        }
    }

    // Actualizar objetos de combustible
    for (let i = 0; i < fuelCans.length; i++) {
        const fuelCan = fuelCans[i];
        fuelCan.x -= 3; // Mover las latas de combustible
        ctx.fillStyle = fuelCan.color;
        ctx.fillRect(fuelCan.x, fuelCan.y, fuelCan.width, fuelCan.height);

        // Colisión con la nave (recoger combustible)
        if (fuelCan.x < player.x + player.width &&
            fuelCan.x + fuelCan.width > player.x &&
            fuelCan.y < player.y + player.height &&
            fuelCan.y + fuelCan.height > player.y) {
            fuel = Math.min(fuel + 10, 100); // Aumentar el combustible
            fuelCans.splice(i, 1); // Eliminar el objeto de combustible
            score += 10; // Ganar puntos por recoger el combustible
        }
    }

    // Reducir combustible
    fuel -= 0.1;
    if (fuel <= 0) {
        gameOver = true;
        alert("¡Game Over! Te quedaste sin combustible.");
    }

    // Mostrar puntuación y combustible
    document.getElementById("score").innerText = "Puntos: " + score;
    document.getElementById("fuel").innerText = "Combustible: " + Math.round(fuel) + "%";

    // Crear nuevos obstáculos y latas de combustible
    if (Math.random() < 0.02) createObstacle();
    if (Math.random() < 0.01) createFuel();

    requestAnimationFrame(update); // Llamar a update en el siguiente frame
}

// Mover la nave
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && player.y > 0) {
        player.y -= player.speed;
    } else if (e.key === "ArrowDown" && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
});

// Iniciar el juego
update();
