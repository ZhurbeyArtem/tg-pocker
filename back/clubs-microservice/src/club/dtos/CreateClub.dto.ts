export class CreateClubDto {
  createClubDto: ClubDto;
  user: User;
}

class User {
  role: string;
  status: string;
  userId: string;
  lvl: number;
  rank: number;
  iat: number;
  exp: number;
}

class ClubDto {
  name: string;

  localization: string[];

  description?: string;

  img: string;

  chatLink: string;

  channelLink: string;

  slogan: string;

  type: string;

  workHours: string;

  defaultRole?: string;

  coinRation: number;
}
