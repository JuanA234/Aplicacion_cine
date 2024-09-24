export const SQL_SALAS = {
    GET_ALL: "SELECT s.id_sala, s.sala_capacidad, s.id_cine \
            FROM salas s",
    ADD: "INSERT INTO Salas(id_sala, sala_capacidad, id_cine) \
        VALUES ($1, $2, $3) RETURNING id_sala",
        
    HOW_MANY: "SELECT COUNT (id_sala) as existe FROM salas \
        WHERE id_sala = $1",
    DELETE: "DELETE FROM salas WHERE id_salas = $1",
    UPDATE : "UPDATE salas SET sala_capacidad = $1, id_cine = $2 \
        WHERE id_sala = $3",
};