export const SQL_CARTELERAS_CINES = {
      GET_ALL: "SELECT id_cartelera, id_pelicula, fecha_desde, fecha_hasta, id_cine \
               FROM Carteleras_Cines",
               
      GET_PAGE: "SELECT id_cartelera, id_pelicula, fecha_desde, fecha_hasta, id_cine \
            FROM Carteleras_Cines LIMIT $1 OFFSET $2",

      ADD: "INSERT INTO Carteleras_Cines(id_cartelera, id_pelicula, fecha_desde, fecha_hasta, id_cine) \
          VALUES ($1, $2, $3, $4, $5) RETURNING id_cartelera, id_pelicula",

      HOW_MANY: "SELECT COUNT(*) as existe FROM Carteleras_Cines \
               WHERE id_cartelera = $1 AND id_pelicula = $2",

      DELETE: "DELETE FROM Carteleras_Cines WHERE id_cartelera = $1 AND id_pelicula = $2",

      UPDATE: "UPDATE Carteleras_Cines SET fecha_desde = $3, fecha_hasta = $4, id_cine = $5 \
             WHERE id_cartelera = $1 AND id_pelicula = $2",
};
