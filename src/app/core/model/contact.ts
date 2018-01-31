import { Address } from "./address";

export class Contact {

  public firstName: string;
  public lastName: string;
  public address: Address;
  public email: string;
  public phone: string;
  public bio?: string;
  public gender?: string;
  public favorite?: boolean;
  public created_at?: any;

  constructor() {
    this.address = new Address();
    this.favorite = false;
   }

   valueOf(){
     return this['_id'];
   }

}
