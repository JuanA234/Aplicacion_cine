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
const GeneroRuta_1 = __importDefault(require("../../app/generos/route/GeneroRuta"));
const FuncionRuta_1 = __importDefault(require("../../app/funciones/route/FuncionRuta"));
const ReservacionRuta_1 = __importDefault(require("../../app/reservaciones/route/ReservacionRuta"));
const PeliculasRuta_1 = __importDefault(require("../../app/peliculas/route/PeliculasRuta"));
const UsuariosRuta_1 = __importDefault(require("../../app/usuarios/route/UsuariosRuta"));
const CartelerasRuta_1 = __importDefault(require("../../app/carteleras/route/CartelerasRuta"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }
    exponerEndPoint() {
        this.app.use("/rooms", SalaRuta_1.default);
        this.app.use("/butacas", ButacaRuta_1.default);
        this.app.use("/genders", GeneroRuta_1.default);
        this.app.use("/functions", FuncionRuta_1.default);
        this.app.use("/bookings", ReservacionRuta_1.default);
        this.app.use("/movies", PeliculasRuta_1.default);
        this.app.use("/users", UsuariosRuta_1.default);
        this.app.use("/billboards", CartelerasRuta_1.default);
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
