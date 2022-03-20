import styled from 'styled-components'
import { Button } from '../../components'
import { MEMORY_GAME_HEIGHT, GAME_WIDTH } from '../../constants'
import { Board } from './components'

export const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: ${GAME_WIDTH}rem;
  margin-left: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.game};
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-left: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 0 auto;
    ${({ isGameActive }) => isGameActive && `margin: auto;`}
  }
`

export const StyledGameHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  user-select: none;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 1rem 0 0;
    padding: 1rem;
  }
`

export const StyledGameTitle = styled.h3`
  font-size: 130%;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.red};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 150%;
  }
`

export const StyledGamePlayground = styled.div`
  display: flex;
  position: relative;
  user-select: none;
  width: ${GAME_WIDTH}rem;
  height: ${MEMORY_GAME_HEIGHT ? `${MEMORY_GAME_HEIGHT}rem ` : 'auto'};
  background-color: ${({ theme }) => theme.colors.blue1};
  overflow: hidden;
  box-shadow: 0.25rem 0.25rem 0.7rem rgb(0, 0, 0, 0.7);
  border-radius: 0.25rem;
`

export const StyledGameSubtitle = styled.h4`
  position: absolute;
  top: 12rem;
  right: 0;
  left: 0;
  margin: 0 auto;
  font-size: 250%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 10rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 300%;
  }
`

export const StyledBoard = styled(Board)`
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  top: 15rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    right: 2rem;
    left: revert;
    top: revert;
    bottom: 2rem;
  }
`

export const StyledGameData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 1;
  position: absolute;
  top: 1rem;
  right: 1rem;
`

export const StyledLives = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  img {
    width: 1.5rem;
    margin: 0 0.1rem;
  }
`

export const StyledTimer = styled.div`
  margin-left: 1rem;
  font-size: 130%;
  line-height: 2.5rem;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
`

export const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const StyledButton = styled(Button)`
  width: 1.75rem;
  height: 1.75rem;
  background-color: ${({ theme }) => theme.colors.red};
`

export const StyledBackButton = styled(Button)`
  margin-top: 0.5rem;
  padding: 0.4rem 0.6rem;
  font-size: 85%;
  background-color: ${({ theme }) => theme.colors.red};
`
