import { Portugal, Uk } from './assets/icons'
import {
  GrammarInvaders,
  NoMemoryGrammar,
  SlappyGrammar,
} from './assets/images'

export const locales = [
  {
    language: 'portuguese',
    icon: Portugal,
    acronymum: 'pt',
  },
  {
    language: 'english',
    icon: Uk,
    acronymum: 'en',
  },
]

export const GAMES = {
  SLAPPY_GRAMMAR: 'slappyGrammar',
  GRAMMAR_INVADERS: 'grammarInvaders',
  NO_MEMORY_GRAMMAR: 'noMemoryGrammar',
}

export const GAME_STAGE = {
  START: 'start',
  PLAY: 'play',
  PAUSE: 'pause',
  HIT: 'hit',
  OVER: 'over',
  WON: 'won',
  ENEMY_HIT: 'enemy hit',
}

export const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
}

export const ORIENTATIONS = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait',
}

export const gamesMetadata = [
  {
    id: GAMES.SLAPPY_GRAMMAR,
    imageSrc: SlappyGrammar,
    path: 'slappy-grammar',
  },
  {
    id: GAMES.GRAMMAR_INVADERS,
    imageSrc: GrammarInvaders,
    path: 'grammar-invaders',
  },
  {
    id: GAMES.NO_MEMORY_GRAMMAR,
    imageSrc: NoMemoryGrammar,
    path: 'no-memory-grammar',
  },
]

export const KEYBOARD_CODES = {
  ENTER_KEY: 'Enter',
  ESCAPE_KEY: 'Escape',
  SPACE_KEY: 'Space',
  P_KEY: 'KeyP',
  Q_KEY: 'KeyQ',
  R_KEY: 'KeyR',
  LEFT_ARROW_KEY: 'ArrowLeft',
  UP_ARROW_KEY: 'ArrowUp',
  RIGHT_ARROW_KEY: 'ArrowRight',
  DOWN_ARROW_KEY: 'ArrowDown',
}

export const graffitiFonts = [
  'Blow Brush',
  'Sprite Graffiti',
  'Tag Type',
  'Urban Decay',
  'Don Graffiti',
  'Grizzly Attack',
  'Mersey Cowboy',
]

export const graffitiColors = [
  '#95c855',
  '#e225a7',
  '#05aef1',
  '#e4e422',
  '#f69501',
  '#09fbd3',
  '#08f7fe',
  '#fe53bb',
  '#ffff66',
  '#ce0000',
  '#7fff00',
  '#ffffff',
]

export const enemiesColors = [
  '#cse4f1',
  '#ffe6f7',
  '#ffffff',
  '#fffcc9',
  '#ece6ff',
  '#f5deb3',
  '#e7f4ee',
]

export const cardColors = [
  '#95c855',
  '#e225a7',
  '#05aef1',
  '#f69501',
  '#08f7fe',
  '#fe53bb',
  '#ce0000',
  '#03045e',
]

export const sentencesPT = [
  'Há partida vai ser isso.',
  'Vou fazer anginhos na neve.',
  'Tu és muito proficional.',
  'Quero participar nessa discução.',
  'Vi isso à pouco tempo.',
  'Pudemos testar isso.',
  'Teem o link?',
  'Não tem nada a haver com isso.',
  'Mesmo há grande.',
  'Na interseção das linhas.',
  'Vão haver reuniões.',
  'Ajudas-te-me muito.',
  'Vi o presidente da camera.',
  'Eu tenho sutaque do Porto.',
  'Ei-de ler sobre isso.',
  'Há eu ainda não sabia.',
  'Gosto da tua acertividade.',
  'Vou eleminá-lo.',
  'A fature vem descriminada.',
  'Que esquesito!',
  'O que houves no spotify?',
  'Voçês leram a notícia?',
  'Estou ancioso.',
  'É abuso de puder.',
  'Podes partilhar-me a pasta?',
  'Só vez isso à frente.',
  'Liga quando poderes.',
  'Trás-me uma bebida.',
  'Á magias que a malta faz.',
  'Isso não veem na resposta.',
  'Publicado á 10 minutos.',
  'É isso concerteza!',
  'Se quizeres vir diz!',
  'Gostava que isso acontecece.',
  'Não me preciones!',
  'Vou-te dar um concelho.',
  'Vais ao conserto hoje?',
  'Vou coser batatas.',
  'Tu gostastes daquela música?',
  'Estudas-te muito?',
  'Prontos, é isso.',
  'Houveram muitos comentários.',
  'Vê no banco de traz!',
  'É tudo o que eu sempre quiz!',
  'Lembras-te-me que tenho que tratar disso.',
  'Jantas te bem?',
  'Olha para o que fases!',
  'Isso é o insensial!.',
  'Não se encomode com isso.',
  'São pequenos promenores.',
  'Chegamos abocado.',
]

export const sentencesEN = [
  'It is a hand zone section.',
  'They go to they’re office.',
  'It’s over their!',
  'The company celebrates it’s fifth year.',
  'Piece and Love.',
  'Random staff.',
  'I enjoyed the potato’s.',
  'I love your shoes’s.',
  'It’s between you and I.',
  'Whose that girl?',
  'Your a nice person.',
  'Something is missing in my hart.',
  'I’m board.',
  'I like sweat tea.',
  'Make the differance.',
  'No smoking aloud.',
  'It is a hand zone section.',
  'They go to they’re office.',
  'It’s over their!',
  'The company celebrates it’s fifth year.',
  'Piece and Love.',
  'Random staff.',
  'I enjoyed the potato’s.',
  'I love your shoes’s.',
  'It’s between you and I.',
  'Whose that girl?',
  'Your a nice person.',
  'Something is missing in my hart.',
  'I’m board.',
  'I like sweat tea.',
  'Make the differance.',
  'No smoking aloud.',
  'Your the best!',
]

// game configs, in rem

export const GAME_WIDTH =
  window.innerWidth < 880 /* px */ ? window.innerWidth / 16 - 1 : 55 // -1 due to lateral 0.5rem margin

export const GAME_HEIGHT = 35

export const GAME_GRAVITY = 0.2

export const SCORE_INCREASE = 5

// Slappy Grammar

export const SLAPPY_GRAMMAR_TIME_INTERVAL = 30 // in ms

export const SENTENCE_NUMBER = 10

export const OBSTACLES_NUMBER = 2

export const BIRD_LEFT = window.innerWidth < 880 /* px */ ? 4 : 8

export const BIRD_TOP = 6.25

export const BIRD_WIDTH = 6.08

export const BIRD_HEIGHT = 4.8

export const BIRD_OVER_HEIGHT = 5.75

export const FLY_JUMP = 3.125

export const OBSTACLE_WIDTH = 3.125

export const OBSTACLE_TOP_WIDTH = OBSTACLE_WIDTH + 0.5

export const OBSTACLE_TOP_HEIGHT = 1.9

export const MIN_GAP = 10

export const MAX_GAP = 13

export const MIN_OBSTACLE_HEIGHT = 6.25

export const MAX_OBSTACLE_HEIGHT = GAME_HEIGHT - MIN_OBSTACLE_HEIGHT - MAX_GAP

export const OBSTACLE_INTERVAL = GAME_WIDTH / OBSTACLES_NUMBER

export const OBSTACLE_MOVE = 0.3

export const BACKGROUND_TIME_INTERVAL = 18000 //ms

// Grammar Invaders

export const GRAMMAR_INVADERS_TIME_INTERVAL = 50 // in ms

export const ENEMIES_NUMBER = 30

export const SPACE_SHIP_WIDTH = 7

export const SPACE_SHIP_HEIGHT = 5.9

export const SPACE_SHIP_LEFT = (GAME_WIDTH - SPACE_SHIP_WIDTH) / 2

export const SPACE_SHIP_MOVE = 2

export const ENEMIES_PER_ROW = window.innerWidth < 880 ? 3 : 5

export const ENEMY_WIDTH = window.innerWidth < 880 ? 6 : 8.7

export const ENEMY_HEIGHT = 4

export const DISTANCE_BETWEEN_ENEMIES = 0.5

export const ENEMY_LEFT =
  (GAME_WIDTH -
    ENEMY_WIDTH * ENEMIES_PER_ROW -
    (ENEMIES_PER_ROW - 1) * DISTANCE_BETWEEN_ENEMIES) /
  2

export const ENEMY_MOVE = 0.3

export const BULLET_MOVE = 0.8

export const BULLET_WIDTH = 0.45

export const BULLET_TOP = GAME_HEIGHT - SPACE_SHIP_HEIGHT

export const ENEMY_HIT_TIME_INTERVAL = 300 // in ms

// No Memory Grammar

export const MEMORY_GAME_HEIGHT = window.innerWidth > 880 && 38

export const CARDS_NUMBER = 24

export const GAME_TIME = 300000 // in ms
