import React from 'react'
import { useTranslation } from 'react-i18next'
import { Medal } from '../../../../assets/icons/index.js'
import { GAME_STAGE } from '../../../../constants.js'
import {
  StyledBoard,
  StyledBoardOver,
  StyledMedalWrapper,
  StyledBoardOverTitle,
  StyledResults,
  StyledScore,
} from './StyledBoard.js'

const Board = ({ gameStage, score, bestScore, className }) => {
  const [t, i18n] = useTranslation()

  const renderBoardStart = () => (
    <>
      <p>
        {t('game.instructionsSpace')}
        <kbd>Space</kbd>
        {t('game.instructionsSpace2')}
      </p>
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
            <StyledBoardOverTitle> {t('game.score')}</StyledBoardOverTitle>
            <StyledScore>{score}</StyledScore>
          </div>
          <div>
            <StyledBoardOverTitle>
              {score > bestScore && <span>{t('game.new')}</span>}
              {t('game.best')}
            </StyledBoardOverTitle>
            <StyledScore>{score > bestScore ? score : bestScore}</StyledScore>
          </div>
        </StyledResults>
      </StyledBoardOver>
      <p>
        {t('game.instructionsR')}
        <kbd>R</kbd>
        {t('game.instructionsR2')}
      </p>
    </>
  )

  const renderBoardContent = () => {
    const gameStageComponent = {
      [GAME_STAGE.START]: renderBoardStart(),
      [GAME_STAGE.OVER]: renderBoardOver(),
    }

    return gameStageComponent[gameStage]
  }

  return (
    <StyledBoard isPT={i18n.language === 'pt'} className={className}>
      {renderBoardContent()}
    </StyledBoard>
  )
}

Board.defaultProps = {
  gameStage: '',
  score: 0,
  bestScore: 0,
  initialBestScore: 0,
}

export default Board
