export class User {
  public email: string;
  public password: string;
  public admin?: boolean;
  public  team?: string;

  public setEmail(email) {
    this.email = email;
  }

  public setPassword(password) {
    this.password = password;
  }

  public setAdmin(bln) {
    this.admin = bln;
  }

  public setTeam(team) {
    this.team = team;
  }
}
