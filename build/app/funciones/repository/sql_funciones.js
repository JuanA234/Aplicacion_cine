"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_FUNCIONES = void 0;
exports.SQL_FUNCIONES = {
    GET_ALL: "SELECT id_funcion, id_sala, id_horario \
    FROM funciones",
    ADD: "INSERT INTO funciones (id_sala, id_horario) \
    VALUES ($1, $2) RETURNING id_funcion",
    HOW_MANY: "SELECT COUNT(id_funcion) as existe FROM funciones \
    WHERE id_funcion = $1",
    DELETE: "DELETE FROM funciones WHERE id_funcion = $1",
    UPDATE: "UPDATE funciones SET id_sala = $1, id_horario = $2 \
    WHERE id_funcion = $3",
};
