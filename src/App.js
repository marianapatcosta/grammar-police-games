import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Navigate, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Header } from './components'
import {
  GrammarInvaders,
  Home,
  NoMemoryGrammar,
  SlappyGrammarGame,
} from './pages'
import basic from './themes/basic'
import { GlobalStyle } from './themes/global-style'
import { StyledApp, StyledMain } from './StyledApp.js'

const App = () => {
  const [t, i18n] = useTranslation()

  const routes = (
    <Routes>
      <Route path='/' element={<Home />} exact />
      <Route path='/slappy-grammar' element={<SlappyGrammarGame />} exact />
      <Route path='/grammar-invaders' element={<GrammarInvaders />} exact />
      <Route path='/no-memory-grammar' element={<NoMemoryGrammar />} exact />
      <Route to='/' element={<Navigate />} />
    </Routes>
  )

  useEffect(() => {
    const language = localStorage.getItem('language')
    language && i18n.changeLanguage(language)
  }, [i18n])

  // workaround to overcome the incorrect set of 100vh by mobile browsers when address bar is visible
  useEffect(() => {
    if (window.matchMedia('(max-width: 480px)').matches) {
      document.getElementById('app').style.height = `${window.innerHeight}px`
    }
  }, [])

  return (
    <ThemeProvider theme={basic}>
      <GlobalStyle />
      <Router>
        <StyledApp id='app'>
          <Header title={t('header.title')} />
          <StyledMain>{routes}</StyledMain>
        </StyledApp>
      </Router>
    </ThemeProvider>
  )
}

export default App
