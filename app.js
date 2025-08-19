// index.js
const prompt = require("prompt-sync")();
const Juego = require("./juego");
const Mago = require("./models/mago");
const Guerrero = require("./models/guerrero");

console.log("=== Bienvenido al Juego de Aventuras ===");

const tablero = [
    "normal", "fuego", "roca", "monstruo", "normal",
    "trampa", "normal", "fuego", "roca", "monstruo",
    "normal", "trampa", "normal", "fuego", "roca",
    "monstruo", "normal", "trampa", "normal", "fuego",
    "roca", "monstruo", "trampa", "normal", "meta"
];

function crearJugador(num) {
    const nombre = prompt(`Jugador ${num}, nombre: `);
    let tipo;
    do {
        tipo = prompt("Elegí tu personaje (Mago/Guerrero): ").toLowerCase();
    } while (!["mago", "guerrero"].includes(tipo));
    return tipo === "mago" ? new Mago(nombre) : new Guerrero(nombre);
}

const j1 = crearJugador(1);
const j2 = crearJugador(2);

const juego = new Juego(tablero);
juego.jugar(j1, j2);
