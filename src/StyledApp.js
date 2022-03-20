import styled from 'styled-components'

export const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

export const StyledMain = styled.main`
  flex: 1;
  overflow: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
  }
`

