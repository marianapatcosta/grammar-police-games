import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Bullet } from '../'
import { SpaceShip as SpaceShipImage } from '../../../../assets/images/index.js'
import { Shoot } from '../../../../assets/audio/index.js'
import {
  SPACE_SHIP_LEFT,
  GAME_STAGE,
  SPACE_SHIP_MOVE,
  DIRECTIONS,
  GAME_WIDTH,
  SPACE_SHIP_WIDTH,
  BULLET_TOP,
  BULLET_WIDTH,
  ENEMY_HIT_TIME_INTERVAL,
} from '../../../../constants.js'
import { StyledSpaceShip } from './StyledSpaceShip.js'

const SpaceShip = forwardRef(({ gameStage, hasAudio }, ref) => {
  const [spaceShipLeft, setSpaceShipLeft] = useState(SPACE_SHIP_LEFT)
  const [bullets, setBullets] = useState([])
  const isHit = gameStage === GAME_STAGE.OVER || gameStage === GAME_STAGE.HIT

  useImperativeHandle(ref, () => ({
    move: direction => {
      if (
        direction === DIRECTIONS.LEFT &&
        spaceShipLeft - SPACE_SHIP_MOVE > 0
      ) {
        setSpaceShipLeft(
          prevSpaceShipLeft => prevSpaceShipLeft - SPACE_SHIP_MOVE
        )
      }
      if (
        direction === DIRECTIONS.RIGHT &&
        spaceShipLeft + SPACE_SHIP_WIDTH + SPACE_SHIP_MOVE <= GAME_WIDTH
      ) {
        setSpaceShipLeft(
          prevSpaceShipLeft => prevSpaceShipLeft + SPACE_SHIP_MOVE
        )
      }
    },
    shoot: () => {
      if (gameStage !== GAME_STAGE.PLAY) return
      setBullets(prevBullets => [
        ...prevBullets,
        {
          left: spaceShipLeft + SPACE_SHIP_WIDTH / 2 - BULLET_WIDTH / 2,
          top: BULLET_TOP,
        },
      ])
      hasAudio && new Audio(Shoot).play()
    },
    getSpaceShiftLeft: () => spaceShipLeft,
    getBullets: () => bullets,
    onSpaceShipHit: () => {
      setSpaceShipLeft(SPACE_SHIP_LEFT)
      setBullets([])
    },
    onBulletHit: bulletIndex => {
      setBullets(prevBullets =>
        prevBullets.map((bullet, index) =>
          index === bulletIndex ? { ...bullet, isHit: true } : bullet
        )
      )
      const timerId = setTimeout(() => {
        removeBullet(bulletIndex)
        clearTimeout(timerId)
      }, ENEMY_HIT_TIME_INTERVAL)
    },
  }))

  const removeBullet = bulletIndex => {
    setBullets(prevBullets =>
      prevBullets.filter((bullet, index) => index !== bulletIndex)
    )
  }

  const updateBulletTop = (bulletIndex, updatedTop) => {
    setBullets(prevBullets =>
      prevBullets.map((bullet, index) =>
        index === bulletIndex ? { ...bullet, top: updatedTop } : bullet
      )
    )
  }

  useEffect(() => {
    let timerId

    if (gameStage === GAME_STAGE.START) {
      setSpaceShipLeft(SPACE_SHIP_LEFT - 5)
      setBullets([])
    }

    if (gameStage === GAME_STAGE.OVER) {
      clearInterval(timerId)
    }

    return () => clearInterval(timerId)
  }, [spaceShipLeft, gameStage])

  return (
    <>
      <StyledSpaceShip
        style={{ left: `${spaceShipLeft}rem` }}
        isHit={isHit}
        src={SpaceShipImage}
        alt='space ship'
      />

      {bullets.map((bulletProps, index) => (
        <Bullet
          {...bulletProps}
          key={`bullet-${index}`}
          gameStage={gameStage}
          removeBullet={() => removeBullet(index)}
          updateBulletTop={updatedTop => updateBulletTop(index, updatedTop)}
        />
      ))}
    </>
  )
})

SpaceShip.defaultProps = {
  gameStage: '',
  hasAudio: false,
  isHit: false,
}

export default SpaceShip
