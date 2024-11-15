export const SQL_BUTACAS={
    GET_ALL: "SELECT b.id_butaca, b.fila, b.columna, b.id_sala \
    FROM butacas b ORDER BY b.id_butaca ASC LIMIT $1 OFFSET $2",

    ADD: "INSERT INTO butacas (fila, columna, id_sala) \
    VALUES ($1, $2, $3) RETURNING id_butaca",

    HOW_MANY: "SELECT COUNT(id_butaca) as existe FROM butacas \
    WHERE id_butaca = $1 OR (fila = $2 AND columna = $3)",

    DELETE: "DELETE FROM butacas WHERE id_butaca = $1",

    UPDATE: "UPDATE butacas SET fila = $1, columna = $2, id_sala = $3 \
    WHERE id_butaca= $4",

    UPDATE_MASIVO: "UPDATE butacas set fila = $1, columna = $2, id_sala = $3 \
    where fila = $4",

    EXISTE_OTRA_TABLA: "SELECT COUNT (id_butaca) as existe FROM reservaciones \
    WHERE id_butaca = $1",

    TOTAL: "SELECT COUNT(*) FROM butacas",


};
