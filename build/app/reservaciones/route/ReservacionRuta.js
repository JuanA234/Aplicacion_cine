"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReservacionesControlador_1 = __importDefault(require("../controller/ReservacionesControlador"));
class ReservacionRuta {
    constructor() {
        this.apiRutaReservacion = (0, express_1.Router)();
        this.apiRutaReservacion.get("/getall", ReservacionesControlador_1.default.dameReservaciones);
        this.apiRutaReservacion.get("/getPage", ReservacionesControlador_1.default.funcionesPaginadas);
        this.apiRutaReservacion.post("/addicto", ReservacionesControlador_1.default.cogeTuReservacion);
        this.apiRutaReservacion.delete("/delete/:idReservacion", ReservacionesControlador_1.default.borraTuReservacion);
        this.apiRutaReservacion.put("/update", ReservacionesControlador_1.default.actualizaTuTAbla);
    }
}
const reservacionRuta = new ReservacionRuta();
exports.default = reservacionRuta.apiRutaReservacion;
