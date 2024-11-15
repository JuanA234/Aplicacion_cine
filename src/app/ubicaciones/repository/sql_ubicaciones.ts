export const SQL_UBICACIONES = {
    GET_ALL: "SELECT u.id_ubicacion, u.nombre_ubicacion, u.id_padre \
            FROM ubicaciones u",
    ADD: "INSERT INTO ubicaciones(nombre_ubicacion, id_padre) \
        VALUES ($1, $2) RETURNING id_ubicacion",
    HOW_MANY: "SELECT COUNT (id_ubicacion) as existe FROM ubicaciones \
        WHERE id_ubicacion = $1",
    DELETE: "DELETE FROM ubicaciones WHERE id_ubicacion = $1",
    UPDATE: "UPDATE ubicaciones SET nombre_ubicacion = $1, id_padre = $2 \
        WHERE id_ubicacion = $3",
    TOTAL: "SELECT COUNT(*) FROM horarios",
    GET_REPEATED: "SELECT COUNT(id_ubicacion) as total_repetidos \
                FROM ubicaciones WHERE nombre_ubicacion = $1 AND id_padre = $2"
};
