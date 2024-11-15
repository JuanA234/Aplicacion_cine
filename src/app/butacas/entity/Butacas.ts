class Butaca{
    public idButaca:number;
    public fila:String;
    public columna:number;
    public idSala:number;

    
    constructor(idB: number, fil:String, col:number, idS:number){
        this.idButaca = idB;
        this.fila = fil;
        this.columna = col;
        this.idSala = idS;
    }
}


export default Butaca;