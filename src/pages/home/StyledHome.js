import styled from 'styled-components'

export const StyledHome = styled.div``

export const StyledHomeTitle = styled.h3`
  text-align: center;
  font-size: 150%;
  margin: 2rem 0;
  text-transform: lowercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 4rem 0;
  }
`

export const StyledTileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }

  & button {
    margin-bottom: 1rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin: 0 2rem 1rem;
    }
  }
`
