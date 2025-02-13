import { createSlice } from '@reduxjs/toolkit';
import { ApiStatus, type ApiState, type ApiError } from '../types/api-types';
import { RootState } from '../lib/store';
import { deleteProductReducer } from './products-reducer';

interface DeleteProductState {
    id: number;
    message?: string;
    state: ApiState;
    error?: ApiError | null;
}

const initialState: DeleteProductState = {
    state: { isLoading: false, status: ApiStatus.IDLE },
    id: 0,
    error: null
};

const deleteProductSlice = createSlice({
    name: 'productsDelete',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.id = action.payload
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
                state.message = action.payload.data || "Eliminado";
                state.error = null;
            })
            .addCase(deleteProductReducer.rejected, (state, action) => {
                state.state = { isLoading: false, status: ApiStatus.ERROR };
                state.error = action.payload || { message: 'Error desconocido', code: 500, success: false };
            });
    }
});

export const { setProduct } = deleteProductSlice.actions
export default deleteProductSlice.reducer
export const selectProduct = (state: RootState) => state.deleteProduct.message;
