import React, { useEffect } from 'react'
import {
  BULLET_MOVE,
  BULLET_WIDTH,
  GAME_HEIGHT,
  GAME_STAGE,
  GRAMMAR_INVADERS_TIME_INTERVAL,
  SPACE_SHIP_HEIGHT,
} from '../../../../constants.js'
import { StyledBullet } from './StyledBullet.js'

const Bullet = ({
  left: bulletLeft,
  top: bulletTop,
  isHit,
  gameStage,
  removeBullet,
  updateBulletTop,
}) => {
  const isLeavingScreen =
    bulletTop <= -GAME_HEIGHT + SPACE_SHIP_HEIGHT - BULLET_WIDTH

  useEffect(() => {
    let timerId
    if (gameStage === GAME_STAGE.PLAY) {
      timerId = setInterval(() => {
        if (!isHit && !isLeavingScreen) {
          updateBulletTop(bulletTop - BULLET_MOVE)
        }

        if (isLeavingScreen) {
          removeBullet()
        }

        if (gameStage === GAME_STAGE.OVER) {
          clearInterval(timerId)
        }
      }, GRAMMAR_INVADERS_TIME_INTERVAL)
    }
    return () => {
      clearInterval(timerId)
    }
  }, [
    gameStage,
    isLeavingScreen,
    isHit,
    removeBullet,
    updateBulletTop,
    bulletTop,
  ])

  return (
    <StyledBullet
      isHit={isHit}
      isLeavingScreen={isLeavingScreen}
      style={{ top: `${bulletTop}rem`, left: `${bulletLeft}rem` }}
    />
  )
}

Bullet.defaultProps = {
  left: 0,
  isHit: false,
  gameStage: '',
  removeBullet: () => null,
  updateBulletTop: () => null,
}

export default Bullet
