import { createSlice } from '@reduxjs/toolkit';
import { ApiStatus, type ApiState, type ApiError } from '../types/api-types';
import { type IProducts } from '../types/products-types';
import { RootState } from '../lib/store';
import { createProductReducer } from './products-reducer';

interface CreateProductState {
    productRequest: Omit<IProducts, 'id'>;
    productResponse?: IProducts;
    state: ApiState;
    error?: ApiError | null;
}

const initialState: CreateProductState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    productRequest: {
        name: '',
        price: 0,
        stock: 0,
    },
    error: null
};

const createProductSlice = createSlice({
    name: 'productsCreate',
    initialState,
        reducers: {
            setProduct: (state, action) => {
                state.productRequest = action.payload
            }
        },
    extraReducers: (builder) => {
        builder
            .addCase(createProductReducer.pending, (state) => {
                state.state = { isLoading: true, status: ApiStatus.LOADING };
                state.error = null;
            })
            .addCase(createProductReducer.fulfilled, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.SUCCESS };
                state.productResponse = action.payload.data || { id:0, name: '', price: 0, stock: 0 };
                state.error = null;
            })
            .addCase(createProductReducer.rejected, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR };
                state.error = action.payload || { message: 'Error desconocido', code: 500, success: false };
            });
    }
});

export const { setProduct } = createProductSlice.actions
export default createProductSlice.reducer
export const selectProduct = (state: RootState) => state.createProduct.productResponse;
