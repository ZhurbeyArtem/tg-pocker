export const inlineButton = (text: string) => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text,
            web_app: {
              url: process.env.FRONT_URL,
            },
          },
        ],
      ],
    },
  };
};
