import { ApiStatus, type ApiState } from '../types/api-types'
import { createSlice } from '@reduxjs/toolkit'
import { type IProducts } from '../types/products-types'
import { RootState } from '../lib/store'
import { getOneProductsReducer } from './products-reducer'

interface ProductState {
    product?: IProducts
    id: number
    state: ApiState
}

const initialState: ProductState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    id: 0
}

const getOnProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductId: (state, action) => {
            state.id = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOneProductsReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING }
            })
            .addCase(getOneProductsReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS }
                state.product = action.payload.data
            })
            .addCase(getOneProductsReducer.rejected, (state) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR }
            })
    }
})

export const { setProductId } = getOnProductSlice.actions
export default getOnProductSlice.reducer
export const selectProduct = (state: RootState) => state.getOnProducts.product;