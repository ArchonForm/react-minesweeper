export interface CellData {
  x: number
  y: number
  isMine: boolean
  neighbors: number
  isEmpty: boolean
  isRevealed: boolean
  flagIndex: number // 0 - пустая ячейка, 1 - флаг, 2 - вопрос
}

export interface SetupData {
  width: number
  height: number
  mines: number
}

export interface PlayerRecord {
  name: string
  time: number
}

export interface PlayersList {
  list: PlayerRecord[]
}
