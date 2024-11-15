"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneroDAO_1 = __importDefault(require("../DAO/GeneroDAO"));
const Genero_1 = __importDefault(require("../entity/Genero"));
class GeneroControlador extends GeneroDAO_1.default {
    dameGeneros(req, res) {
        GeneroDAO_1.default.obtenerTodo([], res);
    }
    cogeTuGenero(req, res) {
        const objCubi = new Genero_1.default(0, "");
        objCubi.nombreGenero = req.body.nombreGenero;
        GeneroDAO_1.default.grabeloYa(objCubi, res);
    }
    funcionesPaginadas(req, res) {
        GeneroDAO_1.default.vistaPaginada(req, res);
    }
    borraTuGenero(req, res) {
        if (isNaN(Number(req.params.idGenero))) {
            res.status(400).json({ respuesta: "Y el codigo mi vale" });
        }
        else {
            const codiguito = Number(req.params.idGenero);
            const objCubi = new Genero_1.default(codiguito, "");
            GeneroDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuGenero(req, res) {
        const objCubi = new Genero_1.default(0, "");
        objCubi.idGenero = Number(req.body.idGenero);
        objCubi.nombreGenero = req.body.nombreGenero;
        GeneroDAO_1.default.actualizaloYa(objCubi, res);
    }
}
const generoControlador = new GeneroControlador();
exports.default = generoControlador;
