export class User {
  // uuid
  public uuid: string;

  // credentials
  public email: string;
  //public password: string;

  // user infos
  public admin?: boolean;
  public prename?: string;
  public surname?: string;
  public team_id?: number;
  public back_number?: number;
  public position?: string;

  public setUuid(uuid: string) {
    this.uuid = uuid;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  // public setPassword(password: string) {
  //   this.password = password;
  // }

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

  public setBackNumber(back_number: number) {
    this.back_number = back_number;
  }

  public setPostition(position: string) {
    this.position = position;
  }
}
