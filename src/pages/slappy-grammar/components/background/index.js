import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BACKGROUND_TIME_INTERVAL,
  GAME_STAGE,
  GAME_WIDTH,
  graffitiColors,
  graffitiFonts,
  sentencesEN,
  sentencesPT,
  SENTENCE_NUMBER,
} from '../../../../constants.js'
import { getRandomInt, getRandomizedSentences } from '../../../../utils.js'
import { StyledBackground, StyledGraffiti } from './StyledBackground.js'

const Background = ({ sentencesNumber, gameStage }) => {
  const [, i18n] = useTranslation()

  const [sentencesToDisplay, setSentencesToDisplay] = useState([])
  const [sentencesStyle, setSentencesStyle] = useState([])
  const isPlaying = gameStage === GAME_STAGE.PLAY
  const sentences = i18n.language === 'en' ? sentencesEN : sentencesPT

  useEffect(() => {
    let timerId
    if (isPlaying) {
      setSentencesToDisplay(
        getRandomizedSentences(sentences).slice(0, sentencesNumber * 2)
      )
      timerId = setInterval(() => {
        setSentencesToDisplay(
          getRandomizedSentences(sentences).slice(0, sentencesNumber * 2)
        )
      }, BACKGROUND_TIME_INTERVAL)
    }

    if (gameStage === GAME_STAGE.START) {
      setSentencesToDisplay([])
    }
    return () => clearTimeout(timerId)
  }, [isPlaying, sentences, sentencesNumber, gameStage])

  const getRandomStyle = useCallback(
    () => ({
      color: graffitiColors[getRandomInt(0, graffitiColors.length)],
      fontFamily: graffitiFonts[getRandomInt(0, graffitiFonts.length)],
      biggerShadow: Math.random() < 0.3,
    }),
    []
  )

  useEffect(() => {
    setSentencesStyle([
      {
        top: '9rem',
        left: `${2 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '7.5rem',
        left: `${30 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '20rem',
        left: `${5 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '13rem',
        left: `${24 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '22rem',
        left: `${29 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '9rem',
        left: `${57 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '7rem',
        left: `${85 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '20rem',
        left: `${60 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '13rem',
        left: `${90 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
      {
        top: '22rem',
        left: `${85 + GAME_WIDTH}rem`,
        ...getRandomStyle(),
      },
    ])
  }, [sentencesToDisplay, getRandomStyle])

  return (
    <StyledBackground isPlaying={isPlaying}>
      {sentencesToDisplay.map((sentence, index) => (
        <StyledGraffiti
          key={`graffity-${index}`}
          style={sentencesStyle[index]}
          x={+sentencesStyle[index].left.split('rem')[0] - GAME_WIDTH}
          isPlaying={isPlaying}
        >
          {sentence}
        </StyledGraffiti>
      ))}
    </StyledBackground>
  )
}

Background.defaultProps = {
  gameStage: '',
  sentencesNumber: SENTENCE_NUMBER,
}

export default Background
