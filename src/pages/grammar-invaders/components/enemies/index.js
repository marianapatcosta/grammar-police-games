import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  GAME_WIDTH,
  GAME_STAGE,
  ENEMY_WIDTH,
  ENEMIES_PER_ROW,
  ENEMIES_NUMBER,
  ENEMY_HEIGHT,
  DISTANCE_BETWEEN_ENEMIES,
  GAME_HEIGHT,
  ENEMY_MOVE,
  GRAMMAR_INVADERS_TIME_INTERVAL,
  enemiesColors,
  ENEMY_HIT_TIME_INTERVAL,
} from '../../../../constants.js'
import { getRandomInt, getRandomizedSentences } from '../../../../utils.js'
import { sentencesEN, sentencesPT } from '../../../../constants.js'
import { Enemy } from '../index.js'
import { StyledEnemies } from './StyledEnemies.js'

const Enemies = forwardRef(({ enemiesNumber, gameStage, updateScore }, ref) => {
  const [, i18n] = useTranslation()
  const [direction, setDirection] = useState(1)
  const [isGoingLeft, setIsGoingLeft] = useState(false)
  const [isGoingDown, setIsGoingDown] = useState(false)
  const [enemiesProps, setEnemiesProps] = useState([])
  const [initialEnemiesProps, setInitialEnemiesProps] = useState([])

  const sentences = i18n.language === 'en' ? sentencesEN : sentencesPT
  const sentencesToDisplay = useMemo(
    () => getRandomizedSentences(sentences).slice(0, enemiesNumber),
    [sentences, enemiesNumber]
  )

  // length is considered so the first row is the one closest to the game bottom
  const getEnemyRow = useCallback(
    (index, length) =>
      !!length
        ? // nr rows in the game minus the 0-based roow of the enemy
          Math.floor((length - 1) / ENEMIES_PER_ROW) -
          Math.floor(index / ENEMIES_PER_ROW)
        : Math.floor(index / ENEMIES_PER_ROW),
    []
  )

  const getEnemyColumn = useCallback(
    index => index - getEnemyRow(index) * ENEMIES_PER_ROW,
    [getEnemyRow]
  )

  const getTop = useCallback(
    index => {
      // adjustment to consider to initially render in the game only the first two rows of enemies
      const adjustment =
        (ENEMY_HEIGHT + DISTANCE_BETWEEN_ENEMIES * 2) *
        (Math.floor((sentencesToDisplay.length - 1) / ENEMIES_PER_ROW) - 1)
      return (
        ENEMY_HEIGHT * getEnemyRow(index, sentencesToDisplay.length) +
        DISTANCE_BETWEEN_ENEMIES *
          2 *
          (getEnemyRow(index, sentencesToDisplay.length) + 1) -
        adjustment
      )
    },
    [getEnemyRow, sentencesToDisplay]
  )

  const getLeft = useCallback(
    index =>
      ENEMY_WIDTH * getEnemyColumn(index) +
      DISTANCE_BETWEEN_ENEMIES * getEnemyColumn(index),
    [getEnemyColumn]
  )

  const getInitialEnemiesProps = useCallback(
    () =>
      sentencesToDisplay.map((sentence, index) => ({
        sentence,
        backgroundColor: enemiesColors[getRandomInt(0, enemiesColors.length)],
        left: getLeft(index),
        top: getTop(index),
      })),
    [sentencesToDisplay, getLeft, getTop]
  )

  const removeEnemy = enemyIndex =>
    setEnemiesProps(prevEnemiesProps =>
      prevEnemiesProps.filter((enemyProps, index) => index !== enemyIndex)
    )

  useImperativeHandle(ref, () => ({
    getData: () => enemiesProps.map(({ left, top }) => ({ left, top })),
    onSpaceShipHit: () => {
      const remainingSentences = enemiesProps.map(({ sentence }) => sentence)
      const remainingEnemiesProps = initialEnemiesProps.filter(({ sentence }) =>
        remainingSentences.includes(sentence)
      )
      setEnemiesProps(remainingEnemiesProps)
      setInitialEnemiesProps(remainingEnemiesProps)
    },
    onEnemyHit: enemyIndex => {
      setEnemiesProps(prevEnemiesProps =>
        prevEnemiesProps.map((enemyProps, index) =>
          index === enemyIndex ? { ...enemyProps, isHit: true } : enemyProps
        )
      )
      const timerId = setTimeout(() => {
        setEnemiesProps(prevEnemiesProps =>
          prevEnemiesProps.map((enemyProps, index) =>
            index === enemyIndex ? { ...enemyProps, isHit: false } : enemyProps
          )
        )
        removeEnemy(enemyIndex)
        clearTimeout(timerId)
      }, ENEMY_HIT_TIME_INTERVAL)
    },
  }))

  useEffect(() => {
    if (gameStage === GAME_STAGE.START) {
      const initialEnemiesProps = getInitialEnemiesProps()
      setEnemiesProps(initialEnemiesProps)
      setInitialEnemiesProps(initialEnemiesProps)
    }
  }, [gameStage, getInitialEnemiesProps])

  useEffect(() => {
    let timerId
    if (gameStage === GAME_STAGE.PLAY && !!enemiesProps.length) {
      timerId = setInterval(() => {
        setIsGoingDown(false)
        const leftEdge = enemiesProps.some(enemyProps => enemyProps.left <= 0)
        const rightEdge = enemiesProps.some(
          enemyProps => enemyProps.left + ENEMY_WIDTH >= GAME_WIDTH
        )

        if (leftEdge && isGoingLeft) {
          setDirection(1)
          setIsGoingLeft(false)
          setIsGoingDown(true)
        }

        if (rightEdge && !isGoingLeft) {
          setDirection(-1)
          setIsGoingLeft(true)
          setIsGoingDown(true)
        }

        const updatedObstaclesProps = enemiesProps.map(propsData => {
          if (propsData.top + ENEMY_HEIGHT >= GAME_HEIGHT) {
            return propsData
          }
          return {
            ...propsData,
            left: propsData.left + direction * ENEMY_MOVE,
            top: isGoingDown ? propsData.top + ENEMY_MOVE * 10 : propsData.top,
          }
        })
        setEnemiesProps(updatedObstaclesProps)
      }, GRAMMAR_INVADERS_TIME_INTERVAL)
    }

    if (gameStage === GAME_STAGE.OVER) {
      clearInterval(timerId)
    }

    return () => clearInterval(timerId)
  }, [
    enemiesProps,
    gameStage,
    updateScore,
    direction,
    isGoingLeft,
    isGoingDown,
  ])

  return (
    <StyledEnemies>
      {enemiesProps.map((propsData, index) => (
        <Enemy {...propsData} key={`enemy-${index}`} />
      ))}
    </StyledEnemies>
  )
})

Enemies.defaultProps = {
  gameStage: '',
  enemiesNumber: ENEMIES_NUMBER,
}

export default Enemies
