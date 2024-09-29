export const SQL_RESERVACIONES={
    GET_ALL: "SELECT id_reservacion, id_persona, id_butaca, id_funcion \
    FROM reservaciones",

    ADD: "INSERT INTO reservaciones (id_persona, id_butaca, id_funcion) \
    VALUES ($1, $2, $3) RETURNING id_reservacion",

    HOW_MANY: "SELECT COUNT(id_funcion) as existe FROM reservaciones \
    WHERE id_funcion = $1",

    DELETE: "DELETE FROM reservaciones WHERE id_reservacion = $1",

    UPDATE: "UPDATE reservaciones SET id_persona = $1, id_butaca = $2, id_funcion = $3 \
    WHERE id_reservacion = $4",
}