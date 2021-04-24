import styled, { css, keyframes } from 'styled-components'
import { SpaceShip } from '../../../../assets/images'
import { SPACE_SHIP_HEIGHT, SPACE_SHIP_WIDTH } from '../../../../constants'

const spinning = keyframes`
100% { background-position: -42rem 0; }
`

export const StyledSpaceShip = styled.div`
  width: ${SPACE_SHIP_WIDTH}rem;
  height: ${SPACE_SHIP_HEIGHT}rem;
  background: url(${SpaceShip}) 0 0 no-repeat;
  position: absolute;
  bottom: 0;
  transition: all 0.3s linear;
  animation: ${spinning} 1s steps(6) infinite;

  ${({ isHit }) =>
    isHit &&
    css`
      transform: skew(-20deg, -25deg) scaleY(0.5) rotate(30deg);
      bottom: -1rem;
      animation-duration: 4s;
    `}
`
