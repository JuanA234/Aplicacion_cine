import { Router } from "express";
import cartelerasControlador from "../controller/CartelerasControlador";


class CartelerasRuta{
    public apiRutaCarteleras:Router

    constructor(){
        this.apiRutaCarteleras = Router();
        this.apiRutaCarteleras.get("/getall", cartelerasControlador.dameCarteleras);
<<<<<<< HEAD
<<<<<<< HEAD
=======
        this.apiRutaCarteleras.get("/getPage", cartelerasControlador.cartelerasPaginadas);
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
        this.apiRutaCarteleras.get("/getPage", cartelerasControlador.cartelerasPaginadas);
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
        this.apiRutaCarteleras.post("/addcito", cartelerasControlador.obtenerCartelera);
        this.apiRutaCarteleras.delete("/delete/:idCartelera", cartelerasControlador.borrarCartelera);
        this.apiRutaCarteleras.put("/update", cartelerasControlador.actualizarCartelera);
    }
}

const cartelerasRuta = new CartelerasRuta();

export default cartelerasRuta.apiRutaCarteleras;
