import { Router } from "express";
import usuariosControlador from "../controller/UsuariosControlador";


class UsuariosRuta{
    public apiRutaUsuarios:Router

    constructor(){
        this.apiRutaUsuarios = Router();
        this.apiRutaUsuarios.get("/getall", usuariosControlador.dameUsuarios);
        this.apiRutaUsuarios.post("/addcito", usuariosControlador.obtenerUsuarios);
        this.apiRutaUsuarios.delete("/delete/:id_usuario", usuariosControlador.borrarUsuarios);
        this.apiRutaUsuarios.put("/update", usuariosControlador.actualizarUsuarios);
    }
}

const usuariosRuta = new UsuariosRuta();

export default usuariosRuta.apiRutaUsuarios;