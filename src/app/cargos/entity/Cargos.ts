class Cargos{
    public idCargo:number;
    public nombreCargo:string;
    public descripcionCargo:string;

    constructor(cod:number, nom:string, des:string){
        this.idCargo = cod;
        this.nombreCargo = nom;
        this.descripcionCargo = des;
    }

}

export default Cargos;

