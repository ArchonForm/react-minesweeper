import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

const LOCAL_STORAGE_KEY = 'mpl' // minesweeper players list
interface PlayerRecord {
  name: string
  time: number
}

interface PlayersList {
  list: PlayerRecord[]
}
const initialState: PlayersList = {
  list: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]'),
}

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    savePlayerRecord(state, action: PayloadAction<PlayerRecord>) {
      const currentPlayer = state.list.find(
        player => player.name === action.payload.name
      )

      if (currentPlayer) {
        state.list = state.list.map(player => {
          if (
            player.name === action.payload.name &&
            player.time > action.payload.time
          ) {
            player.time = action.payload.time
          }
          return player
        })
      } else {
        state.list.push({
          name: action.payload.name,
          time: action.payload.time,
        })
      }
      state.list.sort((a: PlayerRecord, b: PlayerRecord) => a.time - b.time)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.list))
    },
  },
})

export const { savePlayerRecord } = playersSlice.actions

export default playersSlice.reducer
