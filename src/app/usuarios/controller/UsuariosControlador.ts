import { Response, Request } from "express";
import UsuariosDAO from "../DAO/UsuariosDAO";
import Usuarios from "../entity/Usuarios";


class UsuariosControlador extends UsuariosDAO{

    public dameUsuarios(req:Request, res:Response){
        UsuariosDAO.obtenerTodo([], res);
    }

    public obtenerUsuarios(req: Request, res: Response): void {
        const objCubi: Usuarios = new Usuarios(0, "", "");
        objCubi.id_usuario = req.body.id_usuario;
        objCubi.correo = String(req.body.correo);
        objCubi.contrasena = req.body.contrasena;
        UsuariosDAO.grabeloYa(objCubi, res);
    }
    
    public borrarUsuarios(req: Request, res: Response): void {
        if (isNaN(Number(req.params.id_usuario))) {
            res.status(400).json({ respuesta: "Y el código mi vale?"});
        } else {
            const codiguito = Number(req.params.id_usuario);
            const objcubi: Usuarios = new Usuarios(codiguito, "", "");
            UsuariosDAO.borreloYa(objcubi, res);
        }
    }

    public actualizarUsuarios(req: Request, res: Response): void {
        const objCubi: Usuarios = new Usuarios(0, "", "");
        objCubi.id_usuario = Number(req.body.id_usuario);
        objCubi.correo = String(req.body.correo);
        objCubi.contrasena = String(req.body.contrasena)
        UsuariosDAO.actualiceloYa(objCubi, res);
    }
    
}

const usuariosControlador = new UsuariosControlador();
export default usuariosControlador;