"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_CARTELERAS = void 0;
exports.SQL_CARTELERAS = {
    GET_ALL: "SELECT car.id_cartelera, car.id_cine \
            FROM carteleras car",
    ADD: "INSERT INTO Carteleras(id_cartelera, id_cine) \
        VALUES ($1, $2) RETURNING id_cartelera",
    HOW_MANY: "SELECT COUNT (id_cartelera) as existe FROM carteleras \
        WHERE id_cartelera = $1",
    DELETE: "DELETE FROM carteleras WHERE id_cartelera = $1",
    UPDATE: "UPDATE carteleras SET id_cine = $2 \
        WHERE id_cartelera = $1",
};
