import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Back, Mute, Pause, Play, Quit, Unmute } from '../../assets/icons'
import { Modal } from '../../components'
import { GameCardBoard } from './components'
import { GAME_STAGE, GAME_TIME, KEYBOARD_CODES } from '../../constants'
import { GameOver, MusicBoxMonsterTheme, Yupi } from '../../assets/audio'
import {
  convertToMilliseconds,
  convertToMinutesAndSeconds,
  isTouchScreen,
} from '../../utils'
import {
  StyledGame,
  StyledGamePlayground,
  StyledGameHeader,
  StyledGameTitle,
  StyledGameData,
  StyledBoard,
  StyledButton,
  StyledButtonWrapper,
  StyledGameSubtitle,
  StyledTimer,
  StyledBackButton,
} from './StyledGame.js'

const Game = () => {
  const [t] = useTranslation()
  const history = useHistory()

  const bestTime = +localStorage.getItem('noMemoryGrammarBestTime') || GAME_TIME
  const [gameStage, setGameStage] = useState(GAME_STAGE.START)
  const [timeLeft, setTimeLeft] = useState(
    convertToMinutesAndSeconds(GAME_TIME)
  )
  const [timeSpent, setTimeSpent] = useState()
  const [hasAudio, setHasAudio] = useState(
    JSON.parse(localStorage.getItem('audio')) || false
  )
  const [showModal, setShowModal] = useState(false)

  const isPlaying = gameStage === GAME_STAGE.PLAY

  const isGameActive =
    gameStage === GAME_STAGE.PLAY || gameStage === GAME_STAGE.PAUSE

  const gameOverSound = useMemo(() => new Audio(GameOver), [])
  const gameWonSound = useMemo(() => new Audio(Yupi), [])
  const themeMusic = useMemo(() => new Audio(MusicBoxMonsterTheme), [])

  const toggleAudio = () => setHasAudio(prevHasAudio => !prevHasAudio)

  const findBestTime = useCallback(
    (isQuiting = false) => {
      const currentTimeLeft = convertToMilliseconds(
        isQuiting ? { minutes: 0, seconds: 0 } : timeLeft
      )
      const timeSpent = GAME_TIME - currentTimeLeft
      setTimeSpent(timeSpent)
      if (timeSpent <= bestTime) {
        localStorage.setItem('noMemoryGrammarBestTime', timeSpent)
      }
    },
    [bestTime, timeLeft]
  )

  const play = useCallback(() => {
    hasAudio && themeMusic.play()
    themeMusic.volume = 0.3
  }, [hasAudio, themeMusic])

  const onPlayPauseClick = useCallback(() => {
    const clickHandlers = {
      [GAME_STAGE.START]: () => setGameStage(GAME_STAGE.PLAY),
      [GAME_STAGE.PLAY]: () => setGameStage(GAME_STAGE.PAUSE),
      [GAME_STAGE.PAUSE]: () => setGameStage(GAME_STAGE.PLAY),
      [GAME_STAGE.OVER]: () => setGameStage(GAME_STAGE.START),
      [GAME_STAGE.WON]: () => setGameStage(GAME_STAGE.START),
    }
    !!clickHandlers[gameStage] && clickHandlers[gameStage]()
  }, [gameStage])

  const onKeyDown = useCallback(
    event => {
      const keyDownHandlers = {
        [KEYBOARD_CODES.P_KEY]: onPlayPauseClick,
        [KEYBOARD_CODES.R_KEY]: () => setGameStage(GAME_STAGE.START),
        [KEYBOARD_CODES.Q_KEY]: onQuitClick,
        [GAME_STAGE.PLAY]: () => setGameStage(GAME_STAGE.OVER),
        [GAME_STAGE.OVER]: () => setGameStage(GAME_STAGE.START),
      }
      keyDownHandlers[event.code] && keyDownHandlers[event.code]()
    },
    [onPlayPauseClick]
  )

  const onQuitClick = () => {
    setShowModal(true)
    setGameStage(GAME_STAGE.PAUSE)
  }

  const onCancelQuit = () => {
    setShowModal(false)
    setGameStage(GAME_STAGE.PLAY)
  }

  const onQuit = () => {
    onGameOver(true)
    setShowModal(false)
  }

  const onGameClick = () => {
    const clickHandlers = {
      [GAME_STAGE.START]: () => setGameStage(GAME_STAGE.PLAY),
      [GAME_STAGE.OVER]: () => setGameStage(GAME_STAGE.START),
      [GAME_STAGE.WON]: () => setGameStage(GAME_STAGE.START),
    }
    clickHandlers[gameStage] && clickHandlers[gameStage]()
  }

  const onGameOver = useCallback(
    (isQuiting = false) => {
      hasAudio && gameOverSound.play()
      setGameStage(GAME_STAGE.OVER)
      findBestTime(isQuiting)
    },
    [gameOverSound, hasAudio, findBestTime]
  )

  useEffect(() => {
    let timerId
    const updateTimer = () => {
      const { minutes, seconds } = timeLeft
      if (seconds > 0)
        return setTimeLeft(prevTimeLeft => ({
          ...prevTimeLeft,
          seconds: prevTimeLeft.seconds - 1,
        }))

      if (minutes === 0) {
        setTimeLeft({ minutes: 0, seconds: 0 })
        return onGameOver()
      }

      return setTimeLeft(prevTimeLeft => ({
        ...prevTimeLeft,
        minutes: prevTimeLeft.minutes - 1,
        seconds: 59,
      }))
    }

    if (isPlaying) {
      timerId = setInterval(updateTimer, 1000)
    }

    return () => clearInterval(timerId)
  }, [isPlaying, onGameOver, timeLeft])

  // play music in loop
  useEffect(() => {
    hasAudio && themeMusic.addEventListener('ended', play)

    return () => {
      themeMusic.removeEventListener('ended', play)
      themeMusic.pause()
    }
  }, [themeMusic, hasAudio, play])

  useEffect(() => {
    localStorage.setItem('audio', hasAudio)
  }, [hasAudio, themeMusic])

  useEffect(() => {
    document.addEventListener('mousemove', play)
    return () => document.removeEventListener('mousemove', play)
  }, [play])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  useEffect(() => {
    if (gameStage === GAME_STAGE.START) {
      setTimeLeft(convertToMinutesAndSeconds(GAME_TIME))
      gameOverSound.pause()
    }
  }, [gameStage, gameOverSound])

  const onGameWin = () => {
    setGameStage(GAME_STAGE.WON)
    hasAudio && gameWonSound.play()
    findBestTime()
  }

  const renderSubtitle = () => {
    const subtitles = {
      [GAME_STAGE.START]: t('game.getReady'),
      [GAME_STAGE.PAUSE]: t('game.paused'),
      [GAME_STAGE.OVER]: t('game.gameOver'),
      [GAME_STAGE.WON]: t('game.won'),
    }
    return subtitles[gameStage] || ''
  }

  return (
    <>
      <StyledGame>
        <StyledGameHeader>
          <StyledGameTitle>{t('noMemoryGrammar.title')}</StyledGameTitle>
          <StyledButtonWrapper>
            <StyledButton
              icon={gameStage === GAME_STAGE.PLAY ? Pause : Play}
              onClick={onPlayPauseClick}
            />
            <StyledButton
              disabled={!isGameActive}
              icon={Quit}
              onClick={onQuitClick}
            />
            <StyledButton
              icon={hasAudio ? Mute : Unmute}
              onClick={toggleAudio}
            />
          </StyledButtonWrapper>
        </StyledGameHeader>
        <StyledGamePlayground onClick={onGameClick}>
          <GameCardBoard gameStage={gameStage} onGameWin={onGameWin} />
          {isGameActive && (
            <StyledGameData>
              <StyledTimer>{`${
                timeLeft.minutes < 10
                  ? `0${timeLeft.minutes}`
                  : timeLeft.minutes
              }:${
                timeLeft.seconds < 10
                  ? `0${timeLeft.seconds}`
                  : timeLeft.seconds
              }`}</StyledTimer>
            </StyledGameData>
          )}
          {gameStage !== GAME_STAGE.PLAY && (
            <StyledGameSubtitle>{renderSubtitle()}</StyledGameSubtitle>
          )}
          {!isGameActive && (
            <StyledBoard
              gameStage={gameStage}
              timeSpent={timeSpent}
              bestTime={bestTime}
            />
          )}
        </StyledGamePlayground>
        {!isTouchScreen() && (
          <StyledBackButton
            onClick={() => history.push('/')}
            label={t('game.back')}
            icon={Back}
          />
        )}
      </StyledGame>
      {showModal && (
        <Modal
          size='small'
          header={t('game.quit')}
          isConfirmationModal
          message={t('game.quitMessage')}
          buttonLabel={t('game.cancel')}
          confirmationLabel={t('game.ok')}
          onClose={onCancelQuit}
          onConfirm={onQuit}
        />
      )}
    </>
  )
}

export default Game
