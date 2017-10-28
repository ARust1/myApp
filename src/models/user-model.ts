export class User {
  public uuid: string;
  public email: string;
  public password: string;
  public admin?: boolean;
  public prename?: string;
  public surname?: string;
  public team_id?: number;

  public setUuid(uuid: string) {
    this.uuid = uuid;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setAdmin(bln: boolean) {
    this.admin = bln;
  }

  public setTeamId(team_id: number) {
    this.team_id = team_id;
  }

  public setPrename(prename: string) {
    this.prename = prename;
  }

  public setSurname(surname: string) {
    this.surname = surname;
  }
}
