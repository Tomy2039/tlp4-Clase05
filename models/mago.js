const Personaje = require("./personaje");

class Mago extends Personaje {
    puedePasar(casilla) {
        return casilla === "fuego";
    }
}

module.exports = Mago;
