import { Response, Request } from "express";
import ComidaCineDAO from "../dao/ComidaCineDAO";
import ComidaCine from "../entity/ComidaCine";

class ComidaCineControlador extends ComidaCineDAO{

    public dameComidasCines(req:Request, res:Response){
        ComidaCineDAO.obtenerTodo([], res);
    }

    public cogeTuComidaCine(req: Request, res: Response): void{
        const objCubi: ComidaCine = new ComidaCine(0, 0, 0, 0, 0);
        objCubi.precio = req.body.precio;
        objCubi.cantidadDisponible = req.body.cantidadDisponible;
        objCubi.idComida = req.body.idComida;
        objCubi.idCine = req.body.idCine;
        ComidaCineDAO.grabeloYa(objCubi, res);
    }

    public borraTuComidaCine(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idMenu))) {
          res.status(400).json({ respuesta: "Y el código mi vale?" });
        } else {
          const codiguito = Number(req.params.idMenu);
          const objCubi: ComidaCine = new ComidaCine(codiguito, 0, 0, 0, 0);
          ComidaCineDAO.borreloYa(objCubi, res);
        }
      }

      public actualizaTuComidaCine(req: Request, res: Response): void {
        const objCubi: ComidaCine = new ComidaCine(0, 0, 0, 0, 0);
        objCubi.idMenu = Number(req.body.idMenu);
        objCubi.precio = Number(req.body.precio);
        objCubi.cantidadDisponible = Number(req.body.cantidadDisponible);
        objCubi.idComida = Number(req.body.idComida);
        objCubi.idCine = Number(req.body.idCine);
        ComidaCineDAO.actualiceloYa(objCubi, res);
      }

      public actualizaTuComidaMasivoCine(req: Request, res: Response): void {
        const objCubi: ComidaCine = new ComidaCine(0, 0, 0, 0, 0);
        objCubi.idMenu = Number(req.body.idMenu);
        objCubi.precio = Number(req.body.precio);
        objCubi.cantidadDisponible = Number(req.body.cantidadDisponible);
        objCubi.idComida = Number(req.body.idComida);
        objCubi.idCine = Number(req.body.idCine);
        ComidaCineDAO.massiveUpdate(objCubi, res);
      }

      public massiveDelete(req: Request, res: Response): void {
          const codiguito = Number(req.params.idMenu);
          const objCubi: ComidaCine = new ComidaCine(codiguito, 0, 0, 0, 0);
          ComidaCineDAO.deleteMasivo(objCubi, res);
        
      }

}

const comidaCineControlador = new ComidaCineControlador();

export default comidaCineControlador;
