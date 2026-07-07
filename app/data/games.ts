export type GameCategory = 'ARCADE' | 'PUZZLE' | 'SHOOTER' | 'VERSUS'
export type GameColor = 'cyan' | 'magenta' | 'yellow' | 'green'

export type Game = {
  id: string
  title: string
  description: string
  longDescription: string
  category: GameCategory
  color: GameColor
  coverClass: string
  bestScore: number
  playCount: number
}

export const GAMES: Game[] = [
  {
    id: 'bloque-buster',
    title: 'BLOQUE BUSTER',
    description: 'Rebota la pelota y destruye muros de neón.',
    longDescription: 'Pilota una nave-paleta y rebota un núcleo de plasma para pulverizar muros de bloques cromáticos. Cada nivel reorganiza la grilla en patrones imposibles. ¿Hasta dónde llegará tu racha?',
    category: 'ARCADE',
    color: 'cyan',
    coverClass: 'cover-bricks',
    bestScore: 28450,
    playCount: 12400,
  },
  {
    id: 'caida',
    title: 'CAÍDA',
    description: 'Encaja las piezas antes de que el techo te aplaste.',
    longDescription: 'Piezas geométricas descienden desde la oscuridad. Rótalas, encástralas y limpia líneas para sobrevivir. La velocidad aumenta sin piedad cada 10 líneas.',
    category: 'PUZZLE',
    color: 'magenta',
    coverClass: 'cover-tetro',
    bestScore: 184220,
    playCount: 31800,
  },
  {
    id: 'serpentina',
    title: 'SERPENTINA',
    description: 'Crece sin morder tu propia cola.',
    longDescription: 'Una serpiente de luz recorre la grilla buscando núcleos magenta. Cada bocado la alarga y la hace más veloz. Un movimiento en falso y se devora a sí misma.',
    category: 'ARCADE',
    color: 'green',
    coverClass: 'cover-snake',
    bestScore: 7820,
    playCount: 9100,
  },
  {
    id: 'gloton',
    title: 'GLOTÓN',
    description: 'Devora puntos y escapa de los fantasmas.',
    longDescription: 'Un círculo glotón patrulla un laberinto coleccionando puntos luminosos. Cuatro espectros lo persiguen, pero cada cierto tiempo aparece una píldora que invierte los papeles.',
    category: 'ARCADE',
    color: 'yellow',
    coverClass: 'cover-glot',
    bestScore: 96400,
    playCount: 27200,
  },
  {
    id: 'invasores',
    title: 'INVASORES',
    description: 'Defiende el planeta de filas alienígenas.',
    longDescription: 'Olas de pixeles hostiles descienden formación tras formación. Mueve tu cañón en horizontal y abre fuego con precisión, antes de que toquen la superficie.',
    category: 'SHOOTER',
    color: 'green',
    coverClass: 'cover-invaders',
    bestScore: 54190,
    playCount: 18000,
  },
  {
    id: 'rocas',
    title: 'ROCAS',
    description: 'Pulveriza asteroides en gravedad cero.',
    longDescription: 'Tu nave triangular flota en vacío absoluto. Dispara y rota para dividir rocas en fragmentos cada vez más pequeños. Cuidado con los OVNIs en el horizonte.',
    category: 'SHOOTER',
    color: 'yellow',
    coverClass: 'cover-rocas',
    bestScore: 41200,
    playCount: 15600,
  },
  {
    id: 'ranaria',
    title: 'RANARIA',
    description: 'Cruza la autopista de pixeles.',
    longDescription: 'Salta entre carriles de coches a toda velocidad y troncos a la deriva en el río. Llega a los nenúfares antes de que se acabe el tiempo.',
    category: 'ARCADE',
    color: 'green',
    coverClass: 'cover-rana',
    bestScore: 18900,
    playCount: 6400,
  },
  {
    id: 'duelo-pixel',
    title: 'DUELO PIXEL',
    description: 'Dos paletas. Una pelota. Reflejos máximos.',
    longDescription: 'El duelo más puro: dos paletas verticales se enfrentan por rebotar una pelota luminosa. Modo solitario contra la CPU o partida local a dos jugadores.',
    category: 'VERSUS',
    color: 'cyan',
    coverClass: 'cover-duelo',
    bestScore: 24,
    playCount: 4200,
  },
]
