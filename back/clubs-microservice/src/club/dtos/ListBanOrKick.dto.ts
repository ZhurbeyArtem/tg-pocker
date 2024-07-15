export class ListBanOrKickDto {
  clubId: string;
  type?: 'ban' | 'kick';
  userId?: string;
}
