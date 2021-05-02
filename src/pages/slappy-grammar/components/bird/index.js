import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {
  BIRD_HEIGHT,
  BIRD_OVER_HEIGHT,
  GAME_HEIGHT,
  GAME_STAGE,
  BIRD_TOP,
  FLY_JUMP,
  GAME_GRAVITY,
  SLAPPY_GRAMMAR_TIME_INTERVAL,
} from '../../../../constants.js'
import { StyledBird } from './StyledBird.js'

const Bird = forwardRef(({ gameStage }, ref) => {
  const [birdTop, setBirdTop] = useState(BIRD_TOP)
  const isFlying = birdTop <= GAME_HEIGHT - BIRD_HEIGHT
  const isHit = gameStage === GAME_STAGE.OVER || gameStage === GAME_STAGE.HIT

  useImperativeHandle(ref, () => ({
    fly: () =>
      birdTop >= 0 && setBirdTop(prevBirdTop => prevBirdTop - FLY_JUMP),
    getBirdTop: () => birdTop,
    onHit: () => setBirdTop(BIRD_TOP),
  }))

  useEffect(() => {
    let timerId

    if (gameStage === GAME_STAGE.PLAY && isFlying) {
      timerId = setInterval(() => {
        setBirdTop(prevBirdTop => prevBirdTop + GAME_GRAVITY)
      }, SLAPPY_GRAMMAR_TIME_INTERVAL)
    }

    if (gameStage === GAME_STAGE.START) {
      setBirdTop(BIRD_TOP)
    }

    if (gameStage === GAME_STAGE.OVER) {
      setBirdTop(GAME_HEIGHT - BIRD_OVER_HEIGHT)
      clearInterval(timerId)
    }

    return () => clearInterval(timerId)
  }, [birdTop, gameStage, isFlying])

  return (
    <StyledBird
      style={{ top: `${birdTop}rem` }}
      isFlying={isFlying}
      isHit={isHit}
      isStart={gameStage === GAME_STAGE.START}
    />
  )
})

Bird.defaultProps = {
  gameStage: '',
}

export default Bird
