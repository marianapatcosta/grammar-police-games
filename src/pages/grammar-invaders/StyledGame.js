import styled from 'styled-components'
import { Button } from '../../components'
import { GAME_HEIGHT, GAME_WIDTH } from '../../constants'
import { Board } from './components'

export const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 55rem;
  margin: 0 auto;
  font-family: ${({ theme }) => theme.fonts.game};
  text-transform: uppercase;
`

export const StyledGameHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: 3rem 0 0;
  user-select: none;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
`

export const StyledGameTitle = styled.h3`
  font-size: 150%;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.red};
`

export const StyledGamePlayground = styled.div`
  position: relative;
  user-select: none;
  width: ${GAME_WIDTH}rem;
  height: ${GAME_HEIGHT}rem;
  background-color: ${({ theme }) => theme.colors.blue1};
  overflow: hidden;
  box-shadow: 0.25rem 0.25rem 0.7rem rgb(0, 0, 0, 0.7);
  border-radius: 0.25rem;
`

export const StyledGameSubtitle = styled.h4`
  position: absolute;
  top: 10rem;
  right: 0;
  left: 0;
  margin: 0 auto;
  font-size: 300%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
`

export const StyledBoard = styled(Board)`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
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

export const StyledScore = styled.div`
  margin-left: 1rem;
  font-size: 280%;
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
  margin-top: 1rem;
  padding: 0.4rem 0.6rem;
  font-size: 85%;
  background-color: ${({ theme }) => theme.colors.red};
`
