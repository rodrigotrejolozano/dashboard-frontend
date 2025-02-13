import { ApiStatus, IMetaPagination, type ApiState } from '../types/api-types'
import { createSlice } from '@reduxjs/toolkit'
import { type IProducts } from '../types/products-types'
import { RootState } from '../lib/store'
import { getAllProductsReducer } from './products-reducer'

 export interface filterProductsPagination extends IMetaPagination{
    name?: string, 
    price?: number, 
    stock?: number
}

interface getAllProductState {
    products?: IProducts[]
    state: ApiState
    paginationData: filterProductsPagination
    pagination: IMetaPagination
}

const initialState: getAllProductState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    products: [],
    paginationData: {
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        nextPage: 0,
        prevPage: 0
    },
    pagination: {
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        nextPage: 0,
        prevPage: 0
    }
}

const getAllProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductId: (state, action) => {
            state.paginationData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductsReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING }
            })
            .addCase(getAllProductsReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS }
                state.products = action.payload.data
                if(action.payload.meta){
                    state.pagination = action.payload.meta
                }
            })
            .addCase(getAllProductsReducer.rejected, (state) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR }
                state.products = []
            })
    }
})

export const { setProductId } = getAllProductSlice.actions
export default getAllProductSlice.reducer
export const selectProduct = (state: RootState) => state.getAllProducts;
