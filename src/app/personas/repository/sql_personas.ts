export const SQL_PERSONAS = {
    GET_ALL: "SELECT p.id_persona, p.nombre_persona, p.fecha_nacimiento_persona, \
                    p.id_ubicacion, p.id_cine, p.id_cargo, p.id_usuario \
              FROM personas p",

    GET_PAGE: "SELECT p.id_persona, p.nombre_persona, p.fecha_nacimiento_persona, \
                  p.id_ubicacion, p.id_cine, p.id_cargo, p.id_usuario \
            FROM personas p LIMIT $1 OFFSET $2",

    ADD: "INSERT INTO personas(nombre_persona, fecha_nacimiento_persona, id_ubicacion, id_cine, id_cargo, id_usuario) \
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_persona",

    HOW_MANY: "SELECT COUNT(id_persona) as existe FROM personas \
               WHERE id_persona = $1",

    DELETE: "DELETE FROM personas WHERE id_persona = $1",

    UPDATE: "UPDATE personas SET nombre_persona = $1, fecha_nacimiento_persona = $2, id_ubicacion = $3, \
             id_cine = $4, id_cargo = $5, id_usuario = $6 \
             WHERE id_persona = $7",
};

