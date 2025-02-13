import { type ApiData, type ApiError } from '../types/api-types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IProducts } from '../types/products-types'
import {
    getOneProductsRequest,
    getAllProductsRequest,
    createProductRequest,
    updateProductRequest,
    deleteProductRequest
} from '../services/products-services';

export const getOneProductsReducer = createAsyncThunk<
    ApiData<IProducts>,
    number,
    { rejectValue: ApiError }
>(
    `products/getOne`,
    async (id, { rejectWithValue }) => {
        const { data, error } = await getOneProductsRequest(id);
        if (error) return rejectWithValue(error);
        return data!
    }
)

export const getAllProductsReducer = createAsyncThunk<
    ApiData<IProducts[]>,
    { page?: number, limit?: number, name?: string, price?: number, stock?: number },
    { rejectValue: ApiError }
>(
    'products/getAll',
    async ({ page = 1, limit = 5, name, price, stock }, 
        { rejectWithValue }) => {
        const { data, error } = await getAllProductsRequest(page, limit, name, price, stock);
        if (error) return rejectWithValue(error);
        return data!;
    }
);

export const createProductReducer = createAsyncThunk<
    ApiData<IProducts>,
    Omit<IProducts, 'id'>,
    { rejectValue: ApiError }
>(
    'products/create',
    async (product, { rejectWithValue }) => {
        const { data, error } = await createProductRequest(product);
        if (error) return rejectWithValue(error);
        return data!;
    }
);

export const updateProductReducer = createAsyncThunk<
    ApiData<IProducts>,
    IProducts,
    { rejectValue: ApiError }
>(
    'products/update',
    async ( product , { rejectWithValue }) => {
        const { data, error } = await updateProductRequest(product);
        if (error) return rejectWithValue(error);
        return data!;
    }
);

export const deleteProductReducer = createAsyncThunk<
    ApiData<null>,
    number,
    { rejectValue: ApiError }
>(
    'products/delete',
    async (id, { rejectWithValue }) => {
        const { data, error } = await deleteProductRequest(id);
        if (error) return rejectWithValue(error);
        return data!;
    }
);
