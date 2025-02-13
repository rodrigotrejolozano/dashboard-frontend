import { createSlice } from '@reduxjs/toolkit';
import { ApiStatus, type ApiState, type ApiError } from '../types/api-types';
import { type IProducts } from '../types/products-types';
import { RootState } from '../lib/store';
import { deleteProductReducer } from './products-reducer';

interface UpdateProductState {
    productRequest: IProducts
    productResponse?: IProducts
    state: ApiState;
    error?: ApiError | null;
}

const initialState: UpdateProductState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    productRequest: {
        id: 0,
        name: '',
        price: 0,
        stock: 0,
    },
    error: null
};

const updateProductSlice = createSlice({
    name: 'productsUpdate',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.productRequest = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteProductReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING };
                state.error = null;
            })
            .addCase(deleteProductReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS };
                state.productResponse = action.payload.data || { id: 0, name: '', price: 0, stock: 0 };
                state.error = null;
            })
            .addCase(deleteProductReducer.rejected, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR };
                state.error = action.payload || { message: 'Error desconocido', code: 500, success: false };
            });
    }
});

export const { setProduct } = updateProductSlice.actions
export default updateProductSlice.reducer
export const selectProduct = (state: RootState) => state.updateProduct.productResponse;
