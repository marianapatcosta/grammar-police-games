import styled, { css, keyframes } from 'styled-components'
import { Bird } from '../../../../assets/images'
import { BIRD_HEIGHT, BIRD_LEFT, BIRD_WIDTH } from '../../../../constants'

const birdFlight = keyframes`
100% { background-position: -24.2rem 0; }
`

const birdHit = keyframes`
0 { background-position: -18.2rem -4.8rem; }
100% { background-position: -18.2rem -4.8rem; }
`

export const StyledBird = styled.div`
  width: ${BIRD_WIDTH}rem;
  height: ${BIRD_HEIGHT}rem;
  background: url(${Bird}) 0 0 no-repeat;
  position: absolute;
  left: ${BIRD_LEFT}rem;
  transition: top 0.1s linear;

  ${({ isFlying }) =>
    isFlying &&
    css`
      animation: ${birdFlight} 1s steps(4) infinite;
    `}

  ${({ isHit }) =>
    isHit &&
    css`
      transition: top 1s ease-in-out;
      z-index: 2;
      height: 5.75rem;
      background: url(${Bird}) 0 -4.8rem no-repeat;
      animation: ${birdHit} 1s steps(3) infinite;
    `}

    ${({ isStart }) =>
    isStart &&
    css`
      transition: top 1s ease-in-out;
    `}
`
