import React from 'react'
import {
  StyledTile,
  StyledTitle,
  StyledVideo,
  StyledDescription,
} from './StyledTile.js'

const Tile = ({
  title,
  description,
  imageSrc,
  videoSrc,
  className,
  onClick,
}) => {
  return (
    <StyledTile className={className} onClick={onClick}>
      <StyledTitle>{title}</StyledTitle>
      <StyledVideo loop autoPlay muted poster={imageSrc}>
        <source src={videoSrc} type='video/mp4' />
        Sorry, your browser doesn't support embedded videos.
      </StyledVideo>

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
