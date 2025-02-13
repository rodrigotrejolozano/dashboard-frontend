import { ApiStatus, type ApiState } from '../types/api-types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../lib/store'
import { getMetricsAverageStockReducer } from './metrics-reducer'

export interface filterProducts {
    name?: string,
    price?: number,
    stock?: number
}

interface getAllAverageStockState {
    allAverageStock?: number
    state: ApiState
    filterProducts: filterProducts
}

const initialState: getAllAverageStockState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    filterProducts: {
        name: '',
        price: 0,
        stock: 0
    }
}

const getMetricsAllAverageStockSlice = createSlice({
    name: 'metricsAllAverageStock',
    initialState,
    reducers: {
        setProductFilter: (state, action) => {
            state.filterProducts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMetricsAverageStockReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING }
            })
            .addCase(getMetricsAverageStockReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS }
                state.allAverageStock = action.payload.data
            })
            .addCase(getMetricsAverageStockReducer.rejected, (state) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR }
                state.allAverageStock = 0
            })
    }
})

export const { setProductFilter } = getMetricsAllAverageStockSlice.actions
export default getMetricsAllAverageStockSlice.reducer
export const selectProduct = (state: RootState) => state.getMetricsAverageStock;
