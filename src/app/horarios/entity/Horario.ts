class Horario{
    public idHorario:number;
    public fecha:string;
    public hora:string;
    public idPelicula:number;

    constructor(cod:number, date:string, time:string, codPel:number){
        this.idHorario = cod;
        this.fecha = date;
        this.hora = time;
        this.idPelicula = codPel;
    }
}

export default Horario;