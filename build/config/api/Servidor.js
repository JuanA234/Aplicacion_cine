"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const SalaRuta_1 = __importDefault(require("../../app/salas/route/SalaRuta"));
const ButacaRuta_1 = __importDefault(require("../../app/butacas/route/ButacaRuta"));
const CineRuta_1 = __importDefault(require("../../app/cines/route/CineRuta"));
const ComidaRuta_1 = __importDefault(require("../../app/comidas/route/ComidaRuta"));
const TipoComidaRuta_1 = __importDefault(require("../../app/tipos_comidas/route/TipoComidaRuta"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }
    exponerEndPoint() {
        this.app.use("/room", SalaRuta_1.default);
        this.app.use("/butaca", ButacaRuta_1.default);
        this.app.use("/cine", CineRuta_1.default);
        this.app.use("/comida", ComidaRuta_1.default);
        this.app.use("/tipocomida", TipoComidaRuta_1.default);
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
