import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  0%,
  50%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-2rem);
    -webkit-transform: translateY(-2rem);
    -moz-transform: translateY(-2rem);
    -ms-transform: translateY(-2rem);
    -o-transform: translateY(-2rem);
  }
  60% {
    transform: translateY(-1rem);
    -webkit-transform: translateY(-1rem);
    -moz-transform: translateY(-1rem);
    -ms-transform: translateY(-1rem);
    -o-transform: translateY(-1rem);
  }
`

const loading = keyframes`
0% {
  transform: translateY(0);
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
}
50%,
100% {
  transform: translateY(14.4rem);
  -webkit-transform: translateY(14.4rem);
  -moz-transform: translateY(14.4rem);
  -ms-transform: translateY(14.4rem);
  -o-transform: translateY(14.4rem);
}
`

export const StyledGameCardWrapper = styled.li`
  list-style: none;
  height: 5rem;
  width: 7rem;
  position: relative;
  transform-style: preserve-3d;
  animation: ${bounce} 1.2s ease-in-out;
  -webkit-animation: ${bounce} 1.2s ease-in-out;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 7.4rem;
    height: 9.4rem;
  }

  &:focus::after {
    content: '';
    position: absolute;
    top: -0.125rem;
    left: -0.125rem;
    right: -0.125rem;
    bottom: -0.125rem;
    outline: 0.3rem auto ${({ theme }) => theme.colors.font};
  }
`

export const StyledGameCard = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.26);
  border: 0.063rem solid ${({ theme }) => theme.colors.transparent};
  padding: 0.3rem;
  background: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  transition: transform 0.5s ease;
  -webkit-transition: transform 0.5s ease;
  -moz-transition: transform 0.5s ease;
  -ms-transition: transform 0.5s ease;
  -o-transition: transform 0.5s ease;
  backface-visibility: hidden;
  perspective: 37.5rem;
  overflow: hidden;
  border-radius: 0.4rem;
  -webkit-border-radius: 0.4rem;
  -moz-border-radius: 0.4rem;
  -ms-border-radius: 0.4rem;
  -o-border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    border: 0.125rem solid ${({ theme }) => theme.colors.font};
  }

  ${({ isSeledctedOrMatched }) =>
    isSeledctedOrMatched &&
    `
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
`}
`

export const StyledGameCardFace = styled(StyledGameCard)`
  pointer-events: none;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  cursor: default;

  ${({ isSeledctedOrMatched }) =>
    isSeledctedOrMatched &&
    `
  transform: rotateY(0deg);
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
`}
`

export const StyledGameCardSentence = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-style: italic;
  line-height: 1.4rem;
  color: ${({ theme }) => theme.colors.blue1};
  font-family: ${({ theme }) => theme.fonts.primary};
  word-break: break-word;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 110%;
    line-height: 1.7rem;
  }
`

export const StyledGameCardImage = styled.img`
  width: 100%;
  height: 100%;

  ${({ isLoaded }) =>
    !isLoaded &&
    `
  visibility: hidden;
`}
`

export const StyledGameCardImagePlaceholder = styled.div`
  background-color: ${({ theme }) => theme.colors.font};
  position: relative;
  overflow: hidden;
  opacity: 0.5;
  width: 100%;
  height: 100%;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.font},
      ${({ theme }) => theme.colors.disabled},
      ${({ theme }) => theme.colors.font}
    );
    animation: ${loading} 2s infinite linear;
    -webkit-animation: ${loading} 2s infinite linear;
  }
`
