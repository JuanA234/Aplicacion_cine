export const SQL_COMIDAS={
    GET_ALL: "SELECT c.id_comida, c.nombre_comida, c.id_tipo_comida \
    FROM comidas c ORDER BY c.id_comida ASC LIMIT $1 OFFSET $2",

    ADD: "INSERT INTO comidas (nombre_comida, id_tipo_comida) \
    VALUES ($1, $2) RETURNING id_comida",

    HOW_MANY: "SELECT COUNT(id_comida) as existe FROM comidas \
    WHERE id_comida = $1 OR nombre_comida = $2",

    EXISTE_OTRA_TABLA: "SELECT COUNT (id_)",

    DELETE: "DELETE FROM comidas WHERE id_comida = $1",

    UPDATE: "UPDATE comidas SET nombre_comida = $1, id_tipo_comida = $2 \
    WHERE id_comida = $3",

    UPDATE_MASIVO_POR_LETRA: "UPDATE comidas SET id_tipo_comida = $1 \
    WHERE nombre_comida ILIKE $2",

    UPDATE_MASIVO: "UPDATE comidas SET id_tipo_comida = $1",

    TOTAL: "SELECT COUNT(*) FROM comidas",
};