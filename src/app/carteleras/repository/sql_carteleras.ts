export const SQL_CARTELERAS = {
    GET_ALL: "SELECT car.id_cartelera, car.id_cine \
            FROM carteleras car",

<<<<<<< HEAD
<<<<<<< HEAD
    ADD: "INSERT INTO Carteleras(id_cartelera, id_cine) \
        VALUES ($1, $2) RETURNING id_cartelera",
        
    HOW_MANY: "SELECT COUNT (id_cartelera) as existe FROM carteleras \
        WHERE id_cartelera = $1",

    DELETE: "DELETE FROM carteleras WHERE id_cartelera = $1",

    UPDATE : "UPDATE carteleras SET id_cartelera = $1, id_cine = $2 \
        WHERE id_cartelera = $1",
=======
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
    ADD: "INSERT INTO Carteleras( id_cine) \
        VALUES ($1) RETURNING id_cartelera",
        
    HOW_MANY: "SELECT COUNT (id_cartelera) as existe FROM carteleras \
        WHERE id_cartelera = $1 ",

    DELETE: "DELETE FROM carteleras WHERE id_cartelera = $1",

    UPDATE : "UPDATE carteleras SET id_cine = $2 \
        WHERE id_cartelera = $1",

    GET_PAGE: "SELECT car.id_cartelera, car.id_cine \
    FROM carteleras car LIMIT $1 OFFSET $2",
<<<<<<< HEAD
>>>>>>> aad73346a56658c710226d091211dadaf994c603
=======
>>>>>>> 967d7b17af3889783303ac91bdf06015ff050586
};
