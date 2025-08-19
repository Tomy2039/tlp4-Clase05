export default class Personaje {
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
    if (valor < 0) {
      throw new Error("La posición no puede ser negativa");
    }
    this.#posicion = valor;
  }

  perderVida() {
    if (this.#capa) {
      this.#capa = false;
      return { estado: "capaRota" };
    } else {
      this.#vidas--;

      if (this.#vidas === 1) {
        return { estado: "ultimaVida" };
      }

      if (this.#vidas <= 0) {
        this.#posicion = 0;
        this.#vidas = 3;
        this.#capa = true;
        return { estado: "reinicio" };
      }

      return { estado: "perdioVida", vidasRestantes: this.#vidas };
    }
  }

  recuperarVidas() {
    this.#vidas = 3;
    this.#capa = true;
  }

  puedePasar(casilla) {
    return true;
  }
}