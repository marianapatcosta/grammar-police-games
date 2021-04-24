import React, { useRef, useEffect } from 'react'
import { Close } from '../../assets/icons'
import {
  StyledModalOverlay,
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
  StyledModalHeaderTitle,
  StyledModalHeaderClose,
  StyledModalMessage,
  StyledModalFooter,
  StyledModalFooterButton,
} from './StyledModal'

const Modal = ({
  header,
  size,
  message,
  buttonLabel,
  confirmationLabel,
  isConfirmationModal,
  onClose,
  onConfirm,
}) => {
  const modalRef = useRef()
  const buttonRef = useRef()

  useEffect(() => {
    buttonRef.current?.focus()

    const handleClickOutside = event => {
      const element = event.target

      if (modalRef.current && !modalRef.current.contains(element)) {
        event.preventDefault()
        event.stopPropagation()

        onClose()
      }
    }
    document.addEventListener('click', handleClickOutside)

    return function cleanupListener() {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [modalRef, buttonRef, onClose])

  return (
    <StyledModal>
      <StyledModalOverlay>
        <StyledModalContent ref={modalRef} size={size}>
          {header && (
            <StyledModalHeader>
              <StyledModalHeaderTitle>{header}</StyledModalHeaderTitle>
              <StyledModalHeaderClose
                aria-label='close modal'
                onClick={onClose}
                icon={Close}
              />
            </StyledModalHeader>
          )}
          <main>
            <StyledModalMessage>{message}</StyledModalMessage>
          </main>
          <StyledModalFooter>
            {isConfirmationModal && (
              <StyledModalFooterButton
                label={confirmationLabel}
                onClick={onConfirm}
              />
            )}
            <StyledModalFooterButton
              ref={buttonRef}
              label={buttonLabel}
              onClick={onClose}
            />
          </StyledModalFooter>
        </StyledModalContent>
      </StyledModalOverlay>
    </StyledModal>
  )
}

Modal.defaultProps = {
  header: '',
  className: '',
  size: 'medium',
  message: '',
  buttonLabel: '',
  confirmationLabel: '',
  isConfirmationModal: false,
  onClose: () => null,
  onConfirmation: () => null,
}

export default Modal
