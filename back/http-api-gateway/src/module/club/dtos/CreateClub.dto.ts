import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

enum clubLocalization {
  ru = 'ru',
  en = 'en',
  ua = 'ua',
  kk = 'kk',
  ka = 'ka',
  de = 'de',
}

enum clubType {
  opened = 'opened',
  closed = 'closed',
}

enum clubRole {
  clubAdmin = 'clubAdmin',
  clubMember = 'clubMember',
  clubModer = 'clubModer',
}

export class CreateClubDto {
  @IsString()
  name: string;

  @IsArray()
  @IsEnum(clubLocalization, { each: true })
  localization: string[];

  @IsEmpty()
  img: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl(
    {},
    {
      message:
        'Invalid URL format, try paste something like https://t.me/global_crypto_poker_bot',
    },
  )
  chatLink: string;

  @IsUrl(
    {},
    {
      message:
        'Invalid URL format, try paste something like https://t.me/global_crypto_poker_bot',
    },
  )
  channelLink: string;

  @IsString()
  slogan: string;

  @IsEnum(clubType)
  type: string;

  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3])-(\d|[01]\d|2[0-3])$/, {
    message: 'workHours must be in the format HH-HH, e.g., 10-22',
  })
  workHours?: string;

  @IsEnum(clubRole)
  @IsOptional()
  defaultRole: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  coinRation: number;
}
