import styled from 'styled-components'
import { Bullet } from '../../../../assets/images'
import { BULLET_WIDTH } from '../../../../constants'

export const StyledBullet = styled.div`
  background-image: url(${Bullet});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: absolute;
  z-index: 1;
  width: ${BULLET_WIDTH}rem;
  height: ${BULLET_WIDTH}rem;
  transition: transform 0.5s linear;

  ${({ isHit }) => isHit && `transform: scale(7) `}
`
