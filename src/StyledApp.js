import styled from 'styled-components'

export const StyledMain = styled.main`
  padding-top: 4rem;
  min-height: calc(100vh - 6rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 6rem;
    min-height: calc(100vh - 9rem);
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
  padding: 1.5rem 0 0.625rem;
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
