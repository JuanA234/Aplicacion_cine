"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_COMIDA_CINE = void 0;
exports.SQL_COMIDA_CINE = {
    GET_ALL: "SELECT cc.id_menu, cc.precio, cc.cantidad_disponible, cc.id_comida, cc.id_cine \
            FROM comida_cine cc",
    ADD: "INSERT INTO Horarios(fecha, hora, id_pelicula) \
            VALUES ($1, $2, $3) RETURNING id_horario",
    HOW_MANY: "SELECT COUNT (id_horario) as existe FROM horarios \
            WHERE id_horario = $1",
    DELETE: "DELETE FROM horarios WHERE id_horario = $1",
    UPDATE: "UPDATE horario SET fecha = $1, hora = $2, id_pelicula = $3 \
            WHERE id_horario = $4",
};
