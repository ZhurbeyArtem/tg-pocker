import { Link } from 'react-router-dom'

import s from './HomePage.module.css'
import { useTranslation } from 'react-i18next'
const HomePage = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (val: string) => {
    i18n.changeLanguage(val)
    localStorage.setItem("language", val)

  }
  return (
    <div className='container'>
      {/* <Link to='/ui' className={s.links}>{t("ui")}</Link> */}
      <Link to='/sdk' className={s.links}>{t("sdk")}</Link>
      <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={localStorage.getItem('language') || 'en'}>
        <option value="en">en</option>
        <option value="ua">ua</option>
      </select>
    </div>
  )
}

export default HomePage