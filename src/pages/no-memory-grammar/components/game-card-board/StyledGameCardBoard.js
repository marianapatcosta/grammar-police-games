import styled from 'styled-components'

export const StyledGameCardBoard = styled.ul`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, 6.5rem);
  grid-template-rows: repeat(auto-fit, 5rem);
  grid-column-gap: 0.3rem;
  grid-row-gap: 0.3rem;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100%;
  padding: 0.3rem 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-rows: repeat(auto-fit, 9.2rem);
    grid-template-columns: repeat(auto-fit, 8rem);
    padding: 0;
    justify-content: center;
  }

  ${({ isPlaying }) => !isPlaying && `pointer-events: none`}
`
