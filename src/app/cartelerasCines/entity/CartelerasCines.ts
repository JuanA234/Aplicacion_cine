class CartelerasCines{
    public idCartelera: number;
    public idPelicula: number;
    public fechaDesde: Date;
    public fechaHasta: Date;
    public idCine: number;

    constructor(car: number, pel:number, fed:Date, feh:Date, cin: number) {
        this.idCartelera = car;
        this.idPelicula = pel;
        this.fechaDesde = fed;
        this.fechaHasta = feh;
        this.idCine = cin;
    }
}

export default CartelerasCines;
