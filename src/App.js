import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Header } from './components'
import { GrammarInvaders, Home, SlappyGrammarGame } from './pages'
import basic from './themes/basic'
import { GlobalStyle } from './themes/global-style'
import { StyledMain, StyledFooter, StyledLink } from './StyledApp.js'
import { Github, Linkedin } from './assets/icons'

const App = () => {
  const [t, i18n] = useTranslation()

  const routes = (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/slappy-grammar' exact>
        <SlappyGrammarGame />
      </Route>
      <Route path='/grammar-invaders' exact>
        <GrammarInvaders />
      </Route>
      <Redirect to='/' />
    </Switch>
  )

  useEffect(() => {
    const language = localStorage.getItem('language')
    language && i18n.changeLanguage(language)
  }, [i18n])

  return (
    <ThemeProvider theme={basic}>
      <GlobalStyle />
      <Router>
        <div className='app'>
          <Header title={t('header.title')} />
          <StyledMain>{routes}</StyledMain>
          <StyledFooter>
            <p>©</p>{' '}
            <p>{`2021 - ${t('footer.developedBy')} ${t(
              'footer.authorName'
            )}`}</p>
            <StyledLink
              href={t('footer.github')}
              aria-label={`go to ${t('footer.authorName')}'s Github`}
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              <img src={Github} alt='github icon' />
            </StyledLink>
            <StyledLink
              href={t('footer.linkedin')}
              aria-label={`go to ${t('footer.authorName')}'s Linkedin`}
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              <img src={Linkedin} alt='linkedin icon' />
            </StyledLink>
          </StyledFooter>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
