"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_SALAS = void 0;
exports.SQL_SALAS = {
    GET_ALL: "SELECT s.id_sala, s.sala_capacidad,  s.id_cine \
    FROM salas s",
    GET_PAGE: "SELECT s.id_sala, s.sala_capacidad, s.id_cine \
    FROM salas s LIMIT $1 OFFSET $2",
    ADD: "INSERT INTO salas (sala_capacidad, id_cine) \
    VALUES ($1, $2) RETURNING id_sala",
    HOW_MANY: "SELECT COUNT(id_sala) as existe FROM salas \
    WHERE id_sala = $1",
    HOW_MANY_CINE: "SELECT COUNT(id_cine) as existe FROM salas \
    WHERE id_cine = $1",
    DELETE: "DELETE FROM salas WHERE id_sala = $1",
    UPDATE: "UPDATE salas SET sala_capacidad = $1, id_cine = $2 \
    WHERE id_sala = $3",
};
