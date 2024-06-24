import { IsJSON, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsObject()
  @IsNotEmpty()
  variables: string;
}
