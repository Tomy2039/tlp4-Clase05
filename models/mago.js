import Personaje from "./personaje.js";

class Mago extends Personaje {
    puedePasar(casilla) {
        return casilla === "fuego";
    }
}

export default Mago;