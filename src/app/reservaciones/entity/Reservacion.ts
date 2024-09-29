class Reservacion {
    idReservacion: number;
    idPersona: number;
    idFuncion: number;
    idButaca: number;
    constructor(idReservacion: number, idPersona: number, idFuncion: number, idButaca: number) {
        this.idReservacion = idReservacion;
        this.idButaca = idButaca;
        this.idPersona = idPersona;
        this.idFuncion = idFuncion;
    }
}

export default Reservacion;