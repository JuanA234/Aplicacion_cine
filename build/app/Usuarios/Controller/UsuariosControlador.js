"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuarios_1 = __importDefault(require("../entity/Usuarios"));
const UsuariosDAO_1 = __importDefault(require("../DAO/UsuariosDAO"));
class UsuariosControlador extends UsuariosDAO_1.default {
    dameUsuarios(req, res) {
        UsuariosDAO_1.default.obtenerTodo([], res);
    }
    obtenerUsuarios(req, res) {
        const objCubi = new Usuarios_1.default(0, "", "");
        objCubi.id_usuario = req.body.id_usuario;
        objCubi.correo = String(req.body.correo);
        objCubi.contrasena = req.body.contrasena;
        UsuariosDAO_1.default.grabeloYa(objCubi, res);
    }
    borrarUsuarios(req, res) {
        if (isNaN(Number(req.params.id_usuario))) {
            res.status(400).json({ respuesta: "Y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.id_usuario);
            const objcubi = new Usuarios_1.default(codiguito, "", "");
            UsuariosDAO_1.default.borreloYa(objcubi, res);
        }
    }
    actualizarUsuarios(req, res) {
        const objCubi = new Usuarios_1.default(0, "", "");
        objCubi.id_usuario = Number(req.body.id_usuario);
        objCubi.correo = String(req.body.correo);
        objCubi.contrasena = String(req.body.contrasena);
        UsuariosDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const usuariosControlador = new UsuariosControlador();
exports.default = usuariosControlador;
