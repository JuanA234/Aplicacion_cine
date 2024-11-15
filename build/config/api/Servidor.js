"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const SalaRuta_1 = __importDefault(require("../../app/salas/route/SalaRuta"));
const CargosRuta_1 = __importDefault(require("../../app/cargos/route/CargosRuta"));
const CartelerasRuta_1 = __importDefault(require("../../app/carteleras/route/CartelerasRuta"));
const HorarioRuta_1 = __importDefault(require("../../app/horarios/route/HorarioRuta"));
const PersonasRuta_1 = __importDefault(require("../../app/personas/route/PersonasRuta"));
const CartelerasCinesRuta_1 = __importDefault(require("../../app/cartelerasCines/route/CartelerasCinesRuta"));
const UbicacionRuta_1 = __importDefault(require("../../app/ubicaciones/route/UbicacionRuta"));
const CineRuta_1 = __importDefault(require("../../app/cines/Route/CineRuta"));
const ComidaCineRuta_1 = __importDefault(require("../../app/comidaCine/route/ComidaCineRuta"));
const UsuariosRuta_1 = __importDefault(require("../../app/Usuarios/Route/UsuariosRuta"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }
    cargarConfiguracion() {
        this.app.set("PORT", 3123);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        //tamaño maximo de archivo
        this.app.use(express_1.default.json({ limit: "50mb" }));
        //para que soporte la cantidad de cracateres de url
        this.app.use(express_1.default.urlencoded({ extended: true })); //para que soporte la cantidad de caract
    }
    exponerEndPoint() {
        this.app.use("/room", SalaRuta_1.default);
        this.app.use("/charge", CargosRuta_1.default);
        this.app.use("/cartelera", CartelerasRuta_1.default);
        this.app.use("/schedule", HorarioRuta_1.default);
        this.app.use("/person", PersonasRuta_1.default);
        this.app.use("/cinemaBillbord", CartelerasCinesRuta_1.default);
        this.app.use("/location", UbicacionRuta_1.default);
        this.app.use("/cinema", CineRuta_1.default);
        this.app.use("/menu", ComidaCineRuta_1.default);
        this.app.use("/users", UsuariosRuta_1.default);
    }
    iniciar() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo me fui", this.app.get("PORT"));
        });
    }
}
exports.default = Servidor;
