class Personaje {
    #vidas;
    #posicion;
    #capa;

    constructor(nombre) {
        this.nombre = nombre;
        this.#posicion = 0;
        this.#vidas = 3;
        this.#capa = true;
    }

    get vidas() {
        return this.#vidas;
    }

    get posicion() {
        return this.#posicion;
    }

    set posicion(valor) {
        if (valor < 0) throw new Error("La posición no puede ser negativa");
        this.#posicion = valor;
    }

    perderVida() {
        if (this.#capa) {
            console.log(`${this.nombre}, la capa te salvó pero se rompió.`);
            this.#capa = false;
        } else {
            this.#vidas--;
            console.log(`${this.nombre}, perdiste una vida. Te quedan ${this.#vidas}.`);

            if (this.#vidas === 1) {
                console.log(`${this.nombre}, te queda 1 sola vida. Probá suerte.`);
                return true; // señal para el juego
            }

            if (this.#vidas <= 0) {
                console.log(`${this.nombre} quedó fuera. Vuelve al inicio con 3 vidas y capa nueva.`);
                this.#posicion = 0;
                this.#vidas = 3;
                this.#capa = true;
            }
        }
        return false;
    }

    recuperarVidas() {
        this.#vidas = 3;
        this.#capa = true;
    }

    puedePasar(casilla) {
        return true; 
    }
}

module.exports = Personaje;
