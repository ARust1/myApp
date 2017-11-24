import {User} from "./user-model";
/**
 * Created by jangoSPLASHER169 on 23.11.2017.
 */

export interface EventInvite {
  e_uuid: string;
  user: User;
  event_id: string;
  participation: number;
}
