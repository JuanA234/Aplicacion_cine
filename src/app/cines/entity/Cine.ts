class Cine{
    public idCine:number;
    public nombreCine:String;
    public idUbicacion:number;

    constructor(cod:number, nombreC:String, idU:number){
         this.idCine = cod;
         this.nombreCine= nombreC;
         this.idUbicacion = idU;
    }
}

export default Cine;