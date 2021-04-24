import React from 'react'
import { StyledObstacle } from './StyledObstacle.js'
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  MAX_GAP,
  MIN_OBSTACLE_HEIGHT,
  OBSTACLE_WIDTH,
} from '../../../../constants.js'

const Obstacle = ({ gap, height, left }) => {
  const secondHeight = GAME_HEIGHT - height - gap
  const secondTop = GAME_HEIGHT - secondHeight
  const isLeavingScreen = left > GAME_WIDTH - 2 * OBSTACLE_WIDTH

  return (
    <>
      <StyledObstacle
        isTopObstacle
        isLeavingScreen={isLeavingScreen}
        style={{ height: `${height}rem`, left: `${left}rem`, top: 0 }}
      />
      <StyledObstacle
        isLeavingScreen={isLeavingScreen}
        style={{
          height: `${secondHeight}rem`,
          left: `${left}rem`,
          top: `${secondTop}rem`,
        }}
      />
    </>
  )
}

Obstacle.defaultProps = {
  gap: MAX_GAP,
  height: MIN_OBSTACLE_HEIGHT,
  left: 0,
}

export default Obstacle
