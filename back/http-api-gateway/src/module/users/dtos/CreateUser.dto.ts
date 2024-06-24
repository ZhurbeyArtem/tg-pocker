import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  tgUsername: string;

  @IsNotEmpty()
  @IsUUID()
  tgUserId: string;

  @IsNotEmpty()
  @IsString()
  languageCode: string; //language code
}
