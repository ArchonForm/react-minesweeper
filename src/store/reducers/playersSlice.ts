import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlayerRecord, PlayersList } from '../../interfaces'

const LOCAL_STORAGE_KEY = 'mpl' // minesweeper players list

const initialState: PlayersList = {
  list: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]'),
}

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    savePlayerRecord(state, action: PayloadAction<PlayerRecord>) {
      state.list.push({
        name: action.payload.name,
        time: action.payload.time,
      })
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.list))
    },
  },
})

export const { savePlayerRecord } = playersSlice.actions

export default playersSlice.reducer
