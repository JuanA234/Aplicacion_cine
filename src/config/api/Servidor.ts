import cors from "cors";
import  express  from "express";
import morgan from "morgan";
import apiSalaRuta from "../../app/salas/route/SalaRuta";
import apiRutaButaca from "../../app/butacas/route/ButacaRuta";
import apiRutaCargos from "../../app/cargos/route/CargosRuta";
import apiRutaCarteleras from "../../app/carteleras/route/CartelerasRuta";
import apiRutaCartelerasCines from "../../app/cartelerasCines/route/CartelerasCinesRuta";
import apiRutaHorario from "../../app/horarios/route/HorarioRuta";
import apiRutaPersonas from "../../app/personas/route/PersonasRuta";
import apiRutaSala from "../../app/salas/route/SalaRuta";

class Servidor{
    public app:express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();

    }
    public exponerEndPoint() :void{
        //Cambiar los endpoints a ingles
       this.app.use("/room", apiRutaSala);
       this.app.use("/butaca", apiRutaButaca);
       this.app.use("/cargos", apiRutaCargos);
       this.app.use("/carteleras", apiRutaCarteleras);
       this.app.use("/cartelerasCines", apiRutaCartelerasCines);
       this.app.use("/horarios", apiRutaHorario);
       this.app.use("/personas", apiRutaPersonas);
    }
    public cargarConfiguracion() :void{
        this.app.set("PORT", 3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({limit: "50mb"}));     
        this.app.use(express.urlencoded({extended:true}));         
    }

    public iniciar():void{
        this.app.listen(this.app.get("PORT"),()=>{
            console.log("Listo me fui", this.app.get("PORT"))
        });
    }
}


export default Servidor;
