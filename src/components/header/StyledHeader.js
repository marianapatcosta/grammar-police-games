import styled from 'styled-components'

export const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  padding: 0 3rem;
  box-sizing: border-box;
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blue1};
  box-shadow: 0 0.125rem 0.125rem ${({ theme }) => theme.colors.black};
  z-index: 10;
`

export const StyledHeaderTitle = styled.h2`
  font-size: 130%;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
`

export const StyledHeaderLocales = styled.div`
  display: flex;
  align-items: center;
`

export const StyledHeaderButton = styled.button`
  display: flex;
  align-items: center;
  width: 2.3rem;
  border: none;
  background: none;
  font: inherit;
  margin-left: 0.5rem;
  cursor: pointer;
  box-shadow: 0.0625rem 0.0625rem 0.2rem ${({ theme }) => theme.colors.black};

  :hover {
    opacity: 0.75;
  }
`

export const StyledHeaderButtonImage = styled.img`
  width: 100%;
`
