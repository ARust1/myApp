export class User {
  public uuid: string;
  public email: string;
  public password: string;
  public admin?: boolean;
  public prename?: string;
  public surname?: string;
  public birthday?: string;
  public city?: string;
  public country?: string = 'DE';
  public address_line?: string;
  public postal_code?: string;
  public state?: string;
  public team_id?: string;
  public back_number?: number;
  public position?: string;
  public balance: number;
  public accountToken: string;
  public profile: Profile;
  public laundry?: boolean;
}

export class Profile {
  constructor(profileImg, file) {
    this.profileImg = profileImg;
    this.file = file;
  }

  public profileImg: string;
  public file: string;


}
