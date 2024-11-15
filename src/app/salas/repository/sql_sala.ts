<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
export const SQL_SALAS={
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

    MASSIVE_UPDATE: "UPDATE salas SET sala_capacidad = $1 WHERE id_cine = $2",
<<<<<<< HEAD
};
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
};
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
