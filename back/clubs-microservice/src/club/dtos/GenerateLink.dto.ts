enum ERole {
  moder = 'club',
  player = 'alliance',
  admin = 'admin',
}

export class GenerateLinkDto {
  role: ERole;

  timePeriod: string;

  club?: string;

  createdBy: string;

  code?: string;
}
