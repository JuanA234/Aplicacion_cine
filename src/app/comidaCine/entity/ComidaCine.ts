class ComidaCine{
    public idMenu:number;
    public precio:number;
    public cantidadDisponible:number;
    public idComida:number;
    public idCine:number;

    constructor(cod:number, price:number, amountAva:number, idCom:number, idCin:number){
        this.idMenu=cod;
        this.precio=price;
        this.cantidadDisponible=amountAva;
        this.idComida=idCom;
        this.idCine=idCin;
    }
}


export default ComidaCine;
