"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_HORARIOS = void 0;
exports.SQL_HORARIOS = {
    GET_ALL: "SELECT h.id_horario, h.fecha, h.hora, h.id_pelicula \
            FROM horarios h",
    ADD: "INSERT INTO Horarios(fecha, hora, id_pelicula) \
            VALUES ($1, $2, $3) RETURNING id_horario",
    HOW_MANY: "SELECT COUNT (id_horario) as existe FROM horarios \
            WHERE id_horario = $1",
    VERIFY_EXISTENCE_DATE: "SELECT COUNT(*) FROM horarios WHERE fecha = $1",
    DELETE: "DELETE FROM horarios WHERE id_horario = $1",
    UPDATE: "UPDATE horario SET fecha = $1, hora = $2, id_pelicula = $3 \
            WHERE id_horario = $4",
    TOTAL: "SELECT COUNT(*) FROM horarios",
    UPDATE_DATES: "UPDATE horarios \
                SET fecha = CURRENT_DATE + INTERVAL '1 day' \
                WHERE fecha BETWEEN (TO_DATE('01/09/2024', 'DD/MM/YYYY') - INTERVAL '1 day') \
                AND TO_DATE('01/09/2024', 'DD/MM/YYYY')",
    GET_REPEATED: "SELECT COUNT(id_horario) as total_repetidos \
                FROM horarios WHERE fecha = $1 AND hora = $2 AND id_pelicula = $3"
};
