import styled from 'styled-components'

export const StyledButton = styled.button`
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.orange};
  padding: 0.3rem;
  color: ${({ theme }) => theme.colors.font};
  border: 0.0625rem solid ${({ theme }) => theme.colors.black};
  line-height: 1.1em;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  position: relative;
  overflow: hidden;
  user-select: none;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 0.0625rem 0.2rem 0 ${({ theme }) => theme.colors.black};

  :hover {
    opacity: 80%;
  }

  ${({ disabled }) => disabled && `opacity: 0.5; pointer-events :none;`}

  img {
    height: 1rem;
    filter: ${({ theme }) => theme.colors.iconHighlight};
    z-index: 1;

    ${({ hasLabel }) => hasLabel && `margin-right: 0.5rem;`}
  }

  span {
    z-index: 1;
  }
`
