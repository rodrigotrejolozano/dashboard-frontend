import { ApiStatus, type ApiState } from '../types/api-types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../lib/store'
import { getMetricsPriceDistributionReducer } from './metrics-reducer'

export interface filterProducts {
    name?: string,
    price?: number,
    stock?: number
}

interface getPriceDistributionState {
    priceDistribution?: { [key: string]: number }
    state: ApiState
    filterProducts: filterProducts
}

const initialState: getPriceDistributionState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    filterProducts: {
        name: '',
        price: 0,
        stock: 0
    }
}

const getMetricsPriceDistributionSlice = createSlice({
    name: 'metricsPriceDistribution',
    initialState,
    reducers: {
        setProductFilter: (state, action) => {
            state.filterProducts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMetricsPriceDistributionReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING }
            })
            .addCase(getMetricsPriceDistributionReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS }
                state.priceDistribution = action.payload.data ?? {}
            })
            .addCase(getMetricsPriceDistributionReducer.rejected, (state) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR }
                state.priceDistribution = {}
            })
    }
})

export const { setProductFilter } = getMetricsPriceDistributionSlice.actions
export default getMetricsPriceDistributionSlice.reducer
export const selectProduct = (state: RootState) => state.getMetricsPriceDistribution;
