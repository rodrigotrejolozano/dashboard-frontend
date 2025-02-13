import { ApiStatus, type ApiState } from '../types/api-types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../lib/store'
import { getMetricsStockVSPriceReducer } from './metrics-reducer'
import { IProducts } from '../types/products-types'

export interface filterProducts {
    name?: string,
    price?: number,
    stock?: number
}

interface getStockVSPriceState{
    stockVsPrice?: Omit<IProducts,'id'>[]
    state: ApiState
    filterProducts: filterProducts
}

const initialState: getStockVSPriceState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    filterProducts: {
        name: '',
        price: 0,
        stock: 0
    }
}

const getMetricsStockVSPriceSlice = createSlice({
    name: 'metricsStockVSPrice',
    initialState,
    reducers: {
        setProductFilter: (state, action) => {
            state.filterProducts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMetricsStockVSPriceReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING }
            })
            .addCase(getMetricsStockVSPriceReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS }
                state.stockVsPrice = action.payload.data
            })
            .addCase(getMetricsStockVSPriceReducer.rejected, (state) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR }
                state.stockVsPrice = []
            })
    }
})

export const { setProductFilter } = getMetricsStockVSPriceSlice.actions
export default getMetricsStockVSPriceSlice.reducer
export const selectProduct = (state: RootState) => state.getMetricsPriceVsStock;
