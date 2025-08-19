import Personaje from "./personaje.js";

class Guerrero extends Personaje {
    puedePasar(casilla) {
        return casilla === "roca";
    }
}

export default Guerrero;
