"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosControlador_1 = __importDefault(require("../controller/UsuariosControlador"));
class UsuariosRuta {
    constructor() {
        this.apiRutaUsuarios = (0, express_1.Router)();
        this.apiRutaUsuarios.get("/getall", UsuariosControlador_1.default.dameUsuarios);
        this.apiRutaUsuarios.post("/addcito", UsuariosControlador_1.default.obtenerUsuarios);
        this.apiRutaUsuarios.get("/getPage", UsuariosControlador_1.default.usuariosPaginadas);
        this.apiRutaUsuarios.delete("/delete/:id_usuario", UsuariosControlador_1.default.borrarUsuarios);
        this.apiRutaUsuarios.put("/update", UsuariosControlador_1.default.actualizarUsuarios);
    }
}
const usuariosRuta = new UsuariosRuta();
exports.default = usuariosRuta.apiRutaUsuarios;
