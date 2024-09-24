export const SQL_HORARIOS = {
    GET_ALL: "SELECT h.id_horario, h.fecha, h.hora, h.id_pelicula \
            FROM horarios h",
    
    ADD: "INSERT INTO Horarios(id_horario, fecha, hora, id_pelicula) \
            VALUES ($1, $2, $3, $4) RETURNING id_horario",
            
    HOW_MANY: "SELECT COUNT (id_horario) as existe FROM horarios \
            WHERE id_horario = $1",
    DELETE: "DELETE FROM horarios WHERE id_horario = $1",
    UPDATE : "UPDATE horario SET fecha = $1, hora = $2, id_pelicula = $3 \
            WHERE id_horario = $4",
            
};