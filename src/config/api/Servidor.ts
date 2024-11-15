import cors from "cors";
import  express  from "express";
import morgan from "morgan";
import apiSalaRuta from "../../app/salas/route/SalaRuta";
import apiRutaButaca from "../../app/butacas/route/ButacaRuta";
import apiComidaCine from "../../app/comidaCine/route/ComidaCineRuta";
import apiRutaHorario from "../../app/horarios/route/HorarioRuta";

class Servidor{
    public app:express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();

    }
    public exponerEndPoint() :void{
       this.app.use("/room", apiSalaRuta);
       this.app.use("/butaca", apiRutaButaca);
       this.app.use("/menu", apiComidaCine);
       this.app.use("/schedules", apiRutaHorario);
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
