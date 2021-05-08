import styled from 'styled-components'
import { isTouchScreen } from '../../../../utils'

export const StyledBoard = styled.div`
  position: absolute;
  width: 21.5rem;
  height: 15rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.red};
  box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.3) inset;
  border-radius: 0.3rem;
  font-size: 75%;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 16.5rem;
    width: 25rem;
  }

  ${({ isPT }) =>
    isPT &&
    `  
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 25rem;
    }`}

  p {
    margin-top: ${isTouchScreen() ? '0' : '1rem'};

    kbd {
      font-family: ${({ theme }) => theme.fonts.game};
      font-size: 110%;
      -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.red};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.font};
    }

    :nth-child(2) {
      margin: ${isTouchScreen() && '1rem 0'};
    }

    :first-child {
      margin-top: 0;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.font};
      -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.red};
    }

    :last-child {
      display: block;
      margin-top: 2rem;
      margin-bottom: 0;
      font-size: 120%;
      text-align: center;
    }
  }
`

export const StyledBoardOver = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const StyledBoardOverTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 110%;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.red};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.blue1};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 130%;
  }
`

export const StyledMedalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 6rem;
    margin-top: 0.5rem;
  }
`

export const StyledResults = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    :first-child {
      margin-bottom: 2rem;
    }
  }

  span {
    background-color: ${({ theme }) => theme.colors.blue1};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
    padding: 0.2rem;
    margin-right: 0.3rem;
  }

  img {
    width: 5rem;
    margin-top: 1rem;
  }
`

export const StyledTimeSpent = styled.div`
  margin-left: 1rem;
  font-size: 200%;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
`
