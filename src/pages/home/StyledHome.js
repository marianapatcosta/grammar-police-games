import styled from 'styled-components'

export const StyledHome = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const StyledHomeTitle = styled.h3`
  text-align: center;
  font-size: 130%;
  margin: 2rem 0;
  text-transform: lowercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 150%;
    margin: 4rem 0;
  }
`

export const StyledTileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 2rem;
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }

  & button {
    margin-bottom: 1rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin: 0 2rem 1rem;
    }
  }
`

export const StyledFooter = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.font};
  color: ${({ theme }) => theme.colors.white};
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  text-transform: uppercase;
  height: 2rem;
  font-size: 50%;
  padding: 1rem 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 3rem;
  }

  p:first-child {
    font-size: 130%;
    font-weight: 700;
    -webkit-text-stroke: 0;
    padding-right: 0.1rem;
  }
`

export const StyledLink = styled.a`
  margin-left: 0.7rem;
  text-decoration: none;

  :first-child {
    margin-left: 1rem;
  }

  img {
    display: block;
    width: 1.2rem;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
      brightness(102%) contrast(102%);
  }
`
