import { Transform } from 'class-transformer';
import { IsEnum, IsString, Matches } from 'class-validator';

enum clubRole {
  clubAdmin = 'clubAdmin',
  clubMember = 'clubMember',
  clubModer = 'clubModer',
}

export class GenerateLinkDto {
  @IsEnum(clubRole)
  @Transform(({ value }) => value ?? clubRole.clubMember)
  role: clubRole;

  @IsString()
  @Matches(/^(\d{2}\.\d{2}\.\d{4})$/, {
    message:
      'timePeriod must be in the format DD.MM.YYYY, e.g., 15.05.2024 - 18.09.2025',
  })
  timePeriod: string;
}
