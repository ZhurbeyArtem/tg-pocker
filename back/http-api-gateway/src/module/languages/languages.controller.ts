import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateLanguageDto } from './dtos/CreateLanguage.dto';
import { UpdateLanguageDto } from './dtos/UpdateLanguage.dto';

@Controller('languages')
export class LanguagesController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Post('/')
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.natsClient.send('createLang', createLanguageDto);
  }

  @Delete('/:id')
  delete(@Param() id: string) {
    return this.natsClient.send('deleteLang', id);
  }

  @Put('/:id')
  update(@Body() updateLanguageDto: UpdateLanguageDto, @Param() id: string) {
    return this.natsClient.send('updateLang', { updateLanguageDto, id });
  }
  @Get('/')
  getAll() {
    return this.natsClient.send('getAllLangs', {});
  }
  @Get('/:code')
  getOne(@Param() code: string) {
    return this.natsClient.send('getLangByCode', code);
  }
}
