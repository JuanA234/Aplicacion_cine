export const SQL_TIPOS_COMIDAS={
    GET_ALL: "SELECT tc.id_tipo_comida, tc.nombre_tipo_comida, tc.descripcion \
    FROM tipos_comida tc ORDER BY tc.id_tipo_comida ASC LIMIT $1 OFFSET $2",

    ADD: "INSERT INTO tipos_comida (nombre_tipo_comida, descripcion) \
    VALUES ($1, $2) RETURNING id_tipo_comida",

    HOW_MANY: "SELECT COUNT(id_tipo_comida) as existe FROM tipos_comida \
    WHERE id_tipo_comida = $1 OR nombre_tipo_comida = $2" ,

    DELETE: "DELETE FROM tipos_comida WHERE id_tipo_comida = $1",

    UPDATE: "UPDATE tipos_comida SET nombre_tipo_comida = $1, descripcion = $2 \
  WHERE id_tipo_comida = $3",

    UPDATE_MASIVO: "UPDATE tipos_comida SET descripcion = $1 \
    WHERE nombre_tipo_comida ILIKE $2",

    TOTAL: "SELECT COUNT(*) FROM tipos_comida",
};