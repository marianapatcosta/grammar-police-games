import { KEYBOARD_CODES } from './constants'
const { SPACE_KEY, ENTER_KEY } = KEYBOARD_CODES

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export const getRandomizedSentences = sentences => {
  let randomizedSentences = sentences
  let count = sentences.length
  let temporaryStoredSentence

  while (count > 0) {
    const randomIndex = getRandomInt(0, count)
    count--
    temporaryStoredSentence = randomizedSentences[count]
    randomizedSentences[count] = randomizedSentences[randomIndex]
    randomizedSentences[randomIndex] = temporaryStoredSentence
  }
  return randomizedSentences
}

export const isTouchScreen = () => window.matchMedia('(hover: none)').matches

export const isEventValid = event =>
  event.type === 'click' || event.code === SPACE_KEY || event.code === ENTER_KEY

export const convertToMilliseconds = timeInMinutesAndSeconds => {
  const { minutes, seconds } = timeInMinutesAndSeconds
  return minutes * 60 * 1000 + seconds * 1000
}

export const convertToMinutesAndSeconds = timeInMilliseconds => ({
  minutes: Math.floor((timeInMilliseconds / 1000 / 60) % 60),
  seconds: Math.floor((timeInMilliseconds / 1000) % 60),
})
