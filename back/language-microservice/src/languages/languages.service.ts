import { Injectable } from '@nestjs/common';
import { Language } from '@lib/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRpcException } from '@lib/exception';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) { }

  async create(data): Promise<Language> {
    try {
      const language = await this.languageRepository.findOneBy({
        code: data.code,
      });
      if (language)
        throw new CustomRpcException(
          409,
          'language with same code already exist',
        );
      data.variables = JSON.stringify(data.variables);
      return await this.languageRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async getOneByCode(code): Promise<Language> {
    try {
      const result = await this.languageRepository.findOneBy(code);
      if (!result)
        throw new CustomRpcException(404, 'No language with same code');
      return result;
    } catch (error) {
      throw error;
    }
  }

  private async getOneById(id): Promise<Language> {
    const lang = await this.languageRepository.findOneBy(id);
    if (!lang) throw new CustomRpcException(404, 'No language with same id');
    return lang;
  }

  async update(data): Promise<Language> {
    try {
      const { id, updateLanguageDto } = data;
      await this.getOneById(id);
      await this.languageRepository.update(id.id, updateLanguageDto);
      return await this.languageRepository.findOneBy(id);
    } catch (error) {
      throw error;
    }
  }

  async delete(id): Promise<string> {
    try {
      await this.getOneById(id);
      await this.languageRepository.delete(id);
      return 'Success';
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Language[]> {
    try {
      return await this.languageRepository.find();
    } catch (error) {
      throw error;
    }
  }
}
