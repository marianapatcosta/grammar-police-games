import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { locales } from '../../constants'
import {
  StyledHeader,
  StyledHeaderTitle,
  StyledHeaderLocales,
  StyledHeaderButton,
  StyledHeaderButtonImage,
} from './StyledHeader.js'

const Header = ({ title, className }) => {
  const [, i18n] = useTranslation()

  const changeLanguage = useCallback(
    language => {
      i18n.changeLanguage(language)
      localStorage.setItem('language', language)
    },
    [i18n]
  )

  return (
    <StyledHeader className={className}>
      <StyledHeaderTitle>{title}</StyledHeaderTitle>
      <StyledHeaderLocales>
        {locales.map(({ icon, language, acronymum }) => (
          <StyledHeaderButton
            aria-label={`click to choose ${language} language`}
            key={`language-${language}`}
            onClick={() => changeLanguage(acronymum)}
          >
            <StyledHeaderButtonImage src={icon} alt={`${language} icon`} />
          </StyledHeaderButton>
        ))}
      </StyledHeaderLocales>
    </StyledHeader>
  )
}

Header.defaultProps = {
  title: '',
  className: '',
}

export default Header
