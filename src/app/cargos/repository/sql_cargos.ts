export const SQL_CARGOS = {
    GET_ALL: "SELECT c.id_cargo, c.nombre_cargo, c.descripcion_cargo \
            FROM cargos c",

    ADD: "INSERT INTO Cargos(nombre_cargo, descripcion_cargo) \
        VALUES ($1, $2) RETURNING id_cargo",
        
    HOW_MANY: "SELECT COUNT (id_cargo) as existe FROM cargos \
        WHERE id_cargo = $1",

    DELETE: "DELETE FROM cargos WHERE id_cargo = $1",

    UPDATE : "UPDATE cargos SET nombre_cargo = $1, descripcion_cargo = $2 \
        WHERE id_cargo = $3",
};
