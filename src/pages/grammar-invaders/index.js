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
import { Background, SpaceShip, Enemies } from './components/'
import {
  GAME_STAGE,
  KEYBOARD_CODES,
  GAME_HEIGHT,
  ENEMIES_NUMBER,
  GRAMMAR_INVADERS_TIME_INTERVAL,
  SCORE_INCREASE,
  DIRECTIONS,
  SPACE_SHIP_WIDTH,
  SPACE_SHIP_HEIGHT,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  BULLET_WIDTH,
  ENEMY_HIT_TIME_INTERVAL,
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
import { Autch, GameOver, BattleTheme, Boom, Yupi } from '../../assets/audio'

const Game = () => {
  const [t] = useTranslation()
  const history = useHistory()
  const bestScore = useMemo(
    () => +localStorage.getItem('grammarInvadersBestScore') || 0,
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
    gameStage === GAME_STAGE.HIT ||
    gameStage === GAME_STAGE.ENEMY_HIT

  const spaceShip = useRef(null)
  const enemies = useRef(null)

  const autchSound = useMemo(() => new Audio(Autch), [])
  const gameOverSound = useMemo(() => new Audio(GameOver), [])
  const gameWonSound = useMemo(() => new Audio(Yupi), [])
  const themeMusic = useMemo(() => new Audio(BattleTheme), [])

  const toggleAudio = () => setHasAudio(prevHasAudio => !prevHasAudio)

  const findBestScore = useCallback(() => {
    if (score >= bestScore) {
      localStorage.setItem('grammarInvadersBestScore', score)
    }
  }, [bestScore, score])

  const updateScore = () => setScore(prevScore => prevScore + SCORE_INCREASE)

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
        [KEYBOARD_CODES.SPACE_KEY]: isPlaying
          ? spaceShip.current.shoot
          : () => null,
        [KEYBOARD_CODES.LEFT_ARROW_KEY]: isPlaying
          ? () => spaceShip.current.move(DIRECTIONS.LEFT)
          : () => null,
        [KEYBOARD_CODES.RIGHT_ARROW_KEY]: isPlaying
          ? () => spaceShip.current.move(DIRECTIONS.RIGHT)
          : () => null,
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
      [GAME_STAGE.PLAY]: spaceShip.current.shoot,
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
        spaceShip.current.onSpaceShipHit()
        enemies.current.onSpaceShipHit()
        setGameStage(GAME_STAGE.PLAY)
      }, 2000)
    }

    return () => clearTimeout(timerId)
  }, [gameStage, hasAudio, autchSound])

  useEffect(() => {
    let timerId
    if (gameStage === GAME_STAGE.ENEMY_HIT) {
      updateScore()
      hasAudio && new Audio(Boom).play()
      timerId = setTimeout(() => {
        setGameStage(GAME_STAGE.PLAY)
      }, ENEMY_HIT_TIME_INTERVAL)
    }
    return () => clearTimeout(timerId)
  }, [gameStage, hasAudio])

  useEffect(() => {
    let timerId
    if (isPlaying) {
      timerId = setInterval(() => {
        const spaceShipLeft = spaceShip.current?.getSpaceShiftLeft()
        const spaceShipRight = spaceShipLeft + SPACE_SHIP_WIDTH
        const spaceShipTop = GAME_HEIGHT - SPACE_SHIP_HEIGHT
        const enemiesData = enemies.current?.getData()
        const bulletsData = spaceShip.current?.getBullets()

        if (!enemiesData?.length) {
          setGameStage(GAME_STAGE.WON)
          gameWonSound.play()
          findBestScore()
          return clearInterval(timerId)
        }

        !!enemiesData?.length &&
          enemiesData.forEach((enemy, enemyIndex) => {
            const enemyleLeft = enemy.left
            const enemyRight = enemy.left + ENEMY_WIDTH
            const enemyBottom = enemy.top + ENEMY_HEIGHT

            // check game over
            if (
              enemyBottom >= GAME_HEIGHT ||
              (spaceShipRight > enemyleLeft &&
                spaceShipLeft < enemyRight &&
                spaceShipTop < enemyBottom)
            ) {
              if (lives > 0) {
                return setGameStage(GAME_STAGE.HIT)
              }

              onGameOver()
              return clearInterval(timerId)
            }

            // check hit enemies
            !!bulletsData.length &&
              bulletsData.forEach((bullet, bulletIndex) => {
                const bulletLeft = bullet.left
                const bulletRight = bullet.left + BULLET_WIDTH
                const bulletTop = bullet.top

                if (
                  bulletRight > enemyleLeft &&
                  bulletLeft < enemyRight &&
                  bulletTop < enemyBottom &&
                  // to consider only if both bullet and enemy are visible/ are in the game field
                  bulletTop > 0 &&
                  enemyBottom > 0
                ) {
                  setGameStage(GAME_STAGE.ENEMY_HIT)
                  enemies.current?.onEnemyHit(enemyIndex)
                  spaceShip.current?.onBulletHit(bulletIndex)
                }
              })
          })
      }, GRAMMAR_INVADERS_TIME_INTERVAL)
    }
    return () => clearInterval(timerId)
  }, [
    isPlaying,
    gameStage,
    gameWonSound,
    lives,
    hasAudio,
    onGameOver,
    findBestScore,
  ])

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
          <StyledGameTitle>{t('grammarInvaders.title')}</StyledGameTitle>
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
          <Background />
          <Enemies
            ref={enemies}
            enemiesNumber={ENEMIES_NUMBER}
            gameStage={gameStage}
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
          <SpaceShip
            ref={spaceShip}
            gameStage={gameStage}
            hasAudio={hasAudio}
          />
        </StyledGamePlayground>
        <StyledBackButton
          onClick={() => history.push('/')}
          label={t('game.back')}
          icon={Back}
        />
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
