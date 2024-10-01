export const SQL_CARGOS = {
    GET_ALL: "SELECT id_cargo, nombre_cargo, descripcion_cargo \
            FROM cargos",

    GET_PAGE: "SELECT id_cargo, nombre_cargo, descripcion_cargo \
            FROM cargos LIMIT $1 OFFSET $2",

    ADD: "INSERT INTO Cargos(nombre_cargo, descripcion_cargo) \
        VALUES ($1, $2) RETURNING id_cargo",
        
    HOW_MANY: "SELECT COUNT (id_cargo) as existe FROM cargos \
        WHERE id_cargo = $1 OR nombre_cargo = $2",


    HOW_MANY_1: "SELECT COUNT (id_cargo) as existe FROM cargos \
    WHERE nombre_cargo LIKE '%' || $1 || '%'",

    DELETE: "DELETE FROM cargos WHERE id_cargo = $1",

    UPDATE : "UPDATE cargos SET nombre_cargo = $1, descripcion_cargo = $2 \
        WHERE id_cargo = $3",
    
    MASSIVE_UPDATE: "UPDATE Cargos SET nombre_cargo = REPLACE(nombre_cargo, $1, $2) \
        WHERE nombre_cargo LIKE '%' || $1 || '%'",

    UPDATE_ALL_NAMES: "UPDATE Cargos SET nombre_cargo = $1",
    UPDATE_ALL_DESC: "UPDATE Cargos SET descripcion_cargo = $1",

    DELETE_ALL:"DELETE FROM cargos"
};
