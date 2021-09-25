import { TableUser } from './../interfaces/tableUser.interfaces';
import { Hospital } from './hospital.model';


export class Medico {
  constructor(
    public name: string,
    public uid?: string,
    public image?: string,
    public usuario?: TableUser,
    public hospital?: Hospital,
  ) {

  }
}
