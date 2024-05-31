import { Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { inlineButton } from './telegram.buttons';

@Update()
export class TelegramUpdate {
  @Start()
  async sayHello(ctx: Context) {
    await ctx.reply(
      "Play Texas Hold'em globally with Toncoin & more!🌍💰 Secure blockchain, thrilling games.🚀🎲 Join the fun!🎉♠️ #CryptoPoker",
      inlineButton('Play'),
    );
  }
}
