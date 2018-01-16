import {User} from "./user-model";
export class Penalty {
  public uuid?: string;
  public name: string;
  public user: User;
  public user_id?: string;
  public team_id: string;
  public amount: number;
  public paid: boolean;
  public payment_method: number;
  public date_of_payment: Date;
}
