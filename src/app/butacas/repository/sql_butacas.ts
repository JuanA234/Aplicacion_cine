export const SQL_BUTACAS={
    GET_ALL: "SELECT b.id_butaca, b.fila, b.columna, b.id_sala \
    FROM butacas b",

    ADD: "INSERT INTO butacas (fila, columna, id_sala) \
    VALUES ($1, $2, $3) RETURNING id_butaca",

    HOW_MANY: "SELECT COUNT(id_butaca) as existe FROM butacas \
    WHERE id_butaca = $1",

    DELETE: "DELETE FROM butacas WHERE id_butaca = $1",

    UPDATE: "UPDATE butacas SET fila = $1, columna = $2, id_sala = $3 \
    WHERE id_butaca= $4",
};
