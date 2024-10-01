"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_COMIDA_CINE = void 0;
exports.SQL_COMIDA_CINE = {
    GET_ALL: "SELECT cc.id_menu, cc.precio, cc.cantidad_disponible, cc.id_comida, cc.id_cine \
            FROM comida_cine cc",
    ADD: "INSERT INTO comida_cine(precio, cantidad_disponible, id_comida, id_cine) \
            VALUES ($1, $2, $3, $4) RETURNING id_menu",
    EXISTE: "SELECT COUNT (id_menu) as existe FROM comida_cine \
            WHERE id_menu = $1",
    DELETE: "DELETE FROM comida_cine WHERE id_menu = $1",
    UPDATE: "UPDATE comida_cine SET precio = $1, cantidad_disponible = $2, id_comida = $3, id_cine = $4 \
            WHERE id_menu = $5",
    UPDATE_MASIVO: "UPDATE comida_cine SET precio = $1 \
            WHERE id_comida = $2",
    GET_NAME_REPEATED: "SELECT COUNT(id_menu) as repetidos FROM comida_cine \
            WHERE id_comida = $1 and id_cine = $2",
    TOTAL: "SELECT COUNT(*) FROM comida_cine"
};
