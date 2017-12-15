export class User {
  public uuid: string;
  public email: string;
  public password: string;
  public admin?: boolean;
  public prename?: string;
  public surname?: string;
  public team_id?: string;
  public back_number?: number;
  public position?: string;
  public balance: number;
  public accountToken: string;
}
