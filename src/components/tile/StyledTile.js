import styled from 'styled-components'

export const StyledTile = styled.button`
  max-width: 22rem;
  max-height: 20rem;
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${({ theme }) => theme.colors.blue1};
  color: ${({ theme }) => theme.colors.white};
  font: inherit;
  cursor: pointer;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0.125rem;
  text-transform: uppercase;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};

  :hover {
    opacity: 0.75;
  }
`

export const StyledTitle = styled.h4``

export const StyledImage = styled.img`
  width: 90%;
  height: calc(90% / 1.58);
  box-shadow: 0.25rem 0.25rem 0.7rem rgb(0, 0, 0, 0.7);
  border-radius: 0.25rem;
  margin: 1rem 2rem;
`

export const StyledImagePlaceholder = styled.div`
  width: 90%;
  height: calc(90% / 1.58);
  margin: 1rem 2rem;
`

export const StyledDescription = styled.p`
  text-transform: lowercase;
  font-size: 75%;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.whie};
`
