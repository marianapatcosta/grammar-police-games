import React, { useState } from 'react'
import {
  StyledTile,
  StyledTitle,
  StyledImage,
  StyledImagePlaceholder,
  StyledDescription,
} from './StyledTile.js'

const Tile = ({ title, description, imageSrc, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <StyledTile className={className} onClick={onClick}>
      <StyledTitle>{title}</StyledTitle>
      {!isLoaded && <StyledImagePlaceholder />}
      <StyledImage
        src={imageSrc}
        alt={`${title}`}
        loading='lazy'
        onLoad={() => setIsLoaded(true)}
      />

      <StyledDescription>{description}</StyledDescription>
    </StyledTile>
  )
}
Tile.defaultProps = {
  title: '',
  description: '',
  imageSrc: 'medium',
  message: '',
  className: '',
  onClick: () => null,
}

export default Tile
