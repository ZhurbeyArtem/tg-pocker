import { Language, Club } from '@lib/entities';
export class UpdateUserInfoDto {
  id: string;

  role?: string[];

  nickname?: string;

  lvl?: number; // after user level up his lvl user can connect to more higher club

  rank?: number; //for more access for functional in club

  status?: string;

  statusReason?: string;

  bannedBy?: string;

  accessToken?: string;

  tgUsername?: string;

  avatar?: string;

  bestHand?: string[];

  club?: Club;

  language?: string;

  languageCode?: string;
}
