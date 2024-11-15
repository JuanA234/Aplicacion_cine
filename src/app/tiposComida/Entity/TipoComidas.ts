class TipoComida{
    public idTipoComida:number;
    public nombreTipoComida:String;
    public descripcion:String;

    constructor(cod:number, nombreC:String, idU:String){
         this.idTipoComida = cod;
         this.nombreTipoComida= nombreC;
         this.descripcion = idU;
    }
}

export default TipoComida;