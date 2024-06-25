import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  tgUsername: string;

  @IsString()
  @IsNotEmpty()
  tgUserId: string;

  @IsString()
  @IsNotEmpty()
  languageCode: string;
}
