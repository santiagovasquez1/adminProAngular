interface _hospitalUser {
  _id: string,
  name: string,
  image: string,
}

export class Hospital {

  constructor(
    public name: string,
    public _id?: string,
    public image?: string,
    public usuario?: _hospitalUser
  ) { }
}
