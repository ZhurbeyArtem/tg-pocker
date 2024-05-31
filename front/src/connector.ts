import TonConnect from "@tonconnect/sdk";

export const connector = new TonConnect({manifestUrl: '../public/tonconnect-manifest.json'})

export const isConnectionRestored =  connector.restoreConnection(); // прівка чи є в локал сторі кошель і якщо є то востановим звязок

