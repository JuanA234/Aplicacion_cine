class Usuarios{
    public id_usuario:number;
    public correo:string;
    public contrasena:string;

    constructor(cod:number, nom:string, des:string){
        this.id_usuario = cod;
        this.correo = nom;
        this.contrasena = des;
    }

}

export default Usuarios;
