"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_TIPOS_COMIDAS = void 0;
exports.SQL_TIPOS_COMIDAS = {
    GET_ALL: "SELECT tc.id_tipo_comida, tc.nombre_tipo_comida, tc.descripcion \
    FROM tipos_comida tc",
    ADD: "INSERT INTO tipos_comida (nombre_tipo_comida, descripcion) \
    VALUES ($1, $2) RETURNING id_tipo_comida",
    HOW_MANY: "SELECT COUNT(id_tipo_comida) as existe FROM tipos_comida \
    WHERE id_tipo_comida = $1",
    DELETE: "DELETE FROM tipos_comida WHERE id_tipo_comida = $1",
    UPDATE: "UPDATE tipos_comida SET nombre_tipo_comida = $1, descripcion = $2 \
  WHERE id_tipo_comida = $3",
};
