class Usuarios{
    public idUsuario:number;
    public correo:string;
    public contrasena:string;

    constructor(cod:number, nom:string, des:string){
        this.idUsuario = cod;
        this.correo = nom;
        this.contrasena = des;
    }

}

export default Usuarios;

