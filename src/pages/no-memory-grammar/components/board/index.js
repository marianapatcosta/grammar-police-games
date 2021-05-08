import React from 'react'
import { useTranslation } from 'react-i18next'
import { Medal } from '../../../../assets/icons/index.js'
import { GAME_STAGE } from '../../../../constants.js'
import { convertToMinutesAndSeconds, isTouchScreen } from '../../../../utils.js'
import {
  StyledBoard,
  StyledBoardOver,
  StyledMedalWrapper,
  StyledBoardOverTitle,
  StyledResults,
  StyledTimeSpent,
} from './StyledBoard.js'

const Board = ({ gameStage, timeSpent, bestTime, className }) => {
  const [t, i18n] = useTranslation()
  const isTouchStart = isTouchScreen() && gameStage === GAME_STAGE.START

  const timeSpentInMInutesAndSeconds = convertToMinutesAndSeconds(timeSpent)
  const strigifyTimeSpent = timeLeft =>
    `${timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:${
      timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds
    }`
  const timeSpentString = strigifyTimeSpent(timeSpentInMInutesAndSeconds)

  const bestTimeInMinutesAndSeconds = convertToMinutesAndSeconds(bestTime)
  const bestTimeString = strigifyTimeSpent(bestTimeInMinutesAndSeconds)

  const renderBoardStart = () =>
    isTouchScreen() ? (
      <>
        <p>{t('game.howToPlay')}</p>
        <p>{t('game.intructionNoMemoryGrammar')}</p>
        <p>{t('game.instructionsTap5')}</p>
        <p>{t('game.instructionsStart3')}</p>
      </>
    ) : (
      <>
        <p>{t('game.intructionNoMemoryGrammar')}</p>

        <p>{t('game.instructionsClick')}</p>
        <p>
          {t('game.instructionsP')}
          <kbd>P</kbd>
          {t('game.instructionsP2')}
        </p>
        <p>
          {t('game.instructionsR')}
          <kbd>R</kbd>
          {t('game.instructionsR2')}
        </p>
        <p>
          {t('game.instructionsQ')}
          <kbd>Q</kbd>
          {t('game.instructionsQ2')}
        </p>
        <p>
          {t('game.instructionsStart')}
          <kbd>P</kbd>
          {t('game.instructionsStart2')}
        </p>
      </>
    )

  const renderBoardOver = () => (
    <>
      <StyledBoardOver>
        <StyledMedalWrapper>
          <StyledBoardOverTitle> {t('game.medal')}</StyledBoardOverTitle>
          <img src={Medal} alt='medal icon' />
        </StyledMedalWrapper>
        <StyledResults>
          <div>
            <StyledBoardOverTitle> {t('game.time')}</StyledBoardOverTitle>
            <StyledTimeSpent>{timeSpentString}</StyledTimeSpent>
          </div>
          <div>
            <StyledBoardOverTitle>
              {timeSpent < bestTime && <span>{t('game.new')}</span>}
              {t('game.bestTime')}
            </StyledBoardOverTitle>
            <StyledTimeSpent>
              {timeSpent < bestTime ? timeSpentString : bestTimeString}
            </StyledTimeSpent>
          </div>
        </StyledResults>
      </StyledBoardOver>
      {isTouchScreen() ? (
        <p>{t('game.instructionsTap')}</p>
      ) : (
        <p>
          {t('game.instructionsR')}
          <kbd>R</kbd>
          {t('game.instructionsR2')}
        </p>
      )}
    </>
  )

  const renderBoardContent = () => {
    const gameStageComponent = {
      [GAME_STAGE.START]: renderBoardStart(),
      [GAME_STAGE.OVER]: renderBoardOver(),
      [GAME_STAGE.WON]: renderBoardOver(),
    }

    return gameStageComponent[gameStage]
  }

  return (
    <StyledBoard
      isPT={i18n.language === 'pt'}
      isTouchStart={isTouchStart}
      className={className}
    >
      {renderBoardContent()}
    </StyledBoard>
  )
}

Board.defaultProps = {
  gameStage: '',
  timeSpent: 0,
  bestTime: 0,
}

export default Board
