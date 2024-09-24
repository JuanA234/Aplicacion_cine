"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const ButacaRuta_1 = __importDefault(require("../../app/butacas/route/ButacaRuta"));
const CargosRuta_1 = __importDefault(require("../../app/cargos/route/CargosRuta"));
const CartelerasRuta_1 = __importDefault(require("../../app/carteleras/route/CartelerasRuta"));
const CartelerasCinesRuta_1 = __importDefault(require("../../app/cartelerasCines/route/CartelerasCinesRuta"));
const HorarioRuta_1 = __importDefault(require("../../app/horarios/route/HorarioRuta"));
const PersonasRuta_1 = __importDefault(require("../../app/personas/route/PersonasRuta"));
const SalaRuta_1 = __importDefault(require("../../app/salas/route/SalaRuta"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }
    exponerEndPoint() {
        //Cambiar los endpoints a ingles
        this.app.use("/room", SalaRuta_1.default);
        this.app.use("/butaca", ButacaRuta_1.default);
        this.app.use("/cargos", CargosRuta_1.default);
        this.app.use("/carteleras", CartelerasRuta_1.default);
        this.app.use("/cartelerasCines", CartelerasCinesRuta_1.default);
        this.app.use("/horarios", HorarioRuta_1.default);
        this.app.use("/personas", PersonasRuta_1.default);
    }
    cargarConfiguracion() {
        this.app.set("PORT", 3123);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "50mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    iniciar() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo me fui", this.app.get("PORT"));
        });
    }
}
exports.default = Servidor;
