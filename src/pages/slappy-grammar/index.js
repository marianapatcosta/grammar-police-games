import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import {
  Back,
  Heart,
  Mute,
  Pause,
  Play,
  Quit,
  Unmute,
} from '../../assets/icons'
import { Modal } from '../../components'
import { Background, Bird, Obstacles } from './components/'
import {
  GAME_STAGE,
  KEYBOARD_CODES,
  GAME_HEIGHT,
  BIRD_LEFT,
  OBSTACLES_NUMBER,
  SENTENCE_NUMBER,
  BIRD_HEIGHT,
  OBSTACLE_WIDTH,
  SLAPPY_GRAMMAR_TIME_INTERVAL,
  BIRD_WIDTH,
  SCORE_INCREASE,
} from '../../constants'
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
  StyledLives,
  StyledScore,
  StyledBackButton,
} from './StyledGame.js'
import { Autch, GameOver, MusicBoxMonsterTheme } from '../../assets/audio'
import { isTouchScreen } from '../../utils'

const Game = () => {
  const [t] = useTranslation()
  const history = useHistory()
  const bestScore = useMemo(
    () => +localStorage.getItem('flappyBirdBestScore') || 0,
    []
  )
  const [gameStage, setGameStage] = useState(GAME_STAGE.START)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(parseInt(0))
  const [hasAudio, setHasAudio] = useState(
    JSON.parse(localStorage.getItem('audio')) || false
  )
  const [showModal, setShowModal] = useState(false)

  const isPlaying =
    gameStage === GAME_STAGE.PLAY || gameStage === GAME_STAGE.HIT
  const isGameActive =
    gameStage === GAME_STAGE.PLAY ||
    gameStage === GAME_STAGE.PAUSE ||
    gameStage === GAME_STAGE.HIT

  const bird = useRef(null)
  const obstacles = useRef(null)

  const autchSound = useMemo(() => new Audio(Autch), [])
  const gameOverSound = useMemo(() => new Audio(GameOver), [])
  const themeMusic = useMemo(() => new Audio(MusicBoxMonsterTheme), [])

  const toggleAudio = () => setHasAudio(prevHasAudio => !prevHasAudio)

  const findBestScore = useCallback(() => {
    if (score >= bestScore) {
      localStorage.setItem('flappyBirdBestScore', score)
    }
  }, [bestScore, score])

  const updateScore = () => setScore(prevScore => prevScore + SCORE_INCREASE)

  const play = useCallback(() => {
    hasAudio && themeMusic.play()
    themeMusic.volume = 0.75
  }, [hasAudio, themeMusic])

  const onPlayPauseClick = useCallback(() => {
    const clickHandlers = {
      [GAME_STAGE.START]: () => setGameStage(GAME_STAGE.PLAY),
      [GAME_STAGE.PLAY]: () => setGameStage(GAME_STAGE.PAUSE),
      [GAME_STAGE.PAUSE]: () => setGameStage(GAME_STAGE.PLAY),
      [GAME_STAGE.OVER]: () => setGameStage(GAME_STAGE.START),
    }
    !!clickHandlers[gameStage] && clickHandlers[gameStage]()
  }, [gameStage])

  const onQuitClick = () => {
    setShowModal(true)
    setGameStage(GAME_STAGE.PAUSE)
  }

  const onCancelQuit = () => {
    setShowModal(false)
    setGameStage(GAME_STAGE.PLAY)
  }

  const onQuit = () => {
    onGameOver()
    setShowModal(false)
  }

  const onKeyDown = useCallback(
    event => {
      const keyDownHandlers = {
        [KEYBOARD_CODES.P_KEY]: onPlayPauseClick,
        [KEYBOARD_CODES.SPACE_KEY]: isPlaying ? bird.current.fly : () => null,
        [KEYBOARD_CODES.R_KEY]: () => setGameStage(GAME_STAGE.START),
        [KEYBOARD_CODES.Q_KEY]: onQuitClick,
        [GAME_STAGE.PLAY]: () => setGameStage(GAME_STAGE.OVER),
        [GAME_STAGE.OVER]: () => setGameStage(GAME_STAGE.START),
      }
      keyDownHandlers[event.code] && keyDownHandlers[event.code]()
    },
    [isPlaying, onPlayPauseClick]
  )

  const onGameClick = () => {
    const clickHandlers = {
      [GAME_STAGE.START]: () => setGameStage(GAME_STAGE.PLAY),
      [GAME_STAGE.PLAY]: bird.current.fly,
      [GAME_STAGE.OVER]: () => setGameStage(GAME_STAGE.START),
    }
    clickHandlers[gameStage] && clickHandlers[gameStage]()
  }

  const onGameOver = useCallback(() => {
    hasAudio && gameOverSound.play()
    setGameStage(GAME_STAGE.OVER)
    findBestScore()
  }, [gameOverSound, hasAudio, findBestScore])

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
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  useEffect(() => {
    document.addEventListener('mousemove', play)
    return () => document.removeEventListener('mousemove', play)
  }, [play])

  useEffect(() => {
    if (gameStage === GAME_STAGE.START) {
      setScore(0)
      setLives(3)
      gameOverSound.pause()
    }
  }, [gameStage, gameOverSound])

  useEffect(() => {
    let timerId
    if (gameStage === GAME_STAGE.HIT) {
      hasAudio && autchSound.play()
      setLives(prevLives => prevLives - 1)

      timerId = setTimeout(() => {
        bird.current.onHit()
        obstacles.current.onHit()
        setGameStage(GAME_STAGE.PLAY)
      }, 2000)
    }

    return () => clearTimeout(timerId)
  }, [gameStage, hasAudio, autchSound])

  useEffect(() => {
    let timerId
    if (isPlaying) {
      timerId = setInterval(() => {
        const birdTop = bird.current?.getBirdTop()
        const birdBottom = birdTop + BIRD_HEIGHT
        const birdRight = BIRD_LEFT + BIRD_WIDTH
        const obstaclesData = obstacles.current?.getData()

        !!obstaclesData?.length &&
          obstaclesData.forEach(obstacle => {
            const obstacleLeft = obstacle.left
            const obstacleRight = obstacle.left + OBSTACLE_WIDTH
            const topObstacleHeight = obstacle.height
            const bottomObstacleHeight =
              GAME_HEIGHT - obstacle.height - obstacle.gap
            const bottomObstacleTop = GAME_HEIGHT - bottomObstacleHeight

            if (
              birdRight > obstacleLeft &&
              BIRD_LEFT < obstacleRight &&
              (birdTop < topObstacleHeight || birdBottom > bottomObstacleTop)
            ) {
              if (lives > 0) {
                return setGameStage(GAME_STAGE.HIT)
              }

              onGameOver()
              return clearInterval(timerId)
            }
          })
      }, SLAPPY_GRAMMAR_TIME_INTERVAL)
    }
    return () => clearInterval(timerId)
  }, [isPlaying, gameStage, lives, onGameOver])

  const renderSubtitle = () => {
    const subtitles = {
      [GAME_STAGE.START]: t('game.getReady'),
      [GAME_STAGE.PLAY]: '',
      [GAME_STAGE.PAUSE]: t('game.paused'),
      [GAME_STAGE.OVER]: t('game.gameOver'),
    }
    return subtitles[gameStage]
  }

  return (
    <>
      <StyledGame>
        <StyledGameHeader>
          <StyledGameTitle>{t('slappyGrammar.title')}</StyledGameTitle>
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
          <Background gameStage={gameStage} sentencesNumber={SENTENCE_NUMBER} />
          <Obstacles
            ref={obstacles}
            obstaclesNumber={OBSTACLES_NUMBER}
            gameStage={gameStage}
            updateScore={updateScore}
          />
          {isGameActive && (
            <StyledGameData>
              <StyledLives>
                {!!lives &&
                  [...new Array(lives)].map((item, index) => (
                    <img key={`lives-${index}`} src={Heart} alt='heart icon' />
                  ))}
              </StyledLives>
              <StyledScore>{score}</StyledScore>
            </StyledGameData>
          )}
          {gameStage !== GAME_STAGE.PLAY && (
            <StyledGameSubtitle>{renderSubtitle()}</StyledGameSubtitle>
          )}
          {!isGameActive && (
            <StyledBoard
              gameStage={gameStage}
              score={score}
              bestScore={bestScore}
            />
          )}
          <Bird ref={bird} gameStage={gameStage} />
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
