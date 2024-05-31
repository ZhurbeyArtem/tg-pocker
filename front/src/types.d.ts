interface TelegramWebApp {
  initDataUnsafe?: {
    user?: {
      username?: string;
      language_code?: string;
    };
  };
  ready: () => void;
  expand: () => void;
  exportChatInvite: () => void;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
