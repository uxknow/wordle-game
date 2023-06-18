import {FC, useContext} from 'react'
import { IoMdClose } from 'react-icons/io'
import { ThemeContext } from '../../themeContext'
import { IThemeContext } from '../../../common/types/theme-context'
import { useTranslation } from 'react-i18next'
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IModalContentProps } from '../../../common/types/modal-content'
import headerClasses from '../styles.module.scss'
import classesDark from './dark.module.scss'
import classesLight from './light.module.scss'

export const Settings: FC<IModalContentProps> = ({onClose}) => {
  const {t, i18n} = useTranslation()
  const { theme: themeName, toggleTheme } = useContext(ThemeContext) as IThemeContext;
  const theme = themeName === 'dark' ? classesDark : classesLight

  const lngs = {
    en: "English",
    ua: "Українська",
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <header className={headerClasses.header}>
        <h2 className={headerClasses.title}>{t('settings.title')}</h2>
        <button className={headerClasses.btn} onClick={onClose}>
          <IoMdClose />
        </button>
      </header>
      <div className={theme['settings-block']}>
        <div className={theme.row}>
          <p>{t('settings.theme')}</p>
          <button onClick={toggleTheme}>
          {themeName === "dark" ? (
            <MdLightMode className={theme.icon} />
          ) : (
            <MdDarkMode className={theme.icon} />
          )}
        </button>
        </div>
        <hr />
        <div className={theme.row}>
          <p>{t('settings.language')}</p>
          <select className={theme.select} value={i18n.language} onChange={(e) => changeLanguage(e.target.value)} disabled={!!localStorage.getItem('result') || !!localStorage.getItem('lastWord')}>
          {Object.keys(lngs).map((lang) => (
            <option className={theme.option} key={lang} value={lang} disabled={i18n.resolvedLanguage === lang}>
              {lngs[lang]}
            </option>
          ))}
        </select>
        </div>
        <p className={theme.desc}>{t('settings.warning')}</p>
      </div>
    </>
  )
}