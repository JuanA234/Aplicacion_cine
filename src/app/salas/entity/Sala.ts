class Sala{
    public idSala:number;
    public salaCapacidad:number;
    public idCine:number;

    constructor(cod:number, salac:number, cap:number){
         this.idSala = cod;
         this.salaCapacidad= salac;
         this.idCine = cap;
    }
}

export default Sala;