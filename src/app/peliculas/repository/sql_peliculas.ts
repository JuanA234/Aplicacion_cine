export const SQL_PELICULAS = {
    GET_ALL: "SELECT p.id_pelicula, p.nombre_pelicula, p.duracion_pelicula, p.id_genero \
            FROM peliculas p",
    
    ADD: "INSERT INTO Peliculas(nombre_pelicula, duracion_pelicula, id_genero) \
            VALUES ($1, $2, $3) RETURNING id_pelicula",
            
    HOW_MANY: "SELECT COUNT (id_pelicula) as existe FROM peliculas \
            WHERE id_pelicula = $1",

    DELETE: "DELETE FROM peliculas WHERE id_pelicula = $1",
    
    UPDATE : "UPDATE peliculas SET nombre_pelicula = $1, duracion_pelicula = $2, id_genero = $3 \
            WHERE id_pelicula = $4",

    GET_PAGE: "SELECT p.id_pelicula, p.nombre_pelicula, p.duracion_pelicula, p.id_genero \
             FROM peliculas p LIMIT $1 OFFSET $2",


        
            
};