import { useEffect } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { RouterProvider } from "react-router-dom";
import { router } from './routers'

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
      manifestUrl="https://tg-pocker-zhurbeyartems-projects.vercel.app/public/tonconnect-manifest.json"
    >
      <RouterProvider router={router} />
    </TonConnectUIProvider>
  )
}

export default App
