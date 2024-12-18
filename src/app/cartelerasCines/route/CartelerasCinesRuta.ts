import { Router } from "express";
import CartelerasCinesControlador from "../controller/CartelerasCinesControlador";

class CartelerasCinesRuta{
    public apiRutaCartelerasCines:Router

    constructor(){
        this.apiRutaCartelerasCines = Router();
        this.apiRutaCartelerasCines.get("/getall", CartelerasCinesControlador.dameCartelerasCines);
        this.apiRutaCartelerasCines.post("/addcito", CartelerasCinesControlador.obtenerCartelerasCines);
        this.apiRutaCartelerasCines.delete("/delete/:idCartelera/:idPelicula", CartelerasCinesControlador.borrarCartelerasCines);
        this.apiRutaCartelerasCines.put("/update", CartelerasCinesControlador.actualizarCartelerasCines);
    }
}

const cartelerasCinesRuta = new CartelerasCinesRuta();

export default cartelerasCinesRuta.apiRutaCartelerasCines;