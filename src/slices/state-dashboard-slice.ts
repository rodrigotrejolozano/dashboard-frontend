import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface StateDashboard {
  limit: number
  page: number
}

const initialState: StateDashboard = {
  limit: 5,
  page: 1
}

const StateSlice = createSlice({
  name: 'dashboard-state',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  }
})

export const {
  setLimit,
  setPage

} = StateSlice.actions

export default StateSlice.reducer
