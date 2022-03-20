import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { locales } from '../../constants'
import { isTouchScreen } from '../../utils'
import {
  StyledHeader,
  StyledHeaderTitle,
  StyledHeaderLocales,
  StyledHeaderButton,
  StyledHeaderButtonImage,
} from './StyledHeader.js'

const Header = ({ title, className }) => {
  const [, i18n] = useTranslation()
  const navigate = useNavigate()

  const changeLanguage = useCallback(
    language => {
      i18n.changeLanguage(language)
      localStorage.setItem('language', language)
    },
    [i18n]
  )

  const goToMenu = () => isTouchScreen() && navigate('/')

  return (
    <StyledHeader className={className}>
      <StyledHeaderTitle onClick={goToMenu}>{title}</StyledHeaderTitle>
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
