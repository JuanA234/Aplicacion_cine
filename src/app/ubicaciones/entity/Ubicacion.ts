class Ubicacion{
    public idUbicacion : number;
    public nombreUbicacion : string;
    public idPadre : number;

    constructor(cod:number, nom:string, codPad:number) {
        this.idUbicacion = cod;
        this.nombreUbicacion = nom;
        this.idPadre = codPad;
    }
}

export default Ubicacion;
