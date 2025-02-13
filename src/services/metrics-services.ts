import { api, getExcepcionPayload } from '../lib/api'
import { type ApiData, type ApiError } from '../types/api-types'
import { IProducts } from '../types/products-types';

export const getMetricsAllProductsRequest = async (

    name?: string,
    price?: number,
    stock?: number
): Promise<{ data: ApiData<number> | null, error: ApiError | null }> => {
    try {
        const response = await api.get(`/products/metrics/total-products`,
            { params: { name, price, stock } }
        );
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: getExcepcionPayload(error),
        };
    }
};

export const getMetricsRevenueRequest = async (
    name?: string,
    price?: number,
    stock?: number
): Promise<{ data: ApiData<number> | null, error: ApiError | null }> => {
    try {
        const response = await api.get(`/products/metrics/total-revenue`,
            { params: { name, price, stock } }
        );
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: getExcepcionPayload(error),
        };
    }
};

export const getMetricsAverageStockRequest = async (
    name?: string,
    price?: number,
    stock?: number
): Promise<{ data: ApiData<number> | null, error: ApiError | null }> => {
    try {
        const response = await api.get(`/products/metrics/average-stock`,
            { params: { name, price, stock } }
        );
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: getExcepcionPayload(error),
        };
    }
};

export const getMetricsTopExpensiveProductsRequest = async (
    name?: string,
    price?: number,
    stock?: number
): Promise<{ data: ApiData<IProducts[]> , error: ApiError | null }> => {
    try {
        const response = await api.get(`/products/metrics/top-expensive-products`,
            { params: { name, price, stock } }
        );
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: { success: false, code: 500, data: [] as IProducts[] },
            error: getExcepcionPayload(error),
        };
    }
};

export const getMetricsPriceDistributionRequest = async (
    name?: string,
    price?: number,
    stock?: number
): Promise<{ data: ApiData<{[key: string]: number}
    >, error: ApiError | null }> => {
    try {
        const response = await api.get(`/products/metrics/price-distribution`,
            { params: { name, price, stock } }
        );
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: { success: false, code: 500, data: {} },
            error: getExcepcionPayload(error),
        };
    }
};

export const getMetricsStockVSPriceRequest = async (
    name?: string,
    price?: number,
    stock?: number
): Promise<{ data: ApiData<Omit<IProducts,'id'>[]>, error: ApiError | null }> => {
    try {
        const response = await api.get(`/products/metrics/stock-vs-price`,
            { params: { name, price, stock } }
        );
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: { success: false, code: 500, data: [] as Omit<IProducts, 'id'>[] },
            error: getExcepcionPayload(error),
        };
    }
};