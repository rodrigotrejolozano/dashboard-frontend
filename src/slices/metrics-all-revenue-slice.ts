import { ApiStatus, type ApiState } from '../types/api-types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../lib/store'
import { getMetricsRevenueReducer } from './metrics-reducer'

export interface filterProducts {
    name?: string,
    price?: number,
    stock?: number
}

interface getAllRevenueState {
    allRevenue?: number
    state: ApiState
    filterProducts: filterProducts
}

const initialState: getAllRevenueState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    filterProducts: {
        name: '',
        price: 0,
        stock: 0
    }
}

const getMetricsAllRevenueSlice = createSlice({
    name: 'metricsAllRevenue',
    initialState,
    reducers: {
        setProductFilter: (state, action) => {
            state.filterProducts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMetricsRevenueReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING }
            })
            .addCase(getMetricsRevenueReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS }
                state.allRevenue = action.payload.data
            })
            .addCase(getMetricsRevenueReducer.rejected, (state) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR }
                state.allRevenue = 0
            })
    }
})

export const { setProductFilter } = getMetricsAllRevenueSlice.actions
export default getMetricsAllRevenueSlice.reducer
export const selectProduct = (state: RootState) => state.getMetricsAllRevenue;
