import styled from 'styled-components'
import { SpaceBackground } from '../../../../assets/images'

export const StyledBackground = styled.div`
  background-image: url(${SpaceBackground});
  background-position: center center;
  background-size: cover;
  background-repeat: repeat-y;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`
