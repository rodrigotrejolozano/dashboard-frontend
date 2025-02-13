import { api, getExcepcionPayload } from '../lib/api'
import { type ApiData, type ApiError } from '../types/api-types'
import { type IProducts } from '../types/products-types'

export const getOneProductsRequest = async (product: number): Promise<{ data: ApiData<IProducts> | null, error: ApiError | null }> => {
    try {
        const createProduct = await api.get(`/products/${product}`)
        return {
            data:  createProduct.data,
            error: null
        }
    } catch (error) {
        return {
            data: {
                success: false,
                data: null as unknown as IProducts,
                message: "Error al obtener el producto",
                code: 500
            },
            error: getExcepcionPayload(error)
        }
    }
}
export const getAllProductsRequest = async (
    page = 1,
    limit = 5,
    name?: string,
    price?: number,
    stock?: number
): Promise<{ data: ApiData<IProducts[]> | null, error: ApiError | null }> => {
    try {
        const response = await api.get(`/products`,
            { params: { page, limit, name, price, stock } }
        );
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: getExcepcionPayload(error),
        };
    }
};


export const createProductRequest = async (product: Omit<IProducts, 'id'>): Promise<{ data: ApiData<IProducts> | null, error: ApiError | null }> => {
    try {
        const response = await api.post('/products', product);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: getExcepcionPayload(error),
        };
    }
};

export const updateProductRequest = async ( product: IProducts): Promise<{ data: ApiData<IProducts> | null, error: ApiError | null }> => {
    try {
        const response = await api.put(`/products/${product.id}`, product);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: getExcepcionPayload(error),
        };
    }
};

export const deleteProductRequest = async (id: number): Promise<{ data: ApiData<null> | null, error: ApiError | null }> => {
    try {
        const response = await api.delete(`/products/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: getExcepcionPayload(error),
        };
    }
};
