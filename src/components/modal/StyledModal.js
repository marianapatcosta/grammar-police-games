import styled, { css } from 'styled-components'
import Button from '../button'

const sizeStyles = {
  small: css`
    width: 25rem;
  `,
  medium: css`
    width: 35rem;
  `,
  large: css`
    width: 50rem;
  `,
}

export const StyledModal = styled.div``

export const StyledModalOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

export const StyledModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: ${({ theme }) => theme.colors.blue1};
  box-shadow: 0 0.125rem 0.5rem rgb(0, 0, 0);
  border-radius: 0.5rem;
  transform: translate(-50%, -50%);
  ${({ size }) => size && sizeStyles[size]};
  min-height: 7rem;
  font-weight: 700;
`

export const StyledModalHeader = styled.header`
  display: flex;
  align-content: center;
  justify-content: space-between;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  padding: 0.625rem 0.3rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.063rem solid ${({ theme }) => theme.colors.blue1};
  color: ${({ theme }) => theme.colors.font};
  font-size: 120%;
`

export const StyledModalHeaderTitle = styled.h4`
  display: inline;
  margin: 0.5rem;
`

export const StyledModalHeaderClose = styled(Button)`
  border: none;
  box-shadow: none;
  background: none;
  padding: 0.2rem 0.45rem;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  cursor: pointer;

  img {
    width: 0.8rem;
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
    :hover {
      transform: rotate(90deg);
    }
  }
`

export const StyledModalMessage = styled.p`
  padding: 1rem;
  text-align: center;
  font-size: 90%;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
`

export const StyledModalFooter = styled.footer`
  padding: 1.25rem 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledModalFooterButton = styled(Button)`
  background: none;
  margin: 0 0.625rem;
  min-width: 3.7rem;
  font-size: 80%;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  -webkit-text-stroke: 0.063rem ${({ theme }) => theme.colors.font};
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
`
