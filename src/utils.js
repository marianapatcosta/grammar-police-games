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
