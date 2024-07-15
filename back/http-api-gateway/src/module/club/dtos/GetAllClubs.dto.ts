import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

enum order {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum sort {
  totalUsers = 'totalUsers',
  totalGames = 'totalGames',
}

export class GetAllClubsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(sort)
  @IsOptional()
  sortBy?: string;

  @IsEnum(order)
  @IsOptional()
  orderBy?: string;

  @IsNumber()
  @IsOptional()
  @Min(1, { message: 'Page number must be at least 1' })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page: number;
}
