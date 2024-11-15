class Sala{
    public idSala:number;
    public idCine:number;
    public salaCapacidad:number;

    constructor(cod:number, nom:number, cap:number){
        this.idSala = cod;
        this.idCine = nom;
        this.salaCapacidad = cap;
    }

}

export default Sala;

