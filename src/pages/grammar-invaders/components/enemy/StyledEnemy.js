import styled, { css, keyframes } from 'styled-components'
import { ENEMY_WIDTH, ENEMY_HEIGHT } from '../../../../constants'

const shine = keyframes`
10% {
    opacity: 1;
    top: -30%;
    left: -30%;
    transition-property: left, top, opacity;
    transition-duration: 0.7s, 0.7s, 0.15s;
    transition-timing-function: ease;
  }
  100% {
    opacity: 0;
    top: -30%;
    left: -30%;
    transition-property: left, top, opacity;
  }
`

const flame = keyframes`
0% {height: ${ENEMY_HEIGHT}rem; width:${ENEMY_WIDTH}rem; filter: blur(0)}
50% {height: ${ENEMY_HEIGHT * 0.95}rem; width:${
  ENEMY_WIDTH * 0.95
}rem;filter: blur(0.2rem)}
100% {height:${ENEMY_HEIGHT}rem; width:${ENEMY_WIDTH}rem;filter: blur(0rem)}
`

export const StyledEnemy = styled.div`
  width: ${ENEMY_WIDTH}rem;
  height: ${ENEMY_HEIGHT}rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  position: absolute;
  z-index: 1;
  box-shadow: -0.2rem -0.2rem 0.3rem 0 inset rgb(0, 0, 0);
  transition: all 0.1s linear;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.5rem;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-style: italic;
    font-size: 90%;
    text-transform: none;
    color: ${({ theme }) => theme.colors.font};
    overflow: hidden;

    :after {
      animation: ${shine} 3s ease-in-out infinite;
      animation-fill-mode: forwards;
      content: '';
      position: absolute;
      top: -110%;
      left: -140%;
      width: 120%;
      height: 135%;
      opacity: 0;
      transform: rotate(10deg);
      background: rgba(255, 255, 255, 0.75);
      border-radius: 1.5rem;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.15) 37%,
        rgba(255, 255, 255, 0.3) 82%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }

  :before {
    content: '';
    position: absolute;
    width: 1.1rem;
    height: 0.3rem;
    bottom: 92.5%;
    left: 1.5em;
    background-color: inherit;
    ${({ isHit }) =>
      isHit &&
      css`
        background-color: #ff9046;
      `}
  }

  :after {
    bottom: 100%;
    left: 1rem;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    border-color: ${({ theme }) => theme.colors.transparent};
    border-bottom-color: inherit;
    border-width: 0.5rem;
    margin-left: 0.5rem;

    ${({ isHit }) =>
      isHit &&
      css`
        border-bottom-color: #ff9046;
      `}
  }

  ${({ isHit }) =>
    isHit &&
    css`
      background: linear-gradient(-45deg, red, orange);
      animation: ${flame} 0.3s infinite;
    `}
`
