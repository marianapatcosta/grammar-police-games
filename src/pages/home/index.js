import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Tile } from '../../components'
import { gamesMetadata } from '../../constants'
import { Github, Linkedin } from '../../assets/icons'

import {
  StyledHome,
  StyledHomeTitle,
  StyledTileContainer,
  StyledFooter,
  StyledLink,
} from './StyledHome.js'

const Home = () => {
  const [t] = useTranslation()
  const navigate = useNavigate()

  return (
    <StyledHome>
      <StyledHomeTitle>{t('home.title')}</StyledHomeTitle>
      <StyledTileContainer>
        {gamesMetadata.map(({ id, imageSrc, videoSrc, path }) => (
          <Tile
            key={`game-${id}`}
            title={t(`${id}.title`)}
            imageSrc={imageSrc}
            videoSrc={videoSrc}
            description={t(`${id}.description`)}
            onClick={() => navigate(`/${path}`)}
          />
        ))}
      </StyledTileContainer>
      <StyledFooter>
        <p>©</p>
        <p>{`2022 - ${t('footer.developedBy')} ${t('footer.authorName')}`}</p>
        <StyledLink
          href={t('footer.github')}
          aria-label={`go to ${t('footer.authorName')}'s Github`}
          target='_blank'
          rel='nofollow noopener noreferrer'
        >
          <img src={Github} alt='github icon' />
        </StyledLink>
        <StyledLink
          href={t('footer.linkedin')}
          aria-label={`go to ${t('footer.authorName')}'s Linkedin`}
          target='_blank'
          rel='nofollow noopener noreferrer'
        >
          <img src={Linkedin} alt='linkedin icon' />
        </StyledLink>
      </StyledFooter>
    </StyledHome>
  )
}

export default Home
