export class StripePayment {
  public uuid: string;
  public recipient: string;
  public description?: string;
  public timestamp: Date;
  public team_id: string;
  public amount: number;
  public type: string;
  public user_id: string;
  public sender: string;
}


export class Transaction extends StripePayment {
  public transaction_token?: string;
}

export class Payout extends StripePayment {
  public payout_token?: string;
}

export class Deposit extends StripePayment {
  public deposit_token?: string;
}
