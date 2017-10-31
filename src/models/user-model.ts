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

  constructor(userData?: any) {
    this.uuid = userData.uuid;
    this.email = userData.email;
    this.password = userData.password;
    this.admin = userData.admin;
    this.prename = userData.prename;
    this.surname = userData.surname;
    this.team_id = userData.team_id;
    this.back_number = userData.back_number;
    this.position = userData.position;
  }
}
