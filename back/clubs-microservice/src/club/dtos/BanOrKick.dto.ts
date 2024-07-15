export enum clubType {
  kick = 'kick',
  ban = 'ban',
}

export class BanOrKickDto {
  user: string;

  club: string;

  bannedBy: string;

  reason: string;

  periodTo: string;

  type: clubType;
}
