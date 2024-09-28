export const SQL_CINES={
    GET_ALL: "SELECT c.id_cine, c.nombre_cine, c.id_ubicacion \
    FROM cines c ORDER BY c.id_cine ASC LIMIT $1 OFFSET $2",

    ADD: "INSERT INTO cines (nombre_cine, id_ubicacion) \
    VALUES ($1, $2) RETURNING id_cine",

    HOW_MANY: "SELECT COUNT(id_cine) as existe FROM cines \
    WHERE id_cine = $1 OR nombre_cine = $2",

    DELETE: "DELETE FROM cines WHERE id_cine = $1",

    UPDATE: "UPDATE cines SET nombre_cine = $1, id_ubicacion = $2 \
    WHERE id_cine = $3",

    UPDATE_MASIVO: "UPDATE cines SET id_ubicacion = $1 \
    WHERE nombre_cine ILIKE $2",

    TOTAL: "SELECT COUNT(*) FROM cines",
};