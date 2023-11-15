import { Event } from "./events";

export type Purchases = {
  tickets: number,
  event: Event
}


export type User =  {
  email: string;
  purchases: Purchases[];
  wishlist: string[];
}

export type UserCredentials = {
  email:string,
  password:string
}

