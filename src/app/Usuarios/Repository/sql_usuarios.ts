export const SQL_USUARIOS = {
    GET_ALL: "SELECT u.id_usuario, u.correo, u.contrasena \
            FROM usuarios u",

    ADD: "INSERT INTO usuarios (correo, contrasena) \
        VALUES ($1, $2) RETURNING id_usuario",
        
    HOW_MANY: "SELECT COUNT (id_usuario) as existe FROM usuarios \
        WHERE id_usuario = $1",

    DELETE: "DELETE FROM usuarios WHERE id_usuario = $1",

    UPDATE : "UPDATE usuarios SET correo = $1, contrasena = $2 \
        WHERE id_usuario = $3",
};