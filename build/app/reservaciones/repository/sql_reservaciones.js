"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_RESERVACIONES = void 0;
exports.SQL_RESERVACIONES = {
    GET_ALL: "SELECT id_reservacion, id_persona, id_butaca, id_funcion \
    FROM reservaciones",
    HOW_MANY_ESPECIFIC: "SELECT count(id_reservacion) as existe FROM reservaciones\
    where id_persona = $1 AND id_butaca = $2 AND id_funcion = $3",
    GET_PAGE: "SELECT id_reservacion, id_persona, id_butaca, id_funcion \
    FROM reservaciones LIMIT $1 OFFSET $2",
    ADD: "INSERT INTO reservaciones (id_persona, id_butaca, id_funcion) \
    VALUES ($1, $2, $3) RETURNING id_reservacion",
    HOW_MANY_PERSONS: "SELECT COUNT(id_persona) as existe from reservaciones WHERE id_persona = $1",
    HOW_MANY: "SELECT COUNT(id_reservacion) as existe FROM reservaciones \
    WHERE id_funcion = $1",
    RESERV_ALL: "UPDATE reservaciones SET id_persona = $1",
    DELETE: "DELETE FROM reservaciones WHERE id_reservacion = $1",
    UPDATE: "UPDATE reservaciones SET id_persona = $1, id_butaca = $2, id_funcion = $3 \
    WHERE id_reservacion = $4",
};
