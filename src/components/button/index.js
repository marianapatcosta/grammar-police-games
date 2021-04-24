import React, { forwardRef } from 'react'
import { StyledButton } from './StyledButton'

const Button = forwardRef(({ label, icon, onClick, ...props }, ref) => {
  return (
    <StyledButton {...props} hasLabel={!!label} onClick={onClick}>
      {!!icon && <img src={icon} alt={`${label} icon`} />}
      <span>{label}</span>
    </StyledButton>
  )
})

Button.defaultProps = {
  id: '',
  label: '',
  className: '',
  disabled: false,
  icon: '',
  type: 'button',
  onClick: () => null,
}

export default Button
