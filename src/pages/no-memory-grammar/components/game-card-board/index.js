import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GameCardBack,
  GameCardBackLandscape,
} from '../../../../assets/images/index.js'
import {
  CARDS_NUMBER,
  GAME_STAGE,
  sentencesEN,
  sentencesPT,
} from '../../../../constants.js'
import { getRandomizedSentences, isTouchScreen } from '../../../../utils.js'
import { GameCard } from '../index.js'
import { StyledGameCardBoard } from './StyledGameCardBoard.js'

const GameCardBoard = ({ className, gameStage, onGameWin }) => {
  const [, i18n] = useTranslation()
  const [cards, setCards] = useState([])

  useEffect(() => {
    if (gameStage !== GAME_STAGE.START) return
    const sentences =
      i18n.language === 'en'
        ? sentencesEN.slice(0, sentencesEN.length / 2)
        : sentencesPT

    const sentencesToDisplay = getRandomizedSentences(sentences).slice(
      0,
      CARDS_NUMBER / 2
    )
    setCards(
      [...sentencesToDisplay, ...sentencesToDisplay].map(sentence => ({
        sentence,
        isSelected: false,
        isMatched: false,
      }))
    )
  }, [gameStage, i18n.language])

  const updateGameCards = useCallback(() => {
    const selectedCards = cards.filter(card => card.isSelected)
    if (selectedCards.length <= 1) {
      return
    }
    const indexCardOne = cards.indexOf(selectedCards[0])
    const indexCardTwo = cards.indexOf(selectedCards[1])

    if (selectedCards[0].sentence === selectedCards[1].sentence) {
      return setCards(prevCards => {
        const newCards = [...prevCards]
        newCards[indexCardOne].isSelected = false
        newCards[indexCardOne].isMatched = true
        newCards[indexCardTwo].isSelected = false
        newCards[indexCardTwo].isMatched = true
        return newCards
      })
    }

    setTimeout(() => {
      setCards(prevCards => {
        const newCards = [...prevCards]
        newCards[indexCardOne].isSelected = false
        newCards[indexCardOne].isMatched = false
        newCards[indexCardTwo].isSelected = false
        newCards[indexCardTwo].isMatched = false
        return newCards
      })
    }, 1000)
  }, [cards])

  const checkGameOver = useCallback(() => {
    if (cards.every(cards => cards.isMatched)) {
      onGameWin()
    }
  }, [cards, onGameWin])

  useEffect(() => {
    updateGameCards()
    const timer = setTimeout(() => checkGameOver(), 500)

    return () => clearTimeout(timer)
  }, [cards, checkGameOver, updateGameCards])

  const handleCardSelection = index => {
    if (cards[index].isMatched) return

    const selectedCards = cards.filter(card => card.isSelected)
    if (selectedCards.length >= 2) {
      return
    }

    return setCards(prevCards =>
      prevCards.map((card, cardIndex) =>
        index === cardIndex
          ? { sentence: card.sentence, isSelected: true, isMatched: false }
          : card
      )
    )
  }

  return (
    <StyledGameCardBoard
      className={className}
      isPlaying={gameStage === GAME_STAGE.PLAY}
    >
      {cards.map((card, index) => (
        <GameCard
          key={`card-${index}`}
          sentence={card.sentence}
          isSelected={card.isSelected}
          isMatched={card.isMatched}
          gameCardBackImage={
            isTouchScreen() ? GameCardBackLandscape : GameCardBack
          }
          onClick={() => handleCardSelection(index)}
        />
      ))}
    </StyledGameCardBoard>
  )
}

GameCardBoard.defaultProps = {
  ganeStage: '',
  className: '',
  onGameWin: () => null,
}

export default GameCardBoard
