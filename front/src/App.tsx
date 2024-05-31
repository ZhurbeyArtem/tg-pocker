import { useEffect } from "react";
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
      <RouterProvider router={router} />
  )
}

export default App
