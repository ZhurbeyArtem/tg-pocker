import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class JoinToClubParamDto {
  @IsUUID()
  club: string;
}

export class JoinToClubBodyDto {
  @IsOptional()
  @IsNumber()
  code?: number;
}

export class JoinToClubByLinkDto {
  @IsUUID()
  token: string;
}
