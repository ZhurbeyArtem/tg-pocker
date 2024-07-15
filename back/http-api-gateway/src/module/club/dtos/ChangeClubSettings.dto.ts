import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

enum clubType {
  kick = 'kick',
  ban = 'ban',
}

enum clubRole {
  clubAdmin = 'clubAdmin',
  clubMember = 'clubMember',
  clubModer = 'clubModer',
}

export class ChangeClubSettingsDto {
  @IsOptional()
  @IsEnum(clubType)
  type?: clubType;

  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3])-(\d|[01]\d|2[0-3])$/, {
    message: 'workHours must be in the format HH-HH, e.g., 10-22',
  })
  workHours?: string;

  @IsEnum(clubRole)
  @IsOptional()
  defaultRole?: clubRole;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  coinRation?: number;
}
