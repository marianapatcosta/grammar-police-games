import styled from 'styled-components'
import { Obstacle, ObstacleTop } from '../../../../assets/images'
import {
  OBSTACLE_WIDTH,
  OBSTACLE_TOP_WIDTH,
  OBSTACLE_TOP_HEIGHT,
} from '../../../../constants'

export const StyledObstacle = styled.div`
  background-image: url(${Obstacle});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 99.9% 101%;
  width: ${OBSTACLE_WIDTH}rem;
  position: absolute;
  z-index: 1;

  ${({ isLeavingScreen }) =>
    !isLeavingScreen
      ? `transition: left 0.1s linear; `
      : `transition: left 0s linear;`}

  :after {
    content: '';
    background: url(${ObstacleTop});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 99% 99%;
    position: absolute;
    left: -${(OBSTACLE_TOP_WIDTH - OBSTACLE_WIDTH) / 2}rem;
    width: ${OBSTACLE_TOP_WIDTH}rem;
    height: ${OBSTACLE_TOP_HEIGHT}rem;
    display: block;

    ${({ isTopObstacle }) => isTopObstacle && `bottom: 0;`}
  }
`
