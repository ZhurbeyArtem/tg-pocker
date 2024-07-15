import { Controller, Inject, UseFilters } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { LanguagesService } from './languages.service';

import { AllExceptionsFilter } from '@lib/exception';
import { CreateLanguageDto } from './dtos/CreateLanguage.dto';
import { FindOneLanguageDto } from './dtos/FindOneLanguage.dto';
import { UpdateLanguageDto } from './dtos/UpdateLanguage.dto';

@Controller()
@UseFilters(AllExceptionsFilter)
export class LanguagesController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private readonly languagesService: LanguagesService,
  ) { }

  @MessagePattern('getLangByCode')
  async getLangByCode(@Payload() code: FindOneLanguageDto) {
    return await this.languagesService.getOneByCode(code);
  }

  @MessagePattern('getAllLangs')
  async getAllLangs() {
    return await this.languagesService.getAll();
  }

  @MessagePattern('createLang')
  async createLang(@Payload() data: CreateLanguageDto) {
    return await this.languagesService.create(data);
  }

  @MessagePattern('deleteLang')
  async deleteLang(@Payload() data: string) {
    return await this.languagesService.delete(data);
  }

  @MessagePattern('updateLang')
  async updateLang(@Payload() data: UpdateLanguageDto) {
    return await this.languagesService.update(data);
  }
}
