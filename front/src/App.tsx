import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from './routers'
import { TonConnectUIProvider } from "@tonconnect/ui-react";

function App() {
  const tg = window.Telegram.WebApp;

  if (!localStorage.getItem('language')) {
    const lang = tg.initDataUnsafe?.user?.language_code;
    const isDefLang = lang === 'en' || lang === 'ua'

  localStorage.setItem('language', isDefLang ? lang : 'en')
  }
  
  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [])

  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
    >
      <RouterProvider router={router} />
    </TonConnectUIProvider >

  )
}

export default App
