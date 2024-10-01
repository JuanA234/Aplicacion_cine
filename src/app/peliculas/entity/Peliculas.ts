class Peliculas {
    public idPelicula: number;
    public nombrePelicula: string;
    public duracionPelicula: string;  
    public idGenero: number;

    constructor(idPelicula: number, nombrePelicula: string, duracionPelicula: string, idGenero: number) {
        this.idPelicula = idPelicula;
        this.nombrePelicula = nombrePelicula;
        this.duracionPelicula = duracionPelicula;  
        this.idGenero = idGenero;
    }
}

export default Peliculas;
