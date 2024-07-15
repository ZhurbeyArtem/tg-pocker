import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

enum clubType {
  kick = 'kick',
  ban = 'ban',
}

export class BanOrKickDto {
  @IsUUID()
  user: string;

  @IsUUID()
  @IsOptional()
  club?: string;

  @IsUUID()
  @IsOptional()
  bannedBy?: string;

  @IsString()
  reason: string;

  @IsDateString(
    { strict: true },
    { message: 'periodTo must be a valid date in YYYY-MM-DD format' },
  )
  periodTo: string;

  @IsEnum(clubType)
  type: clubType;
}
