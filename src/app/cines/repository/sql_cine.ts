export const SQL_CINES={
    GET_ALL: "SELECT c.id_cine, c.nombre_cine, c.id_ubicacion \
    FROM cines c",

    ADD: "INSERT INTO cines (nombre_cine, id_ubicacion) \
    VALUES ($1, $2) RETURNING id_cine",

    HOW_MANY: "SELECT COUNT(id_cine) as existe FROM cines \
    WHERE id_cine = $1",

    DELETE: "DELETE FROM cines WHERE id_cine = $1",

    UPDATE: "UPDATE cines SET nombre_cine = $1, id_ubicacion = $2 \
    WHERE id_cine = $3",
};