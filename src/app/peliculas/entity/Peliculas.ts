class Peliculas {
    public id_pelicula: number;
    public nombre_pelicula: string;
    public duracion_pelicula: string;  
    public id_genero: number;

    constructor(id_pelicula: number, nombre_pelicula: string, duracion_pelicula: string, id_genero: number) {
        this.id_pelicula = id_pelicula;
        this.nombre_pelicula = nombre_pelicula;
        this.duracion_pelicula = duracion_pelicula;  
        this.id_genero = id_genero;
    }
}

export default Peliculas;
