import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

enum UserRole {
  player = 'player',
  clubAdmin = 'clubAdmin',
  clubUser = 'clubUser',
  admin = 'admin',
  clubModer = 'clubModer',
  allianceAdmin = 'allianceAdmin',
  allianceModer = 'allianceModer',
}

import { Language, Club } from '@lib/entities';
import { Transform } from 'class-transformer';

enum UserStatus {
  normal = 'normal',
  kicked = 'kicked',
  banned = 'banned',
  bannedWithMoney = 'bannedWithMoney',
}

export class UpdateUserInfoDto {
  @IsUUID()
  id: string;

  @IsEnum(UserRole, { each: true })
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  role?: string[];

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  lvl?: number; // after user level up his lvl user can connect to more higher club

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  rank?: number; //for more access for functional in club

  @IsOptional()
  @IsEnum(UserStatus)
  status?: string;

  @IsOptional()
  @IsString()
  statusReason?: string;

  @IsUUID()
  @IsOptional()
  bannedBy?: string;

  @IsOptional()
  @IsString()
  tgUsername?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  bestHand?: string[];

  @IsOptional()
  @IsUUID()
  club?: Club;

  @IsOptional()
  @IsString()
  language?: Language;
}
