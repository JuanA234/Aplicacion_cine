export const SQL_GENEROS = {
    GET_ALL : "SELECT id_genero, nombre_genero FROM generos",
    GET_PAGE: "SELECT id_genero, nombre_genero \
    FROM generos LIMIT $1 OFFSET $2",
    ADD : "INSERT INTO generos (nombre_genero) VALUES ($1) RETURNING id_genero",
    HOW_MANY : "SELECT COUNT(id_genero) as existe FROM generos WHERE id_genero = $1 OR nombre_genero = $2",
    DELETE : "DELETE FROM generos WHERE id_genero = $1",
    UPDATE : "UPDATE generos SET nombre_genero = $1 WHERE id_genero = $2"
};