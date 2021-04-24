import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Tile } from '../../components'
import { gamesMetadata } from '../../constants'
import {
  StyledHome,
  StyledHomeTitle,
  StyledTileContainer,
} from './StyledHome.js'

const Home = () => {
  const [t] = useTranslation()
  const history = useHistory()

  return (
    <StyledHome>
      <StyledHomeTitle>{t('home.title')}</StyledHomeTitle>
      <StyledTileContainer className='home__tile-container'>
        {gamesMetadata.map(({ id, imageSrc, path }) => (
          <Tile
            key={`game-${id}`}
            title={t(`${id}.title`)}
            imageSrc={imageSrc}
            description={t(`${id}.description`)}
            onClick={() => history.push(`/${path}`)}
          />
        ))}
      </StyledTileContainer>
    </StyledHome>
  )
}

export default Home
