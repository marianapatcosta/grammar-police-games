import React, { useState } from 'react'
import { isEventValid } from '../../../../utils'
import {
  StyledGameCardWrapper,
  StyledGameCard,
  StyledGameCardFace,
  StyledGameCardSentence,
  StyledGameCardImage,
  StyledGameCardImagePlaceholder,
} from './StyledGameCard.js'

const GameCard = ({
  sentence,
  isSelected,
  isMatched,
  color,
  gameCardBackImage,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const getAriaLabel = () => {
    if (isSelected) return `${sentence} - Selected`
    if (isMatched) return `${sentence} - Matched`
    return 'Press Space or Enter to select this card'
  }

  const onKeyDown = event => isEventValid(event) && onClick()

  return (
    <StyledGameCardWrapper
      tabIndex='0'
      aria-label={getAriaLabel()}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <StyledGameCardFace isSelectedOrMatched={isSelected || isMatched}>
        <StyledGameCardSentence style={{ color: color }}>
          {sentence}
        </StyledGameCardSentence>
      </StyledGameCardFace>

      <StyledGameCard isSelectedOrMatched={isSelected || isMatched}>
        {!isLoaded && <StyledGameCardImagePlaceholder />}
        <StyledGameCardImage
          isLoaded={isLoaded}
          src={gameCardBackImage}
          alt={'card-back'}
          onLoad={() => setIsLoaded(true)}
        />
      </StyledGameCard>
    </StyledGameCardWrapper>
  )
}

GameCard.defaultProps = {
  sentence: true,
  isSelected: false,
  isMatched: false,
  gameCardBackImage: '',
  onClick: () => null,
}

export default GameCard
