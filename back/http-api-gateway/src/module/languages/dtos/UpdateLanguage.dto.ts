import { IsJSON, IsOptional, IsString } from 'class-validator';

export class UpdateLanguageDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsJSON()
  @IsOptional()
  variables?: JSON;
}
