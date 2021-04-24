import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {
  GAME_WIDTH,
  MAX_GAP,
  MIN_GAP,
  MAX_OBSTACLE_HEIGHT,
  MIN_OBSTACLE_HEIGHT,
  OBSTACLE_INTERVAL,
  OBSTACLE_MOVE,
  OBSTACLE_WIDTH,
  GAME_STAGE,
  OBSTACLES_NUMBER,
  OBSTACLE_TOP_WIDTH,
  SLAPPY_GRAMMAR_TIME_INTERVAL,
  BIRD_LEFT,
} from '../../../../constants.js'
import { getRandomInt } from '../../../../utils.js'
import { Obstacle } from '../index.js'
import { StyledObstacles } from './StyledObstacles.js'

const Obstacles = forwardRef(
  ({ obstaclesNumber, gameStage, updateScore }, ref) => {
    const getInitialObstacleProps = useCallback(
      () =>
        [...Array(obstaclesNumber)].map((item, index) => ({
          left:
            GAME_WIDTH +
            (OBSTACLE_TOP_WIDTH - OBSTACLE_WIDTH) / 2 +
            index * OBSTACLE_INTERVAL,
          gap: getRandomInt(MIN_GAP, MAX_GAP),
          height: getRandomInt(MIN_OBSTACLE_HEIGHT, MAX_OBSTACLE_HEIGHT),
        })),
      [obstaclesNumber]
    )

    const [obstaclesProps, setObstaclesProps] = useState(
      getInitialObstacleProps()
    )

    useImperativeHandle(ref, () => ({
      getData: () => obstaclesProps,
      onHit: () => setObstaclesProps(getInitialObstacleProps()),
    }))

    useEffect(() => {
      if (gameStage === GAME_STAGE.START) {
        setObstaclesProps(getInitialObstacleProps())
      }
    }, [gameStage, getInitialObstacleProps])

    useEffect(() => {
      let timerId
      if (gameStage === GAME_STAGE.PLAY) {
        timerId = setInterval(() => {
          const updatedObstaclesProps = obstaclesProps.map(propsData => {
            if (
              propsData.left > BIRD_LEFT &&
              propsData.left - OBSTACLE_MOVE < BIRD_LEFT
            ) {
              updateScore()
            }

            if (propsData.left > -OBSTACLE_WIDTH) {
              return { ...propsData, left: propsData.left - OBSTACLE_MOVE }
            }
            return {
              left: GAME_WIDTH + OBSTACLE_WIDTH,
              gap: getRandomInt(MIN_GAP, MAX_GAP),
              height: getRandomInt(MIN_OBSTACLE_HEIGHT, MAX_OBSTACLE_HEIGHT),
            }
          })
          setObstaclesProps(updatedObstaclesProps)
        }, SLAPPY_GRAMMAR_TIME_INTERVAL)
      }

      if (gameStage === GAME_STAGE.OVER) {
        clearInterval(timerId)
      }

      return () => clearInterval(timerId)
    }, [obstaclesProps, gameStage, updateScore])

    return (
      <StyledObstacles>
        {obstaclesProps.map((propsData, index) => (
          <Obstacle {...propsData} key={`obstacle-${index}`} />
        ))}
      </StyledObstacles>
    )
  }
)

Obstacles.defaultProps = {
  gameStage: '',
  obstaclesNumber: OBSTACLES_NUMBER,
}

export default Obstacles
