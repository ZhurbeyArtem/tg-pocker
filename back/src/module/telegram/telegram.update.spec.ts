import { Test, TestingModule } from '@nestjs/testing';
import { TelegramUpdate } from './telegram.update';

describe('TelegramController', () => {
  let controller: TelegramUpdate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramUpdate],
    }).compile();

    controller = module.get<TelegramUpdate>(TelegramUpdate);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
