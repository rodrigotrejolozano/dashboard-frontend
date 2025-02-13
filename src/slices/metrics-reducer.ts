import { type ApiData, type ApiError } from '../types/api-types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IProducts } from '../types/products-types'
import { getMetricsAllProductsRequest, getMetricsAverageStockRequest, getMetricsPriceDistributionRequest, getMetricsRevenueRequest, getMetricsStockVSPriceRequest, getMetricsTopExpensiveProductsRequest } from '../services/metrics-services';

export const getMetricsAllProductsReducer = createAsyncThunk<
    ApiData<number>,
    { name?: string, price?: number, stock?: number },
    { rejectValue: ApiError }
>(
    'metrics/products/getAll',
    async ({ name, price, stock },
        { rejectWithValue }) => {
        const { data, error } = await getMetricsAllProductsRequest( name, price, stock);
        if (error) return rejectWithValue(error);
        return data!;
    }
);

export const getMetricsRevenueReducer = createAsyncThunk<
    ApiData<number>,
    { name?: string, price?: number, stock?: number },
    { rejectValue: ApiError }
>(
    'metrics/products/getAllRevenue',
    async ({ name, price, stock },
        { rejectWithValue }) => {
        const { data, error } = await getMetricsRevenueRequest(name, price, stock);
        if (error) return rejectWithValue(error);
        return data!;
    }
);

export const getMetricsAverageStockReducer = createAsyncThunk<
    ApiData<number>,
    { name?: string, price?: number, stock?: number },
    { rejectValue: ApiError }
>(
    'metrics/products/getAverageStock',
    async ({ name, price, stock },
        { rejectWithValue }) => {
        const { data, error } = await getMetricsAverageStockRequest(name, price, stock);
        if (error) return rejectWithValue(error);
        return data!;
    }
);

export const getMetricsTopExpensiveReducer = createAsyncThunk<
    ApiData<IProducts[]>,
    { name?: string, price?: number, stock?: number },
    { rejectValue: ApiError }
>(
    'metrics/products/getTopExpensive',
    async ({ name, price, stock },
        { rejectWithValue }) => {
        const { data, error } = await getMetricsTopExpensiveProductsRequest(name, price, stock);
        if (error) return rejectWithValue(error);
        return data!;
    }
);

export const getMetricsPriceDistributionReducer = createAsyncThunk<
    ApiData<{ [key: string]: number }>,
    { name?: string, price?: number, stock?: number },
    { rejectValue: ApiError }
>(
    'metrics/products/getPriceDistribution',
    async ({ name, price, stock },
        { rejectWithValue }) => {
        const { data, error } = await getMetricsPriceDistributionRequest(name, price, stock);
        if (error) return rejectWithValue(error);
        return data!;
    }
);

export const getMetricsStockVSPriceReducer = createAsyncThunk<
    ApiData<Omit<IProducts, 'id'>[]>,
    { name?: string, price?: number, stock?: number },
    { rejectValue: ApiError }
>(
    'metrics/products/getStockVSPrice',
    async ({ name, price, stock },
        { rejectWithValue }) => {
        const { data, error } = await getMetricsStockVSPriceRequest(name, price, stock);
        if (error) return rejectWithValue(error);
        return data!;
    }
);
