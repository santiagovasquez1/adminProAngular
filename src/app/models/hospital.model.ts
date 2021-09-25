import { TableUser } from './../interfaces/tableUser.interfaces';


export class Hospital {

  constructor(
    public name: string,
    public _id?: string,
    public image?: string,
    public usuario?: TableUser
  ) { }
}
