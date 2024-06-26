import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  tgUsername: string;

  @IsNotEmpty()
  @IsString()
  tgUserId: string;

  @IsNotEmpty()
  @IsString()
  languageCode: string; //language code
}
