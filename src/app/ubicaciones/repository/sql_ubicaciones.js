"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_UBICACIONES = void 0;
exports.SQL_UBICACIONES = {
    GET_ALL: "SELECT u.id_ubicacion, u.nombre_ubicacion, u.id_padre \
            FROM ubicaciones u",
    ADD: "INSERT INTO ubicaciones(nombre_ubicacion, id_padre) \
        VALUES ($1, $2) RETURNING id_ubicacion",
    HOW_MANY: "SELECT COUNT (id_ubicacion) as existe FROM ubicaciones \
        WHERE id_ubicacion = $1",
    DELETE: "DELETE FROM ubicaciones WHERE id_ubicacion = $1",
    UPDATE: "UPDATE ubicaciones SET nombre_ubicacion = $1, id_padre = $2 \
        WHERE id_ubicacion = $3",
};
