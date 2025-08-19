import promptSync from "prompt-sync";
import Juego from "./juego.js";
import Mago from "./models/mago.js";
import Guerrero from "./models/guerrero.js";

const prompt = promptSync();

console.log("=== Bienvenido al Juego de Aventuras ===");

const tablero = [
  "normal", "fuego", "roca", "monstruo", "normal",
  "trampa", "normal", "fuego", "roca", "monstruo",
  "normal", "trampa", "normal", "fuego", "roca",
  "monstruo", "normal", "trampa", "normal", "fuego",
  "roca", "monstruo", "trampa", "normal", "meta"
];

function crearJugador(numeroDeJugador) {
  const nombre = prompt(`Jugador ${numeroDeJugador}, ingresa tu nombre: `);
  
  if (numeroDeJugador === 1) {
    let tipoDePersonaje;
    do {
      tipoDePersonaje = prompt("Elegí tu personaje (Mago/Guerrero): ").toLowerCase();
    } while (!["mago", "guerrero"].includes(tipoDePersonaje));
    
    return tipoDePersonaje === "mago" ? new Mago(nombre) : new Guerrero(nombre);
  } else {
    const jugador1Clase = jugadorUno instanceof Mago ? "mago" : "guerrero";
    return jugador1Clase === "mago" ? new Guerrero(nombre) : new Mago(nombre);
  }
}

const jugadorUno = crearJugador(1);
const jugadorDos = crearJugador(2);

const juego = new Juego(tablero);
juego.jugar(jugadorUno, jugadorDos);
