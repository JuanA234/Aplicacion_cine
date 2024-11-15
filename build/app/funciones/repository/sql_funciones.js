"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_FUNCIONES = void 0;
exports.SQL_FUNCIONES = {
    GET_ALL: "SELECT id_funcion, id_sala, id_horario \
    FROM funciones",
    ADD: "INSERT INTO funciones (id_sala, id_horario) \
    VALUES ($1, $2) RETURNING id_funcion",
    GET_PAGE: "SELECT id_funcion, id_sala, id_horario \
    FROM funciones LIMIT $1 OFFSET $2",
    HOW_MANY: "SELECT COUNT(id_funcion) as existe FROM funciones \
    WHERE id_funcion = $1 ",
    HOW_MANY_SPECIFIC: "SELECT count(id_funcion) as existe FROM funciones \
    WHERE id_sala = $1 AND id_horario = $2",
    DELETE: "DELETE FROM funciones WHERE id_funcion = $1",
    UPDATE: "UPDATE funciones SET id_sala = $1, id_horario = $2 \
    WHERE id_funcion = $3",
    MASSIVE_UPDATE: "UPDATE funciones SET id_horario = $1 WHERE id_sala = $2"
};
