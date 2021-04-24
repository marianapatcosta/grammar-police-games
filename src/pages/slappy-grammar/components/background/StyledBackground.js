import styled, { css, keyframes } from 'styled-components'
import { WallBackground } from '../../../../assets/images'
import { BACKGROUND_TIME_INTERVAL, GAME_WIDTH } from '../../../../constants'

const slide = keyframes`
0 { background-position: left 0; }
100% { background-position: -${GAME_WIDTH * 2}rem 0rem; }
`

const fontSlide = x => keyframes`
100% { left: ${x - GAME_WIDTH * 2}rem; }
`

export const StyledBackground = styled.div`
  background-image: url(${WallBackground});
  background-position: center center;
  background-size: cover;
  background-repeat: repeat-x;
  width: ${GAME_WIDTH * 2}rem;
  height: 100%;
  position: relative;
  overflow: hidden;

  ${({ isPlaying }) =>
    isPlaying &&
    css`
      animation: ${slide} ${BACKGROUND_TIME_INTERVAL / 1000}s linear infinite;
    `}
`

export const StyledGraffiti = styled.p`
  position: absolute;
  -webkit-text-stroke: 0;
  max-width: 20rem;
  font-size: 200%;
  line-height: 2rem;
  opacity: 0.9;
  -webkit-text-stroke: 0.08rem ${({ theme }) => theme.colors.font};

  ${({ isPlaying }) =>
    isPlaying &&
    css`
      animation: ${({ x }) => fontSlide(x)} ${BACKGROUND_TIME_INTERVAL / 1000}s
        linear infinite;
    `}

  ${({ biggerShadow, theme }) =>
    biggerShadow
      ? `text-shadow: 0 0 0 rgb(248,186,0),
        0 -0.5rem 0 rgba(0,0,0,0.6),
        0 -0.56rem 0 rgba(0,0,0,0.6),
        0 -0.625rem 0 rgba(0,0,0,0.6),
        0 -0.7rem 0.625rem rgba(0,0,0,0.6),
        0 -0.7rem 0.0625rem rgba(0,0,0,0.5),
        0 0 0.625rem rgba(0,0,0,.2);`
      : `text-shadow: 0.125rem 0.125rem 0.25rem ${theme.colors.black};`}
`
