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

import { Language } from '@lib/entities'

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
  @IsInt()
  lvl?: number; // after user level up his lvl user can connect to more higher club

  @IsOptional()
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
  ClubID?: string;

  @IsOptional()
  @IsString()
  language?: Language;
}
