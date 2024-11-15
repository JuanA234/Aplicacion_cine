class Personas {
    public idPersona: number;
    public nombrePersona: string;
    public fechaNacimientoPersona: Date;
    public idUbicacion: number;
    public idCine: number;
    public idCargo: number;
    public idUsuario: number;

    constructor(cod: number, nom: string, fec: Date, ubi: number, cin: number, car: number,
        usu: number) {
        this.idPersona = cod;
        this.nombrePersona = nom;
        this.fechaNacimientoPersona = fec;
        this.idUbicacion = ubi;
        this.idCine = cin;
        this.idCargo = car;
        this.idUsuario = usu;
    }

}

export default Personas;