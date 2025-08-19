const Personaje = require("./personaje");

class Guerrero extends Personaje {
    puedePasar(casilla) {
        return casilla === "roca"; 
    }
}

module.exports = Guerrero;
