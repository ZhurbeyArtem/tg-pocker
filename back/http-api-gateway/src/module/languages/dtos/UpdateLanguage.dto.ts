import { IsJSON, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateLanguageDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsObject()
  @IsOptional()
  variables?: string;
}
