import React from 'react'
import { StyledEnemy } from './StyledEnemy.js'
import { GAME_WIDTH, OBSTACLE_WIDTH } from '../../../../constants.js'

const Enemy = ({ sentence, top, left, isHit, backgroundColor }) => {
  const isLeavingScreen = left > GAME_WIDTH - 2 * OBSTACLE_WIDTH

  return (
    <StyledEnemy
      isLeavingScreen={isLeavingScreen}
      isHit={isHit}
      style={{
        top: `${top}rem`,
        left: `${left}rem`,
        backgroundColor: `${backgroundColor}`,
        borderColor: `${backgroundColor}`,
      }}
    >
      <p> {sentence}</p>
    </StyledEnemy>
  )
}

Enemy.defaultProps = {
  top: 0,
  left: 0,
  sentence: '',
  isHit: false,
  backgroundColor: '#ffffff',
}

export default Enemy
