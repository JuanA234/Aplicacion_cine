import { Router } from "express";
import cartelerasControlador from "../controller/CartelerasControlador";


class CartelerasRuta{
    public apiRutaCarteleras:Router

    constructor(){
        this.apiRutaCarteleras = Router();
        this.apiRutaCarteleras.get("/getall", cartelerasControlador.dameCarteleras);
        this.apiRutaCarteleras.get("/getPage", cartelerasControlador.cartelerasPaginadas);
        this.apiRutaCarteleras.post("/addcito", cartelerasControlador.obtenerCartelera);
        this.apiRutaCarteleras.delete("/delete/:idCartelera", cartelerasControlador.borrarCartelera);
        this.apiRutaCarteleras.put("/update", cartelerasControlador.actualizarCartelera);
    }
}

const cartelerasRuta = new CartelerasRuta();

export default cartelerasRuta.apiRutaCarteleras;
