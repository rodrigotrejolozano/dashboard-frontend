import { ApiStatus, type ApiState } from '../types/api-types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../lib/store'
import { getMetricsTopExpensiveReducer } from './metrics-reducer'
import { IProducts } from '../types/products-types'

export interface filterProducts {
    name?: string,
    price?: number,
    stock?: number
}

interface getTopExpensiveProductsState {
    products?: IProducts[]
    state: ApiState
    filterProducts: filterProducts
}

const initialState: getTopExpensiveProductsState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    filterProducts: {
        name: '',
        price: 0,
        stock: 0
    }
}

const getMetricsTopExpensiveProductsSlice = createSlice({
    name: 'metricsTopExpensiveProducts',
    initialState,
    reducers: {
        setProductFilter: (state, action) => {
            state.filterProducts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMetricsTopExpensiveReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING }
            })
            .addCase(getMetricsTopExpensiveReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS }
                state.products = action.payload.data
            })
            .addCase(getMetricsTopExpensiveReducer.rejected, (state) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR }
                state.products = []
            })
    }
})

export const { setProductFilter } = getMetricsTopExpensiveProductsSlice.actions
export default getMetricsTopExpensiveProductsSlice.reducer
export const selectProduct = (state: RootState) => state.getMetricsTopExpensiveProducts;
