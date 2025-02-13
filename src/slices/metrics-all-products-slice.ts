import { ApiStatus, type ApiState } from '../types/api-types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../lib/store'
import { getMetricsAllProductsReducer } from './metrics-reducer'

export interface filterProductsPagination {
    name?: string,
    price?: number,
    stock?: number
}

interface getAllProductState {
    allProducts?: number
    state: ApiState
    filterProducts: filterProductsPagination
}

const initialState: getAllProductState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    filterProducts: {
        name: '',
        price: 0,
        stock: 0
    }
}

const getMetricsAllProductSlice = createSlice({
    name: 'metricsAllProducts',
    initialState,
    reducers: {
        setProductFilter: (state, action) => {
            state.filterProducts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMetricsAllProductsReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING }
            })
            .addCase(getMetricsAllProductsReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS }
                state.allProducts = action.payload.data
            })
            .addCase(getMetricsAllProductsReducer.rejected, (state) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR }
                state.allProducts = 0
            })
    }
})

export const { setProductFilter } = getMetricsAllProductSlice.actions
export default getMetricsAllProductSlice.reducer
export const selectProduct = (state: RootState) => state.getMetricsAllProducts;
