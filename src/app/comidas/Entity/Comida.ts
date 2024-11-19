class Comida{
    public idComida:number;
    public nombreComida:String;
    public idTipoComida:number;

    constructor(cod:number, nombreC:String, idU:number){
         this.idComida = cod;
         this.nombreComida= nombreC;
         this.idTipoComida = idU;
    }
}

export default Comida;