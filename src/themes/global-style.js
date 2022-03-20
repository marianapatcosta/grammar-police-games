import { createGlobalStyle } from 'styled-components'
import PTSerif from '../assets/fonts/PTSerif-Regular.ttf'
import JuneBug from '../assets/fonts/junebug.regular.ttf'
import BlowBrush from '../assets/fonts/blowbrush.ttf'
import DonGraffiti from '../assets/fonts/DonGraffiti.otf'
import GrizzlyAttack from '../assets/fonts/Grizzly-Attack.ttf'
import MerseyCowboy from '../assets/fonts/MerseyCowboy.ttf'
import SpriteGraffiti from '../assets/fonts/SpriteGraffiti-Regular.ttf'
import TagType from '../assets/fonts/tagtype-freefont.ttf'
import UrbanDecay from '../assets/fonts/urban-decay.ttf'

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'PTSerif';
    src: local('PTSerif'),
    url(${PTSerif}) format('truetype');
    font-weight: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'June Bug';
    src: local('June Bug'),
    url(${JuneBug}) format('truetype');
    font-weight: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Blow Brush';
    src: local('Blow Brush'),
    url(${BlowBrush}) format('truetype');
    font-weight: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Don Graffiti';
    src: local('Don Graffiti'),
    url(${DonGraffiti}) format('opentype');
    font-weight: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Grizzly Attack';
    src: local('Grizzly Attack'),
    url(${GrizzlyAttack}) format('opentype');
    font-weight: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Mersey Cowboy';
    src: local('Mersey Cowboy'),
    url(${MerseyCowboy}) format('opentype');
    font-weight: normal;
    font-size: 50%;
    font-display: swap;
  }

  @font-face {
    font-family: 'Sprite Graffiti';
    src: local('Sprite Graffiti'),
    url(${SpriteGraffiti}) format('truetype');
    font-weight: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Tag Type';
    src: local('Tag Type'),
    url(${TagType}) format('truetype');
    font-weight: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Urban Decay';
    src: local('Urban Decay'),
    url(${UrbanDecay}) format('truetype');
    font-weight: normal;
    font-display: swap;
  }

  body {
      width: 100vw;
      font-size: 0.85rem;
      font-weight: 300;
      text-rendering: optimizeLegibility;
      font-family: ${({ theme }) => theme.fonts.game};
      color: ${({ theme }) => theme.colors.font};
      line-height: 1.2rem;
      text-transform: lowercase;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
        height: 100vh;
      }

      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        font-size: 1rem;
      }

      #root {
        height: 100%;
        width: 100%;
      }
  }

  * {
      margin: 0;
      padding: 0;
  }
  
  * :focus {
      outline: 0.125rem solid ${({ theme }) => theme.colors.font};
  }

  * :focus:not(:focus-visible) {
      outline: none;
  }

`
